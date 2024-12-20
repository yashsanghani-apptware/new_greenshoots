import mongoose, { Document, Schema, Model } from "mongoose";

/**
 * ICabinet interface represents a Cabinet document in MongoDB.
 * A Cabinet is a container within a DataRoom, holding files and potentially other Cabinets.
 */
export interface ICabinet extends Document {
  dataroom: mongoose.Types.ObjectId; // The ID of the DataRoom this Cabinet belongs to
  ari: string; // The unique Agsiri Resource Identifier for the Cabinet
  name: string; // Human-readable name for the Cabinet
  description?: string; // A brief description of the Cabinet
  created_by: mongoose.Types.ObjectId; // User ID of the Cabinet creator
  created_at: Date; // Timestamp of when the Cabinet was created
  modified_by?: mongoose.Types.ObjectId; // User ID of the last person who modified the Cabinet
  modified_at?: Date; // Timestamp of the last modification
  deleted_at?: Date; // Timestamp for when the Cabinet was marked as deleted
  type: "REGULAR" | "SECURE"; // Indicates the security level of the Cabinet
  parent_cabinet_id?: mongoose.Types.ObjectId; // ID of the parent Cabinet if nested
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
  audit_trail?: mongoose.Types.ObjectId[]; // List of AuditLog entries related to this Cabinet
  files?: mongoose.Types.ObjectId[]; // List of Files stored in this Cabinet
}

// Define the schema for the Cabinet collection in MongoDB
const CabinetSchema: Schema<ICabinet> = new Schema(
  {
    dataroom: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "DataRoom", // Refers to the DataRoom model
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
    type: {
      type: String,
      enum: ["REGULAR", "SECURE"], // Defines allowed values for the type field
      required: true,
    },
    parent_cabinet_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cabinet", // Self-reference to support nested Cabinets
    },
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
    audit_trail: [{ type: mongoose.Schema.Types.ObjectId, ref: "AuditLog" }],
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }],
  },
  { timestamps: true } // Automatically manages createdAt and updatedAt fields
);

// Export the Cabinet model for use in the application
const Cabinet: Model<ICabinet> = mongoose.model<ICabinet>(
  "Cabinet",
  CabinetSchema
);
export default Cabinet;

