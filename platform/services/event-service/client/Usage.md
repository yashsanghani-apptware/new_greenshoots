# User Guide for @agsiri/actions-lib

## Introduction

The `@agsiri/actions-lib` is a TypeScript client library designed to interact with the Actions Service. This library allows developers to publish events, subscribe to events, unsubscribe from events, and retrieve subscriptions and metrics. This guide will help you get started with using the library, providing detailed examples and expected outputs.

## Installation

### Step 1: Install the Library

First, you need to install the library and its dependencies.

```sh
npm install axios dotenv
npm install --save-dev typescript @types/node
```

## Configuration

Create a `.env` file at the root of your project and set the `ACTIONS_SERVICE_URL` and `CLIENT_CALLBACK_URL`.

```ini
ACTIONS_SERVICE_URL=http://localhost:3000
CLIENT_CALLBACK_URL=http://host.docker.internal:4000/events
```

## Usage

### Step 1: Import the Library

Import the `ActionsClient` and related types into your project.

```typescript
import { ActionsClient, Event, Subscription } from '@agsiri/actions-lib';
```

### Step 2: Initialize the Client

Create an instance of the `ActionsClient`.

```typescript
const client = new ActionsClient();
```

### Step 3: Publish an Event

Use the `publishEvent` method to publish an event to the Actions Service.

#### Example

```typescript
const exampleEvent: Event = {
  id: '1',
  type: 'example.event',
  payload: { message: 'Hello, World!' },
  timestamp: new Date(),
  source: 'example-source',
};

await client.publishEvent(exampleEvent);
```

#### Expected Output

```
Event published: Event published successfully
```

### Step 4: Subscribe to an Event

Use the `subscribeToEvent` method to subscribe to an event type.

#### Example

```typescript
const exampleSubscription: Subscription = {
  eventType: 'example.event',
  callbackUrl: process.env.CLIENT_CALLBACK_URL || 'http://host.docker.internal:4000/events',
};

await client.subscribeToEvent(exampleSubscription);
```

#### Expected Output

```
Subscribed to event: Subscription added successfully
```

### Step 5: Unsubscribe from an Event

Use the `unsubscribeFromEvent` method to unsubscribe from an event type.

#### Example

```typescript
await client.unsubscribeFromEvent(exampleSubscription);
```

#### Expected Output

```
Unsubscribed from event: Unsubscription successful
```

### Step 6: Retrieve Subscriptions

Use the `getSubscriptions` method to retrieve all current subscriptions.

#### Example

```typescript
const subscriptions = await client.getSubscriptions();
console.log('Current subscriptions:', subscriptions);
```

#### Expected Output

```
Current subscriptions: [
  {
    eventType: 'example.event',
    callbackUrls: ['http://host.docker.internal:4000/events']
  }
]
```

### Step 7: Retrieve Metrics

Use the `getMetrics` method to retrieve metrics about the events and subscriptions.

#### Example

```typescript
const metrics = await client.getMetrics();
console.log('Metrics:', metrics);
```

#### Expected Output

```
Metrics: [
  {
    eventType: 'example.event',
    published: 1,
    delivered: 1,
    failed: 0
  }
]
```

## Example Usage Script

Below is an example script demonstrating how to use the `@agsiri/actions-lib` library.

### `example/usage.ts`

```typescript
import { ActionsClient, Event, Subscription } from '@agsiri/actions-lib';

// Initialize the client
const client = new ActionsClient();

// Create an example event
const exampleEvent: Event = {
  id: '1',
  type: 'example.event',
  payload: { message: 'Hello, World!' },
  timestamp: new Date(),
  source: 'example-source',
};

// Create an example subscription
const exampleSubscription: Subscription = {
  eventType: 'example.event',
  callbackUrl: process.env.CLIENT_CALLBACK_URL || 'http://host.docker.internal:4000/events',
};

// Main function to demonstrate usage of the client
async function main() {
  // Publish an event
  await client.publishEvent(exampleEvent);

  // Subscribe to an event type
  await client.subscribeToEvent(exampleSubscription);

  // Retrieve current subscriptions
  const subscriptions = await client.getSubscriptions();
  console.log('Current subscriptions:', subscriptions);

  // Retrieve metrics
  const metrics = await client.getMetrics();
  console.log('Metrics:', metrics);

  // Unsubscribe from the event type
  await client.unsubscribeFromEvent(exampleSubscription);
}

// Run the main function and catch any errors
main().catch(console.error);
```

### Compilation and Execution

1. **Compile the TypeScript files**:

```sh
npx tsc
```

2. **Run the example script**:

```sh
node dist/usage.js
```

### Expected Output

```sh
Event published: Event published successfully
Subscribed to event: Subscription added successfully
Current subscriptions: [
  {
    eventType: 'example.event',
    callbackUrls: ['http://host.docker.internal:4000/events']
  }
]
Metrics: [
  {
    eventType: 'example.event',
    published: 1,
    delivered: 1,
    failed: 0
  }
]
Unsubscribed from event: Unsubscription successful
```

## Conclusion

The `@agsiri/actions-lib` library provides a robust and scalable way to interact with the Actions Service. By following this user guide, you can easily publish events, subscribe to event types, manage subscriptions, and retrieve metrics. The provided examples and expected outputs help you understand how to use the library effectively in your projects.
