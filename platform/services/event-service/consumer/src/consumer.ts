import { connect } from 'amqplib';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { Event } from './common/interfaces'; // Updated path
import i18n, { i18nMiddleware } from '@agsiri/common-utils/dist/i18n/i18n';
import { logger, expressLogger } from '@agsiri/common-utils/dist/logging/logger';
import { errorHandler } from '@agsiri/common-utils/dist/error/errorHandler';
import { Config } from '@agsiri/common-utils/dist/config/config';

// Load environment variables from .env file
dotenv.config();

// MongoDB and RabbitMQ URLs, configured via environment variables
const mongoUrl = process.env.MONGO_URL || 'mongodb://host.docker.internal:27017';
const amqpUrl = process.env.AMQP_URL || 'amqp://host.docker.internal:5672';

// Function to save an event to MongoDB
async function saveEvent(event: Event) {
  const client = new MongoClient(mongoUrl); // Create a new MongoDB client
  await client.connect(); // Establish the connection
  const db = client.db('event_store'); // Access the 'event_store' database
  const collection = db.collection('events'); // Access the 'events' collection
  await collection.insertOne(event); // Insert the event document into the collection
  await client.close(); // Close the MongoDB connection
  logger.info(i18n.t('event_saved', { id: event.id })); // Log a success message with the event ID
}

// Function to consume events from the RabbitMQ queue
async function consumeEvents() {
  const connection = await connect(amqpUrl); // Connect to RabbitMQ instance
  const channel = await connection.createChannel(); // Create a channel
  await channel.assertQueue('events'); // Ensure the 'events' queue exists

  // Set up a consumer to process messages from the 'events' queue
  channel.consume('events', async (msg) => {
    if (msg !== null) {
      const event = JSON.parse(msg.content.toString()) as Event; // Parse the message content as an Event
      await saveEvent(event); // Save the event to MongoDB
      channel.ack(msg); // Acknowledge the message
    }
  });
}

// Start consuming events and handle any errors
consumeEvents().catch(console.error);

