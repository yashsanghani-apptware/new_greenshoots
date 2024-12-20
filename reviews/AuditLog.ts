import mongoose, { Document, Schema, Model } from "mongoose";

/**
 * IAuditLog interface represents an AuditLog document in MongoDB.
 * AuditLogs are used to track and record significant events within the system.
 */
export interface IAuditLog extends Document {
  event_type: string; // Type of event (e.g., "CREATION", "MODIFICATION", "DELETION", "ACCESS")
  entity_type: string; // Type of entity involved in the event (e.g., "DataRoom", "Cabinet", "File", "Workflow")
  entity_id: mongoose.Types.ObjectId; // ID of the entity involved in the event
  user_id: mongoose.Types.ObjectId; // ID of the user who performed the action
  action: string; // Specific action taken (e.g., "CREATED", "DELETED", "MODIFIED")
  timestamp: Date; // Date and time when the event occurred
  details?: Record<string, any>; // Additional details about the event
  ip_address?: string; // IP address of the user who performed the action
  user_agent?: string; // User agent string of the client used to perform the action
}

// Define the schema for the AuditLog collection in MongoDB
const AuditLogSchema: Schema<IAuditLog> = new Schema(
  {
    event_type: {
      type: String,
      required: true, // Event type is required to categorize the log entry
    },
    entity_type: {
      type: String,
      required: true, // Entity type is required to provide context for the event
    },
    entity_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true, // Entity ID is required to trace the log entry to a specific entity
      refPath: "entity_type", // Dynamically references the appropriate model based on entity_type
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true, // User ID is required to track accountability for the event
      ref: "User", // Refers to the User model
    },
    action: {
      type: String,
      required: true, // Action is required to specify what was done during the event
    },
    timestamp: {
      type: Date,
      default: Date.now, // Automatically sets the date and time when the log entry is created
    },
    details: {
      type: Object, // Additional details about the event can be stored here
      default: {},
    },
    ip_address: {
      type: String, // IP address of the user who performed the action
    },
    user_agent: {
      type: String, // User agent string of the client used to perform the action
    },
  },
  { timestamps: true } // Automatically manages createdAt and updatedAt fields
);

// Export the AuditLog model for use in the application
const AuditLog: Model<IAuditLog> = mongoose.model<IAuditLog>(
  "AuditLog",
  AuditLogSchema
);
export default AuditLog;

