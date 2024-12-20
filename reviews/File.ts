import mongoose, { Document, Schema, Model } from "mongoose";

/**
 * IFile interface represents a File document in MongoDB.
 * A File is stored within a Cabinet and may have different versions, statuses, and security levels.
 */
export interface IFile extends Document {
  cabinet_id: mongoose.Types.ObjectId; // The ID of the Cabinet this File belongs to
  ari: string; // The unique Agsiri Resource Identifier for the File
  name: string; // Human-readable name for the File
  description?: string; // A brief description of the File
  created_by: mongoose.Types.ObjectId; // User ID of the File creator
  created_at: Date; // Timestamp of when the File was created
  modified_by?: mongoose.Types.ObjectId; // User ID of the last person who modified the File
  modified_at?: Date; // Timestamp of the last modification
  deleted_at?: Date; // Timestamp for when the File was marked as deleted
  type: "SHARED" | "TEMPLATES" | "SECURE"; // Type of the File indicating its security level
  status: "Pending" | "Signed" | "Archived"; // Current status of the File
  content_url: string; // URL to the File's location in storage
  encryption_key: string; // Encryption key used to secure the File
  isDeleted?: boolean; // Indicator of whether the File has been soft deleted
  versions: Array<{
    version_id: string; // Unique identifier for the file version
    url: string; // URL to the specific version's location in storage
    created_at: Date; // Timestamp of when the file version was created
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
  audit_trail?: mongoose.Types.ObjectId[]; // List of AuditLog entries related to this File
}

// Define the schema for the File collection in MongoDB
const FileSchema: Schema<IFile> = new Schema(
  {
    cabinet_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Cabinet", // Refers to the Cabinet model
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
      enum: ["SHARED", "TEMPLATES", "SECURE"], // Defines allowed values for the type field
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Signed", "Archived"], // Defines allowed values for the status field
      required: true,
    },
    content_url: {
      type: String,
      required: true, // URL where the file is stored
    },
    encryption_key: {
      type: String,
      required: true, // Encryption key used to secure the file
    },
    isDeleted: {
      type: Boolean,
      default: false, // Indicates if the file has been soft deleted
    },
    versions: [
      {
        version_id: { type: String, required: true },
        url: { type: String, required: true },
        created_at: { type: Date, default: Date.now },
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
    audit_trail: [{ type: mongoose.Schema.Types.ObjectId, ref: "AuditLog" }],
  },
  { timestamps: true } // Automatically manages createdAt and updatedAt fields
);

// Export the File model for use in the application
const File: Model<IFile> = mongoose.model<IFile>("File", FileSchema);
export default File;

