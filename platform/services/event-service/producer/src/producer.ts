import axios from 'axios';
import axiosRetry from 'axios-retry';
import dotenv from 'dotenv';
import { Event, Resource } from './common/interfaces'; // Updated path
import i18n, { i18nMiddleware } from '@agsiri/common-utils/dist/i18n/i18n';
import { logger, expressLogger } from '@agsiri/common-utils/dist/logging/logger';
import { errorHandler } from '@agsiri/common-utils/dist/error/errorHandler';
import { Config } from '@agsiri/common-utils/dist/config/config';

// Load environment variables from .env file
dotenv.config();

// URL of the Event Registry service, used to publish events. This can be configured via environment variables.
const eventRegistryUrl = process.env.EVENT_REGISTRY_URL || 'http://event-registry:3000/publish';
const eventTypesUrl = process.env.EVENT_TYPES_URL || 'http://event-registry:3000/types';
const resourcesUrl = process.env.RESOURCES_URL || 'http://event-registry:3000/resources';

// Configure axios to retry failed requests
axiosRetry(axios, {
  retries: 3, // Number of retry attempts
  retryDelay: (retryCount) => {
    return retryCount * 1000; // Time between retries (in milliseconds)
  },
  retryCondition: (error) => {
    // Retry only if the error is due to a network error or a 5xx status code
    return axiosRetry.isNetworkError(error) || axiosRetry.isRetryableError(error);
  },
});

let supportedEventTypes: string[] = [];
let registeredResources: string[] = [];

// Fetch supported event types from the Event Registry service
async function fetchSupportedEventTypes() {
  try {
    const response = await axios.get(eventTypesUrl);
    supportedEventTypes = response.data.map((eventType: { type: string }) => eventType.type);
    logger.info('Supported event types fetched successfully');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger.error(`Error fetching supported event types: ${error.message}`, error.response?.data);
    } else {
      logger.error('Error fetching supported event types', error);
    }
  }
}

// Fetch registered resources from the Event Registry service
async function fetchRegisteredResources() {
  try {
    const response = await axios.get(resourcesUrl);
    registeredResources = response.data.map((resource: { id: string }) => resource.id);
    logger.info('Registered resources fetched successfully');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger.error(`Error fetching registered resources: ${error.message}`, error.response?.data);
    } else {
      logger.error('Error fetching registered resources', error);
    }
  }
}

// Create event types if they don't already exist
async function createEventTypes() {
  const eventTypes = [
    {
      type: 'ListingCreated',
      description: 'A new listing has been created',
      source: 'listingService',
      schema: {
        type: 'object',
        properties: {
          listingId: { type: 'string' },
          name: { type: 'string' },
          description: { type: 'string' },
          category: { type: 'string' },
          price: { type: 'number' },
          status: { type: 'string' }
        },
        required: ['listingId', 'name', 'description', 'category', 'price', 'status']
      }
    },
    {
      type: 'FarmCreated',
      description: 'A new farm has been created',
      source: 'farmService',
      schema: {
        type: 'object',
        properties: {
          farmId: { type: 'string' },
          location: {
            type: 'object',
            properties: {
              latitude: { type: 'number' },
              longitude: { type: 'number' }
            },
            required: ['latitude', 'longitude']
          },
          size: { type: 'number' },
          crops: { type: 'array', items: { type: 'string' } },
          status: { type: 'string' }
        },
        required: ['farmId', 'location', 'size', 'crops', 'status']
      }
    },
    {
      type: 'OfferingCreated',
      description: 'A new offering has been created',
      source: 'offeringService',
      schema: {
        type: 'object',
        properties: {
          offeringId: { type: 'string' },
          name: { type: 'string' },
          description: { type: 'string' },
          price: { type: 'number' },
          status: { type: 'string' }
        },
        required: ['offeringId', 'name', 'description', 'price', 'status']
      }
    },
    {
      type: 'CampaignCreated',
      description: 'A new campaign has been created',
      source: 'campaignService',
      schema: {
        type: 'object',
        properties: {
          campaignId: { type: 'string' },
          title: { type: 'string' },
          budget: { type: 'number' },
          duration: { type: 'string' },
          status: { type: 'string' }
        },
        required: ['campaignId', 'title', 'budget', 'duration', 'status']
      }
    },
    {
      type: 'DataRoomCreated',
      description: 'A new data room has been created',
      source: 'dataRoomService',
      schema: {
        type: 'object',
        properties: {
          dataRoomId: { type: 'string' },
          name: { type: 'string' },
          description: { type: 'string' },
          documents: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                documentId: { type: 'string' },
                title: { type: 'string' },
                url: { type: 'string', format: 'uri' }
              },
              required: ['documentId', 'title', 'url']
            }
          },
          status: { type: 'string' }
        },
        required: ['dataRoomId', 'name', 'description', 'documents', 'status']
      }
    },
    {
      type: 'PortfolioCreated',
      description: 'A new portfolio has been created',
      source: 'portfolioService',
      schema: {
        type: 'object',
        properties: {
          portfolioId: { type: 'string' },
          userId: { type: 'string' },
          investments: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                offeringId: { type: 'string' },
                numberOfShares: { type: 'number' },
                sharePrice: { type: 'number' },
                investmentDate: { type: 'string', format: 'date-time' },
                status: { type: 'string', enum: ['active', 'closed'] }
              },
              required: ['offeringId', 'numberOfShares', 'sharePrice', 'investmentDate', 'status']
            }
          }
        },
        required: ['portfolioId', 'userId', 'investments']
      }
    },
    {
      type: 'InvestorCreated',
      description: 'A new investor has been created',
      source: 'investorService',
      schema: {
        type: 'object',
        properties: {
          investorId: { type: 'string' },
          name: { type: 'string' },
          investmentAmount: { type: 'number' },
          investmentDate: { type: 'string', format: 'date-time' },
          status: { type: 'string' }
        },
        required: ['investorId', 'name', 'investmentAmount', 'investmentDate', 'status']
      }
    },
    {
      type: 'UserCreated',
      description: 'A new user has been created',
      source: 'userService',
      schema: {
        type: 'object',
        properties: {
          userId: { type: 'string' },
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          roles: { type: 'array', items: { type: 'string' } },
          status: { type: 'string' }
        },
        required: ['userId', 'name', 'email', 'roles', 'status']
      }
    },
    {
      type: 'RoleCreated',
      description: 'A new role has been created',
      source: 'roleService',
      schema: {
        type: 'object',
        properties: {
          roleId: { type: 'string' },
          name: { type: 'string' },
          permissions: { type: 'array', items: { type: 'string' } },
          status: { type: 'string' }
        },
        required: ['roleId', 'name', 'permissions', 'status']
      }
    },
    {
      type: 'PolicyCreated',
      description: 'A new policy has been created',
      source: 'policyService',
      schema: {
        type: 'object',
        properties: {
          policyId: { type: 'string' },
          name: { type: 'string' },
          rules: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                ruleId: { type: 'string' },
                effect: { type: 'string', enum: ['allow', 'deny'] },
                action: { type: 'string' },
                resource: { type: 'string' }
              },
              required: ['ruleId', 'effect', 'action', 'resource']
            }
          },
          status: { type: 'string' }
        },
        required: ['policyId', 'name', 'rules', 'status']
      }
    }
  ];

  for (const eventType of eventTypes) {
    try {
      const response = await axios.post(eventTypesUrl, eventType);
      logger.info(`Event type "${eventType.type}" created successfully`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error(`Error creating event type "${eventType.type}": ${error.message}`, error.response?.data);
      } else {
        logger.error(`Error creating event type "${eventType.type}"`, error);
      }
    }
  }
}

// Create resources if they don't already exist
async function createResources() {
  const resources = [
    {
      id: 'resource1',
      type: 'database',
      description: 'Primary database',
      attributes: {
        host: 'db.example.com',
        port: 5432
      },
      event_types: ['ListingCreated', 'FarmCreated', 'OfferingCreated', 'CampaignCreated', 'DataRoomCreated', 'PortfolioCreated', 'InvestorCreated', 'UserCreated', 'RoleCreated', 'PolicyCreated']
    },
    {
      id: 'resource2',
      type: 'filesystem',
      description: 'File storage system',
      attributes: {
        path: '/mnt/data',
        capacity: '100GB'
      },
      event_types: ['FileUpload', 'FileDelete']
    }
  ];

  for (const resource of resources) {
    try {
      const response = await axios.post(resourcesUrl, resource);
      logger.info(`Resource "${resource.id}" created successfully`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error(`Error creating resource "${resource.id}": ${error.message}`, error.response?.data);
      } else {
        logger.error(`Error creating resource "${resource.id}"`, error);
      }
    }
  }
}

// Function to create a new event with a random ID and a message payload
function createEvent(): Event {
  return {
    id: `${Math.random()}`, // Generate a random ID for the event
    type: 'ListingCreated', // Set the type of the event
    payload: {
      listingId: '123',
      name: 'Sample Listing',
      description: 'This is a sample listing',
      category: 'Real Estate',
      price: 100000,
      status: 'active'
    }, // Add a sample message to the payload
    timestamp: new Date(), // Set the current timestamp
    source: 'event-producer', // Set the source of the event
    resource: 'resource1' // Set the resource related to the event
  };
}

// Validate the event type
function isEventTypeSupported(eventType: string): boolean {
  return supportedEventTypes.includes(eventType);
}

// Validate the resource
function isResourceRegistered(resourceId: string): boolean {
  return registeredResources.includes(resourceId);
}

// Set an interval to create and publish an event every 5 seconds
setInterval(async () => {
  const event = createEvent(); // Create a new event
  if (!isEventTypeSupported(event.type)) {
    logger.error(`Event type "${event.type}" is not supported`);
    return;
  }
  if (!isResourceRegistered(event.resource)) {
    logger.error(`Resource "${event.resource}" is not registered`);
    return;
  }
  try {
    // Send the event to the Event Registry service using an HTTP POST request
    await axios.post(eventRegistryUrl, event);
    logger.info(i18n.t('event_published', { id: event.id })); // Log a success message with the event ID
  } catch (error) {
    // Log an error message if the event could not be published
    if (axios.isAxiosError(error)) {
      logger.error(`Error publishing event: ${error.message}`, error.response?.data);
    } else {
      logger.error('Error publishing event', error);
    }
  }
}, 5000);

// Fetch the supported event types and registered resources initially and then every minute
(async () => {
  await createEventTypes();
  await createResources();
  await fetchSupportedEventTypes();
  await fetchRegisteredResources();
  setInterval(fetchSupportedEventTypes, 60000);
  setInterval(fetchRegisteredResources, 60000);
})();

