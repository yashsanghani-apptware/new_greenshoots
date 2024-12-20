# Concept Note: Setting Up @agsiri/actions-lib

## Introduction

The `@agsiri/actions-lib` is a TypeScript client library designed to interact with the Actions Service. This library allows developers to publish events, subscribe to events, and handle event notifications in a structured and efficient manner. This document outlines the steps taken to set up, develop, test, and publish the `@agsiri/actions-lib` package.

## Objectives

1. **Develop a TypeScript client library** for interacting with the Actions Service.
2. **Ensure the library is modular** and can be easily integrated into other projects.
3. **Test the library locally** before publishing to ensure reliability.
4. **Publish the library** as a scoped package on npm for public use.

## Project Structure

The project is organized into the following structure:

```
actions-client-lib/
├── src/
│   ├── index.ts
│   ├── ActionsClient.ts
│   └── types.ts
├── example/
│   ├── tsconfig.json
│   └── usage.ts
├── dist/
│   ├── (compiled files will be here)
├── package.json
├── tsconfig.json
└── .env
```

### Key Directories and Files

- **src/**: Contains the TypeScript source files for the library.
- **example/**: Contains an example project to test the library locally.
- **dist/**: The output directory for compiled files.
- **package.json**: Configuration file for npm.
- **tsconfig.json**: TypeScript configuration file.
- **.env**: Environment configuration file.

## Development Process

### 1. Setting Up the Project

Initialize the project with npm and install necessary dependencies.

```sh
npm init -y
npm install axios dotenv
npm install --save-dev typescript @types/node
```

### 2. Configuring TypeScript

Create and configure `tsconfig.json` for the project and the example directory.

#### `tsconfig.json` (root)

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es6",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "declaration": true,
    "declarationMap": true,
    "typeRoots": ["./node_modules/@types"],
    "types": ["node"]
  },
  "include": ["src/**/*"]
}
```

#### `example/tsconfig.json`

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es6",
    "outDir": "./dist",
    "rootDir": "./",
    "strict": true,
    "esModuleInterop": true,
    "typeRoots": ["../node_modules/@types"],
    "types": ["node"]
  },
  "include": ["usage.ts"]
}
```

### 3. Developing the Library

#### `src/types.ts`

Define the types for the events and subscriptions.

```typescript
export interface Event {
  id: string;
  type: string;
  payload: any;
  timestamp: Date;
  source: string;
}

export interface Subscription {
  eventType: string;
  callbackUrl: string;
}
```

#### `src/ActionsClient.ts`

Create the main class for the client library.

```typescript
import axios from 'axios';
import dotenv from 'dotenv';
import { Event, Subscription } from './types';

dotenv.config();

const actionsServiceUrl = process.env.ACTIONS_SERVICE_URL || 'http://localhost:3000';

export class ActionsClient {
  private serviceUrl: string;

  constructor(serviceUrl?: string) {
    this.serviceUrl = serviceUrl || actionsServiceUrl;
  }

  async publishEvent(event: Event): Promise<void> {
    try {
      const response = await axios.post(`${this.serviceUrl}/publish`, event);
      console.log(`Event published: ${response.data}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error publishing event:', error.message);
      } else {
        console.error('Error publishing event:', error);
      }
    }
  }

  async subscribeToEvent(subscription: Subscription): Promise<void> {
    try {
      const response = await axios.post(`${this.serviceUrl}/subscribe`, subscription);
      console.log(`Subscribed to event: ${response.data}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error subscribing to event:', error.message);
      } else {
        console.error('Error subscribing to event:', error);
      }
    }
  }
}
```

#### `src/index.ts`

Export the library modules.

```typescript
export * from './ActionsClient';
export * from './types';
```

### 4. Building the Library

Compile the TypeScript files into the `dist` directory.

```sh
npm run build
```

### 5. Testing the Library

Set up an example project to test the library locally.

#### `example/package.json`

```json
{
  "name": "actions-client-example",
  "version": "1.0.0",
  "main": "dist/usage.js",
  "scripts": {
    "start": "node dist/usage.js"
  },
  "dependencies": {
    "@agsiri/actions-lib": "file:../dist"
  },
  "devDependencies": {
    "@types/node": "^14.14.41",
    "typescript": "^4.0.0"
  }
}
```

#### `example/usage.ts`

Test the library functionality.

```typescript
import { ActionsClient, Event, Subscription } from '@agsiri/actions-lib';

const client = new ActionsClient();

const exampleEvent: Event = {
  id: '1',
  type: 'example.event',
  payload: { message: 'Hello, World!' },
  timestamp: new Date(),
  source: 'example-source',
};

const exampleSubscription: Subscription = {
  eventType: 'example.event',
  callbackUrl: process.env.CLIENT_CALLBACK_URL || 'http://localhost:4000/events',
};

async function main() {
  await client.publishEvent(exampleEvent);
  await client.subscribeToEvent(exampleSubscription);
}

main().catch(console.error);
```

Compile and run the example:

```sh
cd example
npx tsc
npm start
```

### 6. Publishing the Library

1. **Login to npm:**

```sh
npm login
```

2. **Publish the scoped package:**

```sh
npm publish --access public
```

## Conclusion

The `@agsiri/actions-lib` client library provides a robust way to interact with the Actions Service. By following the steps outlined in this concept note, we ensure that the library is well-structured, tested, and ready for public use. This setup enables easy integration and usage in various projects, fostering a standardized approach to event handling within the Agsiri ecosystem.
