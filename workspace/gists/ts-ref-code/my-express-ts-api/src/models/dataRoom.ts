import mongoose, { Document, Schema } from 'mongoose';

const DataRoomSchema = new mongoose.Schema(
  {
    client_id: mongoose.Types.ObjectId,
    name: String,
    description: String,
    user_id: mongoose.Types.ObjectId,
    creation_date: { type: Date, default: Date.now },
    key_info: Object,
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }],
  },
  { timestamps: true }
);

export = mongoose.model("DataRoom", DataRoomSchema);
