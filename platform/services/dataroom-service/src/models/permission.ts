import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { v4 as uuidv4 } from "uuid";

// Define an interface for the Permission document
export interface IPermission extends Document {
  _id: Types.ObjectId;
  permission_id: string;
  type: "VIEW" | "READ" | "WRITE" | "CREATE";
  roles: string[];
  users: string[];
  start_time?: Date;
  end_time?: Date;
}

// Define the Permission schema
const PermissionSchema: Schema<IPermission> = new Schema({
  permission_id: { type: String, default: uuidv4, unique: true },
  type: {
    type: String,
    enum: ["VIEW", "READ", "WRITE", "CREATE"],
    required: true,
  },
  roles: { type: [String], required: true },
  users: { type: [String], required: true },
  start_time: { type: Date },
  end_time: { type: Date },
});

// Export the Mongoose model and schema
const Permission: Model<IPermission> = mongoose.model<IPermission>(
  "Permission",
  PermissionSchema
);
export default Permission;
