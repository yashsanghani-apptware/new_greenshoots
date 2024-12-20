import { ActionsClient, Event, Subscription, EventType, Resource } from '@agsiri/actions-lib';

// Initialize the client
const client = new ActionsClient();

// Create an example event type
const exampleEventType: EventType = {
  type: 'auth.login',
  description: 'User login event',
  source: 'auth-service',
  schema: {
    type: 'object',
    properties: {
      message: { type: 'string' }
    },
    required: ['message']
  }
};

// Create an example resource
const exampleResource: Resource = {
  id: 'resource1',
  type: 'database',
  description: 'Primary database',
  attributes: {
    host: 'db.example.com',
    port: 5432
  },
  event_types: ['auth.login', 'auth.logout']
};

// Create an example event
const exampleEvent: Event = {
  id: '1',
  type: 'auth.login',
  payload: { message: 'Hello, World!' },
  timestamp: new Date(),
  source: 'example-source',
  resource: 'resource1',
};

// Create an example subscription
const exampleSubscription: Subscription = {
  eventType: 'auth.login',
  callbackUrl: process.env.CLIENT_CALLBACK_URL || 'http://host.docker.internal:4000/events',
};

// Main function to demonstrate usage of the client
async function main() {
  try {
    // Create an event type
    console.log('Creating event type...');
    await client.createEventType(exampleEventType);

    // Create a resource
    console.log('Creating resource...');
    await client.createResource(exampleResource);

    // List all event types
    console.log('Listing event types...');
    const eventTypes = await client.listEventTypes();
    console.log('Current event types:', JSON.stringify(eventTypes, null, 2));

    // List all resources with event types populated
    console.log('Listing resources...');
    const resources = await client.listResources();
    console.log('Current resources:', JSON.stringify(resources, null, 2));

    // Publish an event
    console.log('Publishing event...');
    await client.publishEvent(exampleEvent);
    console.log('Event published successfully');

    // Subscribe to an event type
    console.log('Subscribing to event...');
    await client.subscribeToEvent(exampleSubscription);
    console.log('Subscribed successfully');

    // Retrieve current subscriptions
    console.log('Listing subscriptions...');
    const subscriptions = await client.getSubscriptions();
    console.log('Current subscriptions:', JSON.stringify(subscriptions, null, 2));

    // Retrieve metrics
    console.log('Listing metrics...');
    const metrics = await client.getMetrics();
    console.log('Metrics:', JSON.stringify(metrics, null, 2));

    // Unsubscribe from the event type
    console.log('Unsubscribing from event...');
    await client.unsubscribeFromEvent(exampleSubscription);
    console.log('Unsubscribed successfully');

    // Update an event type
    console.log('Updating event type...');
    const updatedEventType: Partial<EventType> = {
      description: 'Updated user login event description',
      source: 'updated-auth-service',
    };
    await client.updateEventType('auth.login', updatedEventType);
    console.log('Event type updated successfully');

    // Update a resource
    console.log('Updating resource...');
    const updatedResource: Partial<Resource> = {
      description: 'Updated primary database',
    };
    await client.updateResource('resource1', updatedResource);
    console.log('Resource updated successfully');

    // Delete an event type
    console.log('Deleting event type...');
    await client.deleteEventType('auth.login');
    console.log('Event type deleted successfully');

    // Delete a resource
    console.log('Deleting resource...');
    await client.deleteResource('resource1');
    console.log('Resource deleted successfully');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Run the main function and catch any errors
main().catch(console.error);

