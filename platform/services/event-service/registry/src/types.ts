/**
 * Interface representing an Event.
 */
export interface Event {
  id: string;         // Unique identifier for the event
  type: string;       // Type of the event (e.g., 'example.event')
  payload: any;       // Additional data related to the event
  timestamp: Date;    // Timestamp when the event was created
  source: string;     // Source of the event (e.g., 'auth-service')
  resource: string;   // Resource related to the event
}

/**
 * Interface representing a Subscription.
 */
export interface Subscription {
  eventType: string;  // Type of the event to subscribe to
  callbackUrl: string; // Callback URL to send the event to
}

/**
 * Interface representing an Event Type.
 */
export interface EventType {
  type: string; // Unique identifier for the event type
  description: string; // Description of the event type
  source: string; // Source of the event type (e.g., 'auth-service')
  schema: any;  // JSON schema describing the structure of the event payload
  createdAt?: Date; // Timestamp when the event type was created
  updatedAt?: Date; // Timestamp when the event type was last updated
}

/**
 * Interface representing a Resource.
 */
export interface Resource {
  id: string;         // Unique identifier for the resource
  type: string;       // Type of the resource (e.g., 'database', 'filesystem')
  description: string;// Description of the resource
  createdAt?: Date;   // Timestamp when the resource was created
  updatedAt?: Date;   // Timestamp when the resource was last updated
}

