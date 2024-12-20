// src/registry.ts
import express from 'express';
import bodyParser from 'body-parser';
import { connect, Connection, Channel } from 'amqplib';
import axios from 'axios';
import dotenv from 'dotenv';
import { MongoClient, Collection } from 'mongodb';
import Ajv, { JSONSchemaType } from 'ajv';
import { listingEventSchema, farmEventSchema } from './eventSchemas'; // Import schemas
import { Event, EventType, Resource } from './common/interfaces';
import i18n, { i18nMiddleware } from '@agsiri/common-utils/dist/i18n/i18n';
import { logger, expressLogger } from '@agsiri/common-utils/dist/logging/logger';
import { errorHandler } from '@agsiri/common-utils/dist/error/errorHandler';
import { Config } from '@agsiri/common-utils/dist/config/config';

// Load environment variables from .env file
dotenv.config();

// Create an instance of the Express application
const app = express();
app.use(bodyParser.json());
app.use(i18nMiddleware);

const amqpUrl = process.env.AMQP_URL || 'amqp://host.docker.internal:5672';
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
const mongoDbName = process.env.MONGO_DB_NAME || 'event_registry';

// Declare variables for RabbitMQ connection and channel
let amqpConnection: Connection;
let amqpChannel: Channel;
// Declare variables for MongoDB collections
let subscriberCollection: Collection;
let metricsCollection: Collection;
let eventTypeCollection: Collection;
let resourceCollection: Collection;

// Initialize Ajv for schema validation
const ajv = new Ajv();
const validateListingEvent = ajv.compile(listingEventSchema);
const validateFarmEvent = ajv.compile(farmEventSchema);

// Function to initialize RabbitMQ connection and channel
const initializeRabbitMQ = async () => {
  amqpConnection = await connect(amqpUrl);
  amqpChannel = await amqpConnection.createChannel();
  await amqpChannel.assertQueue('events', { durable: true });
};

// Function to initialize MongoDB connection and collections
const initializeMongoDB = async () => {
  const client = new MongoClient(mongoUrl);
  await client.connect();
  const db = client.db(mongoDbName);
  subscriberCollection = db.collection('subscribers');
  metricsCollection = db.collection('metrics');
  eventTypeCollection = db.collection('event_types');
  resourceCollection = db.collection('resources');
};

// Function to initialize both RabbitMQ and MongoDB
const initialize = async () => {
  await initializeRabbitMQ();
  await initializeMongoDB();
};

// Function to publish an event to the RabbitMQ queue
const publishEvent = async (event: Event) => {
  await amqpChannel.sendToQueue('events', Buffer.from(JSON.stringify(event)), { persistent: true });
  // Update metrics for published events
  await metricsCollection.updateOne(
    { eventType: event.type },
    { $inc: { published: 1 } },
    { upsert: true }
  );
};

// Function to validate an event against its schema
const validateEvent = (event: Event) => {
  switch (event.type) {
    case 'ListingCreated':
    case 'ListingUpdated':
    case 'ListingDeleted':
      return validateListingEvent(event.payload);
    case 'FarmCreated':
    case 'FarmUpdated':
    case 'FarmDeleted':
      return validateFarmEvent(event.payload);
    // Add other cases for other event types and their schemas...
    default:
      return false;
  }
};

// Function to retrieve subscribers for a specific event type from MongoDB
const getSubscribers = async (eventType: string): Promise<string[]> => {
  const subscribers = await subscriberCollection.findOne({ eventType });
  return subscribers ? subscribers.callbackUrls : [];
};

// Function to dispatch an event to all subscribers of the event type
const dispatchEvent = async (event: Event) => {
  const subscribers = await getSubscribers(event.type);
  for (const callbackUrl of subscribers) {
    try {
      await axios.post(callbackUrl, event);
      logger.info(`Event dispatched to ${callbackUrl}`);
      // Update metrics for successfully delivered events
      await metricsCollection.updateOne(
        { eventType: event.type },
        { $inc: { delivered: 1 } }
      );
    } catch (error) {
      // Update metrics for failed deliveries
      await metricsCollection.updateOne(
        { eventType: event.type },
        { $inc: { failed: 1 } }
      );
      const err = error as any;
      if (axios.isAxiosError(err)) {
        logger.error(`Error dispatching event to ${callbackUrl}:`, err.message);
      } else {
        logger.error(`Unexpected error dispatching event to ${callbackUrl}:`, err);
      }
    }
  }
};

// Function to start a worker to consume events from the RabbitMQ queue and process them
const startWorker = async () => {
  amqpChannel.consume('events', async (msg) => {
    if (msg !== null) {
      const event = JSON.parse(msg.content.toString()) as Event;
      await dispatchEvent(event);
      amqpChannel.ack(msg);
    }
  }, { noAck: false });
};

// Endpoint to publish events
app.post('/publish', async (req, res) => {
  const event: Event = req.body;
  try {
    const eventType = await eventTypeCollection.findOne({ type: event.type });
    const resource = await resourceCollection.findOne({ id: event.resource });
    if (!eventType) {
      res.status(400).send(req.t('unsupported_event_type'));
      return;
    }
    if (!resource) {
      res.status(400).send(req.t('unsupported_resource'));
      return;
    }
    if (!validateEvent(event)) {
      res.status(400).send(req.t('invalid_event_payload'));
      return;
    }
    await publishEvent(event);
    res.status(200).send(req.t('event_published'));
  } catch (error) {
    const err = error as any;
    logger.error(req.t('error_publishing_event'), err);
    res.status(500).send(req.t('error_publishing_event'));
  }
});

// Endpoint to subscribe to events
app.post('/subscribe', async (req, res) => {
  const { eventType, callbackUrl } = req.body;
  try {
    await subscriberCollection.updateOne(
      { eventType },
      { $addToSet: { callbackUrls: callbackUrl } },
      { upsert: true }
    );
    res.status(200).send(req.t('subscribed_successfully'));
    logger.info(req.t('subscription_added', { callbackUrl, eventType }));
  } catch (error) {
    const err = error as any;
    logger.error(req.t('error_subscribing_event'), err);
    res.status(500).send(req.t('error_subscribing_event'));
  }
});

// Endpoint to list all subscriptions
app.get('/subscriptions', async (req, res) => {
  try {
    const subscriptions = await subscriberCollection.find().toArray();
    res.status(200).json(subscriptions);
  } catch (error) {
    const err = error as any;
    logger.error(req.t('error_listing_subscriptions'), err);
    res.status(500).send(req.t('error_listing_subscriptions'));
  }
});

// Endpoint to unsubscribe from events
app.post('/unsubscribe', async (req, res) => {
  const { eventType, callbackUrl } = req.body;
  try {
    await subscriberCollection.updateOne(
      { eventType },
      { $pull: { callbackUrls: callbackUrl } }
    );
    res.status(200).send(req.t('unsubscribed_successfully'));
    logger.info(req.t('unsubscription_successful', { callbackUrl, eventType }));
  } catch (error) {
    const err = error as any;
    logger.error(req.t('error_unsubscribing_event'), err);
    res.status(500).send(req.t('error_unsubscribing_event'));
  }
});

// Endpoint to get metrics
app.get('/metrics', async (req, res) => {
  try {
    const metrics = await metricsCollection.find().toArray();
    res.status(200).json(metrics);
  } catch (error) {
    const err = error as any;
    logger.error(req.t('error_fetching_metrics'), err);
    res.status(500).send(req.t('error_fetching_metrics'));
  }
});

// Endpoint to create an event type
app.post('/types', async (req, res) => {
  const { type, description, source, schema } = req.body;
  const newEventType = {
    type,
    description,
    source,
    schema,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  try {
    await eventTypeCollection.insertOne(newEventType);
    res.status(201).send(req.t('event_type_created'));
  } catch (error) {
    const err = error as any;
    logger.error(req.t('error_creating_event_type'), err);
    res.status(500).send(req.t('error_creating_event_type'));
  }
});

// Endpoint to list all event types
app.get('/types', async (req, res) => {
  try {
    const eventTypes = await eventTypeCollection.find().toArray();
    res.status(200).json(eventTypes);
  } catch (error) {
    const err = error as any;
    logger.error(req.t('error_listing_event_types'), err);
    res.status(500).send(req.t('error_listing_event_types'));
  }
});

// Endpoint to update an event type
app.put('/types/:type', async (req, res) => {
  const { type } = req.params;
  const { description, source, schema } = req.body;
  const updatedEventType = {
    description,
    source,
    schema,
    updatedAt: new Date(),
  };
  try {
    await eventTypeCollection.updateOne(
      { type },
      { $set: updatedEventType }
    );
    res.status(200).send(req.t('event_type_updated'));
  } catch (error) {
    const err = error as any;
    logger.error(req.t('error_updating_event_type'), err);
    res.status(500).send(req.t('error_updating_event_type'));
  }
});

// Endpoint to delete an event type
app.delete('/types/:type', async (req, res) => {
  const { type } = req.params;
  try {
    await eventTypeCollection.deleteOne({ type });
    res.status(200).send(req.t('event_type_deleted'));
  } catch (error) {
    const err = error as any;
    logger.error(req.t('error_deleting_event_type'), err);
    res.status(500).send(req.t('error_deleting_event_type'));
  }
});

// Endpoint to create a resource
app.post('/resources', async (req, res) => {
  const { id, type, description, attributes, event_types } = req.body;
  const newResource = {
    id,
    type,
    description,
    attributes,
    event_types,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  try {
    await resourceCollection.insertOne(newResource);
    res.status(201).send(req.t('resource_created'));
  } catch (error) {
    const err = error as any;
    logger.error(req.t('error_creating_resource'), err);
    res.status(500).send(req.t('error_creating_resource'));
  }
});

// Endpoint to list all resources with their event types populated
app.get('/resources', async (req, res) => {
  try {
    const resources = await resourceCollection.find().toArray();

    // Populate event types for each resource
    for (const resource of resources) {
      const eventTypesDetails = [];
      if (Array.isArray(resource.event_types)) {
        for (const eventType of resource.event_types) {
          const eventTypeDetail = await eventTypeCollection.findOne({ type: eventType });
          if (eventTypeDetail) {
            eventTypesDetails.push(eventTypeDetail);
          }
        }
      }
      resource.event_types = eventTypesDetails;
    }

    res.status(200).json(resources);
  } catch (error) {
    const err = error as any;
    logger.error(req.t('error_listing_resources'), err);
    res.status(500).send(req.t('error_listing_resources'));
  }
});

// Endpoint to update a resource
app.put('/resources/:id', async (req, res) => {
  const { id } = req.params;
  const { type, description, attributes, event_types } = req.body;
  const updatedResource = {
    type,
    description,
    attributes,
    event_types,
    updatedAt: new Date(),
  };
  try {
    await resourceCollection.updateOne(
      { id },
      { $set: updatedResource }
    );
    res.status(200).send(req.t('resource_updated'));
  } catch (error) {
    const err = error as any;
    logger.error(req.t('error_updating_resource'), err);
    res.status(500).send(req.t('error_updating_resource'));
  }
});

// Endpoint to delete a resource
app.delete('/resources/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await resourceCollection.deleteOne({ id });
    res.status(200).send(req.t('resource_deleted'));
  } catch (error) {
    const err = error as any;
    logger.error(req.t('error_deleting_resource'), err);
    res.status(500).send(req.t('error_deleting_resource'));
  }
});

// Initialize services and start the server
const port = process.env.PORT || 3000;
initialize().then(() => {
  startWorker();
  app.listen(port, () => {
    logger.info(`Event Registry Service listening on port ${port}`);
  });
}).catch(err => {
  logger.error('Failed to initialize services', err);
});

