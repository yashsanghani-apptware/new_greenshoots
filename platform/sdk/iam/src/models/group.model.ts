// src/models/group.ts

import mongoose, { Schema, Document , model } from 'mongoose';


// The IGroup interface defines the structure of a group document within 
// the system. A group represents a collection of users or other groups 
// that share common roles or policies within an organization.
export interface IGroup extends Document {
  name: string;                    // Name of the group
  description: string;             // Description of the group's purpose
  memberOf: string;                // Parent group that this group is a member of (can represent hierarchy)
  members: string[];               // List of members (could be users or sub-groups)
  policies: mongoose.Types.ObjectId[];  // List of associated policy IDs (references to Policy documents)
  organization: mongoose.Types.ObjectId; // Reference to the organization that this group belongs to
}

// Schema definition for the IGroup interface. Defines how group 
// information is structured and stored in the database.
const GroupSchema: Schema = new Schema({
  name: { type: String, required: true },               // Group name is required
  description: { type: String },                        // Description is optional
  memberOf: { type: String, required: true },           // Parent group reference is required
  members: [{ type: String }],                          // List of group members (optional)
  policies: [{ type: Schema.Types.ObjectId }], // References to associated Policy documents
  organization: { type: Schema.Types.ObjectId, required: false } // Organization reference is required
});

// Add an index to the 'name' field for fast lookup by name
GroupSchema.index({ name: 1 });

// Add an index to the 'organization' field for fast lookup by organization
GroupSchema.index({ organization: 1 });

// Add a compound index on 'name' and 'organization' if queries often involve both
GroupSchema.index({ name: 1, organization: 1 });

// Export the mongoose model for the IGroup schema, allowing interaction 
// with the 'Group' collection in MongoDB.
// export default mongoose.model<IGroup>('Group', GroupSchema);
export const Group = model<IGroup>('Group', GroupSchema);

