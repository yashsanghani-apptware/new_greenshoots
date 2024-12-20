### AuditLog Model

The `AuditLog` model is essential for maintaining a detailed record of all actions taken within the system, especially those related to sensitive operations such as deletions, modifications, regulatory holds, and workflow executions. This model ensures that every significant event is captured and can be reviewed for compliance, security audits, and troubleshooting.

### **Key Considerations for the AuditLog Model**

1. **Event Capture**: The `AuditLog` should capture a wide range of events, including but not limited to the creation, modification, deletion, and access of DataRooms, Cabinets, and Files. It should also log workflow executions, the application and release of regulatory holds, and any changes to security settings.

2. **Traceability**: Each audit log entry must include references to the entity involved, the user who performed the action, the action taken, and the timestamp. This ensures that actions can be traced back to specific users and events.

3. **Security and Integrity**: Audit logs must be immutable, meaning once an entry is created, it cannot be modified or deleted. This guarantees the integrity of the logs and ensures they are reliable for auditing purposes.

4. **Retention and Access**: Implement retention policies for audit logs in accordance with legal and regulatory requirements. Access to audit logs should be restricted to authorized personnel only.

### **AuditLog Model Schema**

```typescript
import mongoose, { Document, Schema, Model } from "mongoose";

// Define an interface for the AuditLog document
export interface IAuditLog extends Document {
  event_type: string; // Type of event (e.g., "CREATION", "MODIFICATION", "DELETION", "ACCESS")
  entity_type: string; // Type of entity involved (e.g., "DataRoom", "Cabinet", "File", "Workflow")
  entity_id: mongoose.Types.ObjectId; // ID of the entity involved in the event
  user_id: mongoose.Types.ObjectId; // ID of the user who performed the action
  action: string; // Specific action taken (e.g., "CREATED", "DELETED", "MODIFIED")
  timestamp: Date; // Timestamp of when the event occurred
  details?: Record<string, any>; // Additional details about the event
  ip_address?: string; // IP address of the user who performed the action
  user_agent?: string; // User agent string of the browser or client used
}

// Create the AuditLog schema
const AuditLogSchema: Schema<IAuditLog> = new mongoose.Schema(
  {
    event_type: {
      type: String,
      required: true,
    },
    entity_type: {
      type: String,
      required: true,
    },
    entity_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'entity_type', // Dynamic reference based on entity type
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    action: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    details: {
      type: Object,
      default: {},
    },
    ip_address: {
      type: String,
    },
    user_agent: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Export the AuditLog model
const AuditLog: Model<IAuditLog> = mongoose.model<IAuditLog>(
  "AuditLog",
  AuditLogSchema
);
export default AuditLog;
```

### **Attributes in the AuditLog Model**

1. **event_type (string, required)**: Describes the type of event being logged, such as `CREATION`, `MODIFICATION`, `DELETION`, `ACCESS`, `WORKFLOW_EXECUTION`, etc. This field helps categorize the log entries.

2. **entity_type (string, required)**: Specifies the type of entity involved in the event, such as `DataRoom`, `Cabinet`, `File`, `Workflow`, etc. This allows the log to dynamically reference the entity based on its type.

3. **entity_id (ObjectId, required)**: The unique identifier of the entity that was involved in the event. This allows the specific instance of the entity to be traced within the logs. The `refPath` is used to dynamically reference different models based on the `entity_type`.

4. **user_id (ObjectId, required)**: The ID of the user who performed the action. This attribute links the action to a specific user, aiding in accountability and traceability.

5. **action (string, required)**: Describes the specific action taken, such as `CREATED`, `DELETED`, `MODIFIED`, `ACCESSED`, etc. This provides clear insight into what was done during the event.

6. **timestamp (Date, required)**: The date and time when the event occurred. This ensures that all actions are chronologically recorded, which is essential for auditing and investigation.

7. **details (object, optional)**: A flexible field that allows additional details related to the event to be stored. For example, if a file was modified, this field could store information about the specific changes made.

8. **ip_address (string, optional)**: The IP address of the user who performed the action. This is particularly useful for security auditing and tracking unauthorized access attempts.

9. **user_agent (string, optional)**: The user agent string of the client (e.g., web browser) used to perform the action. This can help identify the platform and tools used, which is useful for security analysis.

### **Integration with Other Models**

- **Regulatory Holds**: Whenever a regulatory hold is applied or released, an audit log entry should be created to document this action. The `entity_type` would be the type of entity affected (e.g., `DataRoom`, `Cabinet`, `File`), and `action` would be `HOLD_APPLIED` or `HOLD_RELEASED`.

- **Workflow Execution**: When a workflow is triggered, an audit log entry should record the execution. This includes details about the workflow, the conditions evaluated, and the outcome.

- **Deletion and Modification**: Any deletion or modification of DataRooms, Cabinets, or Files should be logged, capturing the `action`, `user_id`, `entity_type`, and `entity_id`, along with any relevant `details`.

### **Conclusion**

The `AuditLog` model plays a crucial role in maintaining transparency, security, and compliance within the system. By capturing detailed information about every significant event, it ensures that actions can be traced, reviewed, and audited as needed. The model’s flexibility allows it to accommodate a wide range of events, making it an integral part of the overall data management strategy.
