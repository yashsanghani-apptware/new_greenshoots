import mongoose, { Document, Schema, Model } from "mongoose";

// Define an interface for the DataRoom document
export interface IDataRoom extends Document {
  organization_id: mongoose.Types.ObjectId; // Renamed from client_id
  ari: string; // Unique Agsiri Resource Identifier
  name: string;
  description: string;
  created_by: mongoose.Types.ObjectId; // Renamed from user_id
  owner: mongoose.Types.ObjectId; // Renamed from user_id
  created_at: Date; // Renamed from creation_date
  modified_by?: mongoose.Types.ObjectId;
  modified_at?: Date;
  data_residency: {
    country: string;
    region: string;
    data_center: string;
  };
  key_info: Record<string, any>; // Assuming it's related to encryption or other sensitive data
  purpose?: string;
  data_minimization?: boolean;
  retention_policy?: string;
  isDeleted?: boolean;
  deleted_at?: Date;
  encryption_status?: string;
  key_management?: {
    key_id: string;
    rotation_schedule: string;
  };
  third_party_access?: {
    third_party_id: mongoose.Types.ObjectId;
    access_granted: boolean;
    access_start_date: Date;
    access_end_date?: Date;
  }[];
  cabinets?: mongoose.Types.ObjectId[];
  audit_trail?: mongoose.Types.ObjectId[];
  files: mongoose.Types.ObjectId[];
  permissions: mongoose.Types.ObjectId[];
}

// Create the DataRoom schema
const DataRoomSchema: Schema<IDataRoom> = new mongoose.Schema(
  {
    organization_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Client", // Assuming you have a Client model
    },
    ari: {
      type: String,
      required: true,
      // unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    modified_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    modified_at: {
      type: Date,
    },
    data_residency: {
      country: { type: String, required: true },
      region: { type: String, required: true },
      data_center: { type: String, required: true },
    },
    key_info: {
      type: Schema.Types.Mixed, // Using Mixed type for a flexible schema
      default: {},
    },
    purpose: {
      type: String,
    },
    data_minimization: {
      type: Boolean,
    },
    retention_policy: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deleted_at: {
      type: Date,
    },
    encryption_status: {
      type: String,
    },
    key_management: {
      key_id: { type: String },
      rotation_schedule: { type: String },
    },
    third_party_access: [
      {
        third_party_id: { type: mongoose.Schema.Types.ObjectId, ref: "ThirdParty" }, // Assuming you have a ThirdParty model
        access_granted: { type: Boolean, required: true },
        access_start_date: { type: Date, required: true },
        access_end_date: { type: Date },
      },
    ],
    cabinets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cabinet",
      },
    ],
    audit_trail: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AuditLog",
      },
    ],
    files: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "File",
      },
    ],
  },
  { timestamps: true }
);

// Export the DataRoom model
const DataRoom: Model<IDataRoom> = mongoose.model<IDataRoom>(
  "DataRoom",
  DataRoomSchema
);
export default DataRoom;
