import axios from 'axios';
import dotenv from 'dotenv';
import { Event, Subscription, EventType, Resource } from './types';

// Load environment variables from .env file
dotenv.config();

// Default URL of the Actions Service, can be overridden via environment variables
const actionsServiceUrl = process.env.ACTIONS_SERVICE_URL || 'http://localhost:3000';

/**
 * ActionsClient provides methods to interact with the Actions Service.
 */
export class ActionsClient {
  private serviceUrl: string;

  /**
   * Constructs a new ActionsClient.
   * @param serviceUrl - The URL of the Actions Service.
   */
  constructor(serviceUrl?: string) {
    this.serviceUrl = serviceUrl || actionsServiceUrl;
  }

  /**
   * Publishes an event to the Actions Service.
   * @param event - The event to publish.
   */
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

  /**
   * Subscribes to an event type.
   * @param subscription - The subscription details.
   */
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

  /**
   * Unsubscribes from an event type.
   * @param subscription - The subscription details.
   */
  async unsubscribeFromEvent(subscription: Subscription): Promise<void> {
    try {
      const response = await axios.post(`${this.serviceUrl}/unsubscribe`, subscription);
      console.log(`Unsubscribed from event: ${response.data}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error unsubscribing from event:', error.message);
      } else {
        console.error('Error unsubscribing from event:', error);
      }
    }
  }

  /**
   * Retrieves all current subscriptions.
   * @returns A list of subscriptions.
   */
  async getSubscriptions(): Promise<Subscription[]> {
    try {
      const response = await axios.get(`${this.serviceUrl}/subscriptions`);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching subscriptions:', error.message);
        throw error;
      } else {
        console.error('Error fetching subscriptions:', error);
        throw new Error('Error fetching subscriptions');
      }
    }
  }

  /**
   * Retrieves metrics about the events and subscriptions.
   * @returns Metrics data.
   */
  async getMetrics(): Promise<any> {
    try {
      const response = await axios.get(`${this.serviceUrl}/metrics`);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching metrics:', error.message);
        throw error;
      } else {
        console.error('Error fetching metrics:', error);
        throw new Error('Error fetching metrics');
      }
    }
  }

  /**
   * Creates a new event type.
   * @param eventType - The event type details.
   */
  async createEventType(eventType: EventType): Promise<void> {
    try {
      const response = await axios.post(`${this.serviceUrl}/types`, eventType);
      console.log(`Event type created: ${response.data}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error creating event type:', error.message);
      } else {
        console.error('Error creating event type:', error);
      }
    }
  }

  /**
   * Lists all event types.
   * @returns A list of event types.
   */
  async listEventTypes(): Promise<EventType[]> {
    try {
      const response = await axios.get(`${this.serviceUrl}/types`);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching event types:', error.message);
        throw error;
      } else {
        console.error('Error fetching event types:', error);
        throw new Error('Error fetching event types');
      }
    }
  }

  /**
   * Updates an existing event type.
   * @param type - The event type identifier.
   * @param eventType - The updated event type details.
   */
  async updateEventType(type: string, eventType: Partial<EventType>): Promise<void> {
    try {
      const response = await axios.put(`${this.serviceUrl}/types/${type}`, eventType);
      console.log(`Event type updated: ${response.data}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error updating event type:', error.message);
      } else {
        console.error('Error updating event type:', error);
      }
    }
  }

  /**
   * Deletes an existing event type.
   * @param type - The event type identifier.
   */
  async deleteEventType(type: string): Promise<void> {
    try {
      const response = await axios.delete(`${this.serviceUrl}/types/${type}`);
      console.log(`Event type deleted: ${response.data}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error deleting event type:', error.message);
      } else {
        console.error('Error deleting event type:', error);
      }
    }
  }

  /**
   * Creates a new resource.
   * @param resource - The resource details.
   */
  async createResource(resource: Resource): Promise<void> {
    try {
      const response = await axios.post(`${this.serviceUrl}/resources`, resource);
      console.log(`Resource created: ${response.data}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error creating resource:', error.message);
      } else {
        console.error('Error creating resource:', error);
      }
    }
  }

  /**
   * Lists all resources with their event types populated.
   * @returns A list of resources with event types.
   */
  async listResources(): Promise<Resource[]> {
    try {
      const response = await axios.get(`${this.serviceUrl}/resources`);
      return response.data.map((resource: any) => ({
        ...resource,
        event_types: resource.event_types || [] // Ensure event_types is an array
      }));
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching resources:', error.message);
        throw error;
      } else {
        console.error('Error fetching resources:', error);
        throw new Error('Error fetching resources');
      }
    }
  }

  /**
   * Updates an existing resource.
   * @param id - The resource identifier.
   * @param resource - The updated resource details.
   */
  async updateResource(id: string, resource: Partial<Resource>): Promise<void> {
    try {
      const response = await axios.put(`${this.serviceUrl}/resources/${id}`, resource);
      console.log(`Resource updated: ${response.data}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error updating resource:', error.message);
      } else {
        console.error('Error updating resource:', error);
      }
    }
  }

  /**
   * Deletes an existing resource.
   * @param id - The resource identifier.
   */
  async deleteResource(id: string): Promise<void> {
    try {
      const response = await axios.delete(`${this.serviceUrl}/resources/${id}`);
      console.log(`Resource deleted: ${response.data}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error deleting resource:', error.message);
      } else {
        console.error('Error deleting resource:', error);
      }
    }
  }
}

