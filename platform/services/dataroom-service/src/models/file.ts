import mongoose, { Schema, Document, ObjectId } from "mongoose";

// IFile interface
export interface IFile extends Document {
  _id: mongoose.Types.ObjectId;
  organization_id: mongoose.Types.ObjectId;
  cabinet_id: mongoose.Types.ObjectId;
  dataroom_id: mongoose.Types.ObjectId;
  ari: string; // Unique Agsiri Resource Identifier
  name: string;
  description: string;
  created_by: mongoose.Types.ObjectId; // Renamed from user_id
  created_at: Date; // Renamed from creation_date
  modified_by?: mongoose.Types.ObjectId;
  modified_at?: Date;
  type: 'SHARED' | 'TEMPLATES' | 'SECURE';
  status: 'Pending' | 'Signed' | 'Archived'; // Specific enum for file status
  content_url: string; // Renamed from url
  encryption_key: string; // Field added for security
  isDeleted?: boolean;
  deleted_at?: Date;
  versions: { version_id: string; url: string; created_at: Date }[];

  regulatory_hold?: {
    hold_id: string;
    reason: string;
    applied_by: mongoose.Types.ObjectId;
    applied_at: Date;
    status: 'ACTIVE' | 'RELEASED';
    released_at?: Date;
  };
  
  workflow_triggers?: {
    event: string;
    workflow_id: mongoose.Types.ObjectId;
    conditions?: {
      attribute: string;
      operator: string;
      value: any;
      type: string;
    }[];
  }[];
  
  audit_trail?: string[]; // IDs of AuditLog entries related to this File
  permissions?: mongoose.Types.ObjectId[]; // IDs of Permission entries related to this File
}

// FileSchema
const FileSchema: Schema<IFile> = new mongoose.Schema(
  {
    organization_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Client",
    },
    cabinet_id: { type: mongoose.Schema.Types.ObjectId, required: false, ref: "Cabinet" },
    dataroom_id: { type: mongoose.Schema.Types.ObjectId, required: false, ref: "DataRoom" },
    ari: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    created_by: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    created_at: { type: Date, default: Date.now },
    modified_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    modified_at: { type: Date },
    type: { type: String, enum: ["SHARED", "TEMPLATES", "SECURE"], required: true },
    status: { type: String, enum: ["Pending", "Signed", "Archived"], required: true },
    content_url: { type: String, required: false },
    encryption_key: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    deleted_at: { type: Date },
    versions: [
      {
        version_id: { type: String, required: true },
        url: { type: String, required: true },
        created_at: { type: Date, default: Date.now },
      },
    ],
    regulatory_hold: {
      hold_id: { type: String },
      reason: { type: String },
      applied_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      applied_at: { type: Date },
      status: { type: String, enum: ["ACTIVE", "RELEASED"] },
      released_at: { type: Date },
    },
    workflow_triggers: [
      {
        event: { type: String },
        workflow_id: { type: mongoose.Schema.Types.ObjectId, ref: "Workflow" },
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
    audit_trail: [{ type: String }],
    permissions: [{ type: Schema.Types.ObjectId, ref: "Permission" }],
  },
  { timestamps: true }
);

const File = mongoose.model<IFile>('File', FileSchema);
export default File;
