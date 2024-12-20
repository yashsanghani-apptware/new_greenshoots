import mongoose, { Document, Schema, Model } from "mongoose";

/**
 * IDataRoom interface represents a DataRoom document in MongoDB.
 * It includes all attributes necessary for managing and enforcing
 * policies related to the storage and access of sensitive data.
 */
export interface IDataRoom extends Document {
  organization_id: mongoose.Types.ObjectId; // The ID of the organization that owns the DataRoom
  ari: string; // The unique Agsiri Resource Identifier for the DataRoom
  name: string; // Human-readable name for the DataRoom
  description?: string; // A brief description of the DataRoom
  created_by: mongoose.Types.ObjectId; // User ID of the DataRoom creator
  created_at: Date; // Timestamp of when the DataRoom was created
  modified_by?: mongoose.Types.ObjectId; // User ID of the last person who modified the DataRoom
  modified_at?: Date; // Timestamp of the last modification
  deleted_at?: Date; // Timestamp for when the DataRoom was marked as deleted
  data_residency: {
    country: string; // Country where the data is stored
    region: string; // Region within the country where the data is stored
    data_center: string; // Specific data center where the data resides
  };
  key_info?: Record<string, any>; // Encryption and key management information
  purpose?: string; // Purpose of the DataRoom
  data_minimization?: boolean; // Flag indicating if data minimization principles are applied
  retention_policy?: string; // Data retention policy for the DataRoom
  deletion_date?: Date; // Scheduled date for the final deletion of the DataRoom
  encryption_status?: string; // Current encryption status of the DataRoom
  key_management?: {
    key_id: string; // Encryption key ID
    rotation_schedule: string; // Key rotation schedule
  };
  third_party_access?: Array<{
    third_party_id: mongoose.Types.ObjectId; // ID of the third party granted access
    access_granted: boolean; // Whether access is currently granted
    access_start_date: Date; // Start date for the third party's access
    access_end_date?: Date; // End date for the third party's access
  }>;
  regulatory_hold?: {
    hold_id: mongoose.Types.ObjectId; // Unique identifier for the regulatory hold
    reason: string; // Reason for the hold
    applied_by: mongoose.Types.ObjectId; // ID of the user who applied the hold
    applied_at: Date; // Date when the hold was applied
    status: "ACTIVE" | "RELEASED"; // Status of the hold
    released_at?: Date; // Date when the hold was lifted
  };
  workflow_triggers?: Array<{
    event: string; // Event that triggers the workflow
    workflow_id: mongoose.Types.ObjectId; // ID of the workflow to be triggered
    conditions?: Array<{
      attribute: string; // Attribute to evaluate in the condition
      operator: string; // Operator used for comparison
      value: any; // Value to compare against
      type: string; // Type of condition
    }>;
  }>;
  cabinets?: mongoose.Types.ObjectId[]; // List of Cabinets associated with this DataRoom
  audit_trail?: mongoose.Types.ObjectId[]; // List of AuditLog entries related to this DataRoom
}

// Define the schema for the DataRoom collection in MongoDB
const DataRoomSchema: Schema<IDataRoom> = new Schema(
  {
    organization_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Organization", // Refers to the Organization model
    },
    ari: {
      type: String,
      required: true,
      unique: true, // Ensures ARI is unique across the system
    },
    name: {
      type: String,
      required: true,
      trim: true, // Removes whitespace from both ends of a string
    },
    description: {
      type: String,
      trim: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Refers to the User model
    },
    created_at: {
      type: Date,
      default: Date.now, // Automatically sets the date when the document is created
    },
    modified_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    modified_at: {
      type: Date,
    },
    deleted_at: {
      type: Date,
    },
    data_residency: {
      country: { type: String, required: true },
      region: { type: String, required: true },
      data_center: { type: String, required: true },
    },
    key_info: {
      type: Object,
      default: {},
    },
    purpose: {
      type: String,
    },
    data_minimization: {
      type: Boolean,
      default: false,
    },
    retention_policy: {
      type: String,
    },
    deletion_date: {
      type: Date,
    },
    encryption_status: {
      type: String,
      enum: ["Not Encrypted", "Encrypted At Rest", "Encrypted In Transit"],
    },
    key_management: {
      key_id: { type: String },
      rotation_schedule: { type: String },
    },
    third_party_access: [
      {
        third_party_id: { type: mongoose.Schema.Types.ObjectId },
        access_granted: { type: Boolean, default: true },
        access_start_date: { type: Date, default: Date.now },
        access_end_date: { type: Date },
      },
    ],
    regulatory_hold: {
      hold_id: { type: mongoose.Schema.Types.ObjectId },
      reason: { type: String },
      applied_by: { type: mongoose.Schema.Types.ObjectId },
      applied_at: { type: Date },
      status: { type: String, enum: ["ACTIVE", "RELEASED"] },
      released_at: { type: Date },
    },
    workflow_triggers: [
      {
        event: { type: String, required: true },
        workflow_id: { type: mongoose.Schema.Types.ObjectId, required: true },
        conditions: [
          {
            attribute: { type: String },
            operator: { type: String },
            value: { type: Schema.Types.Mixed },
            type: { type: String },
          },
        ],
      },
    ],
    cabinets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cabinet" }],
    audit_trail: [{ type: mongoose.Schema.Types.ObjectId, ref: "AuditLog" }],
  },
  { timestamps: true } // Automatically manages createdAt and updatedAt fields
);

// Export the DataRoom model for use in the application
const DataRoom: Model<IDataRoom> = mongoose.model<IDataRoom>(
  "DataRoom",
  DataRoomSchema
);
export default DataRoom;

