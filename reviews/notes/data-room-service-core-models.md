Based on the discussions regarding regulatory holds, workflow triggers, and conditions, below are the updated schemas for the DataRoom, Cabinet, and File models. These schemas now incorporate fields to manage regulatory holds, workflow triggers, and associated conditions, providing robust control over data management processes.

### **1. DataRoom Model (`Dataroom.ts`)**

```typescript
import mongoose, { Document, Schema, Model } from "mongoose";

// Define an interface for the DataRoom document
export interface IDataRoom extends Document {
  organization_id: mongoose.Types.ObjectId; // ID of the organization owning the DataRoom
  ari: string; // Unique Agsiri Resource Identifier
  name: string;
  description: string;
  created_by: mongoose.Types.ObjectId; // ID of the user who created the DataRoom
  created_at: Date; // Timestamp of creation
  modified_by?: mongoose.Types.ObjectId; // ID of the user who last modified the DataRoom
  modified_at?: Date; // Timestamp of last modification
  deleted_at?: Date; // Timestamp of logical deletion (soft delete)
  data_residency: {
    country: string;
    region: string;
    data_center: string;
  };
  key_info: Record<string, any>; // Information related to encryption or sensitive data
  purpose?: string; // Purpose of data collection and processing
  data_minimization?: boolean; // Indicator if data minimization principles are applied
  retention_policy?: string; // Data retention policy
  deletion_date?: Date; // Date when the data is scheduled for final deletion
  encryption_status?: string; // Encryption status (Not Encrypted, Encrypted At Rest, Encrypted In Transit)
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
  regulatory_hold?: {
    hold_id: mongoose.Types.ObjectId; // Unique identifier for the hold
    reason: string; // Reason for the hold (e.g., legal investigation, audit)
    applied_by: mongoose.Types.ObjectId; // User or entity who applied the hold
    applied_at: Date; // Date when the hold was applied
    status: 'ACTIVE' | 'RELEASED'; // Status of the hold
    released_at?: Date; // Date when the hold was lifted
  };
  workflow_triggers?: {
    event: string; // Type of event (e.g., "CREATED", "DELETED", "MODIFIED")
    workflow_id: mongoose.Types.ObjectId; // ID of the workflow to be triggered
    conditions?: {
      attribute: string; // The attribute to evaluate
      operator: string; // The operator (e.g., "EQUALS", "NOT_EQUALS")
      value: any; // The value to compare against
      type: string; // The type of condition (e.g., "ATTRIBUTE", "USER", "TIME")
    }[];
  }[];
  cabinets?: mongoose.Types.ObjectId[]; // References to Cabinets
  audit_trail?: mongoose.Types.ObjectId[]; // References to audit logs
}

// Create the DataRoom schema
const DataRoomSchema: Schema<IDataRoom> = new mongoose.Schema(
  {
    organization_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Organization",
    },
    ari: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    created_by: {
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
    purpose: { type: String },
    data_minimization: { type: Boolean, default: false },
    retention_policy: { type: String },
    deletion_date: { type: Date },
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
      hold_id: { type: mongoose.Schema.Types.ObjectId, required: true },
      reason: { type: String, required: true },
      applied_by: { type: mongoose.Schema.Types.ObjectId, required: true },
      applied_at: { type: Date, required: true },
      status: { type: String, enum: ["ACTIVE", "RELEASED"], default: "ACTIVE" },
      released_at: { type: Date },
    },
    workflow_triggers: [
      {
        event: { type: String, required: true },
        workflow_id: { type: mongoose.Schema.Types.ObjectId, required: true },
        conditions: [
          {
            attribute: { type: String, required: true },
            operator: { type: String, required: true },
            value: { type: Schema.Types.Mixed, required: true },
            type: { type: String, required: true },
          },
        ],
      },
    ],
    cabinets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cabinet" }],
    audit_trail: [{ type: mongoose.Schema.Types.ObjectId, ref: "AuditLog" }],
  },
  { timestamps: true }
);

// Export the DataRoom model
const DataRoom: Model<IDataRoom> = mongoose.model<IDataRoom>(
  "DataRoom",
  DataRoomSchema
);
export default DataRoom;
```

---

### **2. Cabinet Model (`Cabinet.ts`)**

```typescript
import mongoose, { Document, Schema, Model } from "mongoose";

// Define an interface for the Cabinet document
export interface ICabinet extends Document {
  dataroom: mongoose.Types.ObjectId;
  ari: string; // Unique Agsiri Resource Identifier
  name: string;
  description: string;
  created_by: mongoose.Types.ObjectId; // ID of the user who created the Cabinet
  created_at: Date; // Timestamp of creation
  modified_by?: mongoose.Types.ObjectId; // ID of the user who last modified the Cabinet
  modified_at?: Date; // Timestamp of last modification
  deleted_at?: Date; // Timestamp of logical deletion (soft delete)
  type: 'REGULAR' | 'SECURE';
  parent_cabinet_id?: mongoose.Types.ObjectId; // ID of the parent Cabinet if nested
  regulatory_hold?: {
    hold_id: mongoose.Types.ObjectId; // Unique identifier for the hold
    reason: string; // Reason for the hold (e.g., legal investigation, audit)
    applied_by: mongoose.Types.ObjectId; // User or entity who applied the hold
    applied_at: Date; // Date when the hold was applied
    status: 'ACTIVE' | 'RELEASED'; // Status of the hold
    released_at?: Date; // Date when the hold was lifted
  };
  workflow_triggers?: {
    event: string; // Type of event (e.g., "CREATED", "DELETED", "MODIFIED")
    workflow_id: mongoose.Types.ObjectId; // ID of the workflow to be triggered
    conditions?: {
      attribute: string; // The attribute to evaluate
      operator: string; // The operator (e.g., "EQUALS", "NOT_EQUALS")
      value: any; // The value to compare against
      type: string; // The type of condition (e.g., "ATTRIBUTE", "USER", "TIME")
    }[];
  }[];
  audit_trail?: mongoose.Types.ObjectId[]; // References to audit logs
  files?: mongoose.Types.ObjectId[]; // References to Files
}

// Create the Cabinet schema
const CabinetSchema: Schema<ICabinet> = new mongoose.Schema(
  {
    dataroom: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "DataRoom",
    },
    ari: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    created_by: {
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
    deleted_at: {
      type: Date,
    },
    type: { 
      type: String, 
     

 enum: ["REGULAR", "SECURE"], 
      required: true 
    },
    parent_cabinet_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Cabinet" 
    },
    regulatory_hold: {
      hold_id: { type: mongoose.Schema.Types.ObjectId, required: true },
      reason: { type: String, required: true },
      applied_by: { type: mongoose.Schema.Types.ObjectId, required: true },
      applied_at: { type: Date, required: true },
      status: { type: String, enum: ["ACTIVE", "RELEASED"], default: "ACTIVE" },
      released_at: { type: Date },
    },
    workflow_triggers: [
      {
        event: { type: String, required: true },
        workflow_id: { type: mongoose.Schema.Types.ObjectId, required: true },
        conditions: [
          {
            attribute: { type: String, required: true },
            operator: { type: String, required: true },
            value: { type: Schema.Types.Mixed, required: true },
            type: { type: String, required: true },
          },
        ],
      },
    ],
    audit_trail: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "AuditLog" 
    }],
    files: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "File" 
    }],
  },
  { timestamps: true }
);

// Export the Cabinet model
const Cabinet: Model<ICabinet> = mongoose.model<ICabinet>(
  "Cabinet",
  CabinetSchema
);
export default Cabinet;
```

---

### **3. File Model (`File.ts`)**

```typescript
import mongoose, { Document, Schema, Model } from "mongoose";

export interface IFile extends Document {
  cabinet_id: mongoose.Types.ObjectId;
  ari: string; // Unique Agsiri Resource Identifier
  name: string;
  description: string;
  created_by: mongoose.Types.ObjectId; // ID of the user who created the File
  created_at: Date; // Timestamp of creation
  modified_by?: mongoose.Types.ObjectId; // ID of the user who last modified the File
  modified_at?: Date; // Timestamp of last modification
  deleted_at?: Date; // Timestamp of logical deletion (soft delete)
  type: 'SHARED' | 'TEMPLATES' | 'SECURE';
  status: 'Pending' | 'Signed' | 'Archived'; // Specific enum for file status
  content_url: string; // URL to the File's location in storage
  encryption_key: string; // Encryption key used to secure the File
  isDeleted?: boolean; // Soft delete indicator
  versions: { version_id: string; url: string; created_at: Date }[];
  regulatory_hold?: {
    hold_id: mongoose.Types.ObjectId; // Unique identifier for the hold
    reason: string; // Reason for the hold (e.g., legal investigation, audit)
    applied_by: mongoose.Types.ObjectId; // User or entity who applied the hold
    applied_at: Date; // Date when the hold was applied
    status: 'ACTIVE' | 'RELEASED'; // Status of the hold
    released_at?: Date; // Date when the hold was lifted
  };
  workflow_triggers?: {
    event: string; // Type of event (e.g., "CREATED", "DELETED", "MODIFIED")
    workflow_id: mongoose.Types.ObjectId; // ID of the workflow to be triggered
    conditions?: {
      attribute: string; // The attribute to evaluate
      operator: string; // The operator (e.g., "EQUALS", "NOT_EQUALS")
      value: any; // The value to compare against
      type: string; // The type of condition (e.g., "ATTRIBUTE", "USER", "TIME")
    }[];
  }[];
  audit_trail?: mongoose.Types.ObjectId[]; // References to audit logs
}

// Create the File schema
const FileSchema: Schema<IFile> = new mongoose.Schema(
  {
    cabinet_id: { 
      type: Schema.Types.ObjectId, 
      required: true, 
      ref: "Cabinet" 
    },
    ari: {
      type: String,
      required: true,
      unique: true,
    },
    name: { 
      type: String, 
      required: true, 
      trim: true 
    },
    description: { 
      type: String, 
      trim: true 
    },
    created_by: { 
      type: Schema.Types.ObjectId, 
      required: true, 
      ref: "User" 
    },
    created_at: { 
      type: Date, 
      default: Date.now 
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
      enum: ["SHARED", "TEMPLATES", "SECURE"], 
      required: true 
    },
    status: { 
      type: String, 
      enum: ["Pending", "Signed", "Archived"], 
      required: true 
    },
    content_url: { 
      type: String, 
      required: true 
    },
    encryption_key: { 
      type: String, 
      required: true 
    },
    isDeleted: { 
      type: Boolean, 
      default: false 
    },
    versions: [
      {
        version_id: { 
          type: String, 
          required: true 
        },
        url: { 
          type: String, 
          required: true 
        },
        created_at: { 
          type: Date, 
          default: Date.now 
        },
      },
    ],
    regulatory_hold: {
      hold_id: { type: mongoose.Schema.Types.ObjectId, required: true },
      reason: { type: String, required: true },
      applied_by: { type: mongoose.Schema.Types.ObjectId, required: true },
      applied_at: { type: Date, required: true },
      status: { type: String, enum: ["ACTIVE", "RELEASED"], default: "ACTIVE" },
      released_at: { type: Date },
    },
    workflow_triggers: [
      {
        event: { type: String, required: true },
        workflow_id: { type: mongoose.Schema.Types.ObjectId, required: true },
        conditions: [
          {
            attribute: { type: String, required: true },
            operator: { type: String, required: true },
            value: { type: Schema.Types.Mixed, required: true },
            type: { type: String, required: true },
          },
        ],
      },
    ],
    audit_trail: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "AuditLog" 
    }],
  },
  { timestamps: true }
);

const File: Model<IFile> = mongoose.model<IFile>("File", FileSchema);
export default File;
```

---

### **Summary of Updates**

- **Regulatory Holds**: Added a `regulatory_hold` field to each model to manage and track regulatory holds, ensuring that items cannot be modified or deleted during legal or compliance-related investigations.
  
- **Workflow Triggers**: Introduced a `workflow_triggers` field that allows the definition of event-based triggers and associated conditions. This ensures that workflows are only executed when specific criteria are met, providing greater control and automation over data management processes.

- **Condition Handling**: Integrated condition structures within the workflow triggers, allowing for detailed evaluation criteria that determine when workflows should be triggered.

- **Audit Trail Integration**: Continued to emphasize the importance of maintaining an audit trail for all actions, including regulatory holds and workflow executions, to ensure traceability and compliance.

These enhancements align the models with best practices for managing regulatory requirements, data security, and automated workflows, ensuring that the system is robust, flexible, and compliant with legal and operational standards.
