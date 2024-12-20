// src/models/policy.ts

// Import necessary modules from mongoose
import { Schema, Document, model } from 'mongoose';

// Import types used within the Policy model for strong typing
import {
  Metadata, PrincipalPolicy, ResourcePolicy, DerivedRole, ExportVariable, AuditInfo
} from './type.model';

// Define the Policy interface that extends the Mongoose Document interface
// This interface provides strong typing for the Policy model, ensuring that each field is properly typed

export interface Policy extends Document {
  apiVersion: string;                   // The API version that this policy conforms to (required)
  metadata?: Metadata;                  // Optional metadata for the policy, such as name, namespace, labels, etc.
  principalPolicy?: PrincipalPolicy;    // Optional policy defining rules for principals (e.g., users, groups, roles)
  resourcePolicy?: ResourcePolicy;      // Optional policy defining rules for resources (e.g., services, endpoints)
  derivedRoles?: DerivedRole;           // Optional field for derived roles associated with this policy
  exportVariables?: ExportVariable;     // Optional variables that may be exported by the policy for external use
  description?: string;                 // Optional description providing a human-readable explanation of the policy
  disabled?: boolean;                   // Flag indicating whether the policy is disabled (optional)
  auditInfo: AuditInfo;                 // Audit information tracking creation and updates of the policy (required)
}

// Define the Policy Schema for MongoDB, mapping the Policy interface to the database
const PolicySchema = new Schema<Policy>({
  apiVersion: { 
    type: String, 
    required: true, 
    default: "api.agsiri.dev/v1"         // The default API version used if not explicitly provided
  },
  metadata: { 
    type: Object, 
    required: false                      // Optional metadata, following the Metadata type definition
  },
  principalPolicy: { 
    type: Object, 
    required: false                      // Optional field for principal policies
  },
  resourcePolicy: { 
    type: Object, 
    required: false                      // Optional field for resource policies
  },
  derivedRoles: { 
    type: Object, 
    required: false                      // Optional field for derived roles
  },
  exportVariables: { 
    type: Object, 
    required: false                      // Optional field for exportable variables
  },
  description: { 
    type: String, 
    required: false                      // Optional description to clarify the purpose or context of the policy
  },
  disabled: { 
    type: Boolean, 
    required: false                      // Optional flag to indicate if the policy is inactive or disabled
  },
  auditInfo: {
    createdBy: { 
      type: String, 
      required: true                      // ID of the user or system that created the policy (required)
    },
    createdAt: { 
      type: Date, 
      default: Date.now                   // Timestamp of when the policy was created, defaults to the current time
    },
    updatedBy: {  
      type: String, 
      required: false                     // ID of the user or system that last updated the policy (optional)
    },
    updatedAt: { 
      type: Date, 
      required: false                     // Timestamp of the last update, to be set when the policy is modified
    },
  },
});

// Create and export the Policy model
// This model corresponds to the 'Policy' collection in MongoDB and can be used to interact with policy documents
const PolicyModel = model<Policy>('Policy', PolicySchema);

export default PolicyModel;

