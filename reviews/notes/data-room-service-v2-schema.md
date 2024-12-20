### JSON Schemas for DataRoom, Cabinet, File, and AuditLog Models

Below are the detailed JSON schemas for the DataRoom, Cabinet, File, and AuditLog models. Each attribute is explained with the business requirements it satisfies.

---

### **1. DataRoom JSON Schema**

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "DataRoom",
  "type": "object",
  "properties": {
    "organization_id": {
      "type": "string",
      "description": "The ID of the organization that owns the DataRoom. Ensures data ownership and allows for multi-tenancy."
    },
    "ari": {
      "type": "string",
      "description": "The unique Agsiri Resource Identifier for the DataRoom. Enables consistent resource identification across services."
    },
    "name": {
      "type": "string",
      "description": "The name of the DataRoom. Provides a human-readable identifier for easy reference."
    },
    "description": {
      "type": "string",
      "description": "A brief description of the DataRoom. Helps users understand the purpose or contents of the DataRoom."
    },
    "created_by": {
      "type": "string",
      "description": "The ID of the user who created the DataRoom. Tracks ownership and accountability."
    },
    "created_at": {
      "type": "string",
      "format": "date-time",
      "description": "Timestamp of when the DataRoom was created. Provides historical context for auditing and compliance."
    },
    "modified_by": {
      "type": "string",
      "description": "The ID of the user who last modified the DataRoom. Tracks changes and updates to the DataRoom."
    },
    "modified_at": {
      "type": "string",
      "format": "date-time",
      "description": "Timestamp of when the DataRoom was last modified. Ensures all changes are recorded for auditing purposes."
    },
    "deleted_at": {
      "type": "string",
      "format": "date-time",
      "description": "Timestamp of when the DataRoom was marked for deletion. Supports soft delete functionality."
    },
    "data_residency": {
      "type": "object",
      "properties": {
        "country": {
          "type": "string",
          "description": "The country where the data is stored. Ensures compliance with data residency laws."
        },
        "region": {
          "type": "string",
          "description": "The region within the country where the data is stored. Provides finer control over data storage locations."
        },
        "data_center": {
          "type": "string",
          "description": "The specific data center where the data is hosted. Allows precise tracking of data locations."
        }
      },
      "required": ["country", "region", "data_center"],
      "description": "Information about where the data is stored. Ensures compliance with global data residency regulations."
    },
    "key_info": {
      "type": "object",
      "description": "Encryption and key management information related to the DataRoom. Ensures that sensitive data is securely managed."
    },
    "purpose": {
      "type": "string",
      "description": "The purpose of the DataRoom. Helps in understanding why the data is collected and how it is used."
    },
    "data_minimization": {
      "type": "boolean",
      "description": "Indicator of whether data minimization principles are applied. Ensures compliance with privacy regulations like GDPR."
    },
    "retention_policy": {
      "type": "string",
      "description": "The data retention policy for the DataRoom. Defines how long data should be retained before it is deleted."
    },
    "deletion_date": {
      "type": "string",
      "format": "date-time",
      "description": "The date when the DataRoom is scheduled for final deletion. Supports data lifecycle management."
    },
    "encryption_status": {
      "type": "string",
      "enum": ["Not Encrypted", "Encrypted At Rest", "Encrypted In Transit"],
      "description": "The current encryption status of the DataRoom. Ensures data security during storage and transmission."
    },
    "key_management": {
      "type": "object",
      "properties": {
        "key_id": {
          "type": "string",
          "description": "The ID of the encryption key used for the DataRoom. Tracks the key used for encryption."
        },
        "rotation_schedule": {
          "type": "string",
          "description": "The key rotation schedule. Ensures that encryption keys are rotated regularly to maintain security."
        }
      },
      "description": "Key management details for the DataRoom. Ensures proper handling of encryption keys."
    },
    "third_party_access": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "third_party_id": {
            "type": "string",
            "description": "The ID of the third party granted access to the DataRoom. Tracks external entities with access."
          },
          "access_granted": {
            "type": "boolean",
            "description": "Indicates whether access is granted. Allows control over third-party access."
          },
          "access_start_date": {
            "type": "string",
            "format": "date-time",
            "description": "The date when access was granted. Ensures proper tracking of access periods."
          },
          "access_end_date": {
            "type": "string",
            "format": "date-time",
            "description": "The date when access is revoked. Helps enforce time-bound access control."
          }
        },
        "required": ["third_party_id", "access_granted", "access_start_date"]
      },
      "description": "Details about third-party access to the DataRoom. Ensures external access is properly managed and tracked."
    },
    "regulatory_hold": {
      "type": "object",
      "properties": {
        "hold_id": {
          "type": "string",
          "description": "Unique identifier for the regulatory hold. Tracks specific holds applied to the DataRoom."
        },
        "reason": {
          "type": "string",
          "description": "Reason for the hold (e.g., legal investigation, audit). Provides context for why the hold is in place."
        },
        "applied_by": {
          "type": "string",
          "description": "ID of the user or entity who applied the hold. Ensures accountability for the hold."
        },
        "applied_at": {
          "type": "string",
          "format": "date-time",
          "description": "Date when the hold was applied. Tracks the duration of the hold."
        },
        "status": {
          "type": "string",
          "enum": ["ACTIVE", "RELEASED"],
          "description": "Current status of the hold. Indicates whether the hold is still in effect or has been released."
        },
        "released_at": {
          "type": "string",
          "format": "date-time",
          "description": "Date when the hold was lifted. Provides a complete record of the hold's lifecycle."
        }
      },
      "description": "Information related to any regulatory holds applied to the DataRoom. Ensures compliance with legal and regulatory requirements."
    },
    "workflow_triggers": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "event": {
            "type": "string",
            "description": "The event that triggers the workflow (e.g., 'CREATED', 'DELETED'). Defines the conditions under which the workflow is executed."
          },
          "workflow_id": {
            "type": "string",
            "description": "ID of the workflow to be triggered. Connects the event to a specific workflow."
          },
          "conditions": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "attribute": {
                  "type": "string",
                  "description": "The attribute to evaluate in the condition (e.g., 'status'). Specifies what is being checked."
                },
                "operator": {
                  "type": "string",
                  "description": "The operator used for comparison (e.g., 'EQUALS', 'NOT_EQUALS'). Defines how the attribute value is compared."
                },
                "value": {
                  "type": "any",
                  "description": "The value to compare against. Determines what the attribute is being compared to."
                },
                "type": {
                  "type": "string",
                  "description": "The type of condition (e.g., 'ATTRIBUTE', 'USER'). Categorizes the condition for proper evaluation."
                }
              },
              "required": ["attribute", "operator", "value", "type"]
            },
            "description": "Conditions that must be met for the workflow to be triggered. Allows for granular control over workflow execution."
          }
        },
        "required": ["event", "workflow_id"]
      },
      "description": "Workflow triggers based on specific events and conditions. Automates processes in response to events within the DataRoom."
    },
    "cabinets": {
      "type": "array",
      "items": {
        "type": "string",
        "description": "IDs of the Cabinets associated with the DataRoom. Organizes the hierarchical structure of the DataRoom."
      },
      "description": "References to Cabinets within the DataRoom. Supports the organization of files and documents."
    },
    "audit_trail": {
     

 "type": "array",
      "items": {
        "type": "string",
        "description": "IDs of AuditLog entries related to this DataRoom. Ensures all actions are tracked and auditable."
      },
      "description": "Audit trail for actions related to the DataRoom. Provides traceability and supports compliance."
    }
  },
  "required": ["organization_id", "ari", "name", "created_by", "created_at", "data_residency"],
  "additionalProperties": false
}
```

#### **Explanation of Attributes**

- **`organization_id`**: Tracks ownership of the DataRoom, supporting multi-tenancy by associating each DataRoom with a specific organization.
- **`ari`**: Provides a unique identifier within the Agsiri ecosystem, ensuring consistent identification and access control across services.
- **`name`**: Allows users to easily reference and identify the DataRoom.
- **`description`**: Offers a summary of the DataRoom’s purpose or contents, aiding in user understanding and searchability.
- **`created_by`** and **`modified_by`**: Ensure accountability by recording the user responsible for creating or modifying the DataRoom.
- **`created_at`**, **`modified_at`**, and **`deleted_at`**: Provide timestamps for key actions, supporting auditing and compliance with data management policies.
- **`data_residency`**: Ensures compliance with data residency regulations by tracking the physical location of data storage.
- **`key_info`**: Manages encryption and security settings, ensuring sensitive data is protected.
- **`regulatory_hold`**: Tracks any legal or regulatory restrictions on the DataRoom, preventing deletion or modification during investigations or audits.
- **`workflow_triggers`**: Automates responses to specific events, ensuring that business processes are consistently applied and regulatory requirements are met.
- **`cabinets`**: Organizes the DataRoom’s contents, supporting a hierarchical structure of documents and files.
- **`audit_trail`**: Links to audit logs, ensuring all actions are tracked and can be reviewed for compliance.

---

### **2. Cabinet JSON Schema**

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Cabinet",
  "type": "object",
  "properties": {
    "dataroom": {
      "type": "string",
      "description": "The ID of the DataRoom this Cabinet belongs to. Ensures hierarchical organization and access control."
    },
    "ari": {
      "type": "string",
      "description": "The unique Agsiri Resource Identifier for the Cabinet. Enables consistent resource identification across services."
    },
    "name": {
      "type": "string",
      "description": "The name of the Cabinet. Provides a human-readable identifier for easy reference."
    },
    "description": {
      "type": "string",
      "description": "A brief description of the Cabinet. Helps users understand the purpose or contents of the Cabinet."
    },
    "created_by": {
      "type": "string",
      "description": "The ID of the user who created the Cabinet. Tracks ownership and accountability."
    },
    "created_at": {
      "type": "string",
      "format": "date-time",
      "description": "Timestamp of when the Cabinet was created. Provides historical context for auditing and compliance."
    },
    "modified_by": {
      "type": "string",
      "description": "The ID of the user who last modified the Cabinet. Tracks changes and updates to the Cabinet."
    },
    "modified_at": {
      "type": "string",
      "format": "date-time",
      "description": "Timestamp of when the Cabinet was last modified. Ensures all changes are recorded for auditing purposes."
    },
    "deleted_at": {
      "type": "string",
      "format": "date-time",
      "description": "Timestamp of when the Cabinet was marked for deletion. Supports soft delete functionality."
    },
    "type": {
      "type": "string",
      "enum": ["REGULAR", "SECURE"],
      "description": "The type of the Cabinet, indicating its security level. 'REGULAR' for standard files, 'SECURE' for sensitive documents."
    },
    "parent_cabinet_id": {
      "type": "string",
      "description": "ID of the parent Cabinet if this is a nested Cabinet. Supports hierarchical organization of Cabinets."
    },
    "regulatory_hold": {
      "type": "object",
      "properties": {
        "hold_id": {
          "type": "string",
          "description": "Unique identifier for the regulatory hold. Tracks specific holds applied to the Cabinet."
        },
        "reason": {
          "type": "string",
          "description": "Reason for the hold (e.g., legal investigation, audit). Provides context for why the hold is in place."
        },
        "applied_by": {
          "type": "string",
          "description": "ID of the user or entity who applied the hold. Ensures accountability for the hold."
        },
        "applied_at": {
          "type": "string",
          "format": "date-time",
          "description": "Date when the hold was applied. Tracks the duration of the hold."
        },
        "status": {
          "type": "string",
          "enum": ["ACTIVE", "RELEASED"],
          "description": "Current status of the hold. Indicates whether the hold is still in effect or has been released."
        },
        "released_at": {
          "type": "string",
          "format": "date-time",
          "description": "Date when the hold was lifted. Provides a complete record of the hold's lifecycle."
        }
      },
      "description": "Information related to any regulatory holds applied to the Cabinet. Ensures compliance with legal and regulatory requirements."
    },
    "workflow_triggers": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "event": {
            "type": "string",
            "description": "The event that triggers the workflow (e.g., 'CREATED', 'DELETED'). Defines the conditions under which the workflow is executed."
          },
          "workflow_id": {
            "type": "string",
            "description": "ID of the workflow to be triggered. Connects the event to a specific workflow."
          },
          "conditions": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "attribute": {
                  "type": "string",
                  "description": "The attribute to evaluate in the condition (e.g., 'status'). Specifies what is being checked."
                },
                "operator": {
                  "type": "string",
                  "description": "The operator used for comparison (e.g., 'EQUALS', 'NOT_EQUALS'). Defines how the attribute value is compared."
                },
                "value": {
                  "type": "any",
                  "description": "The value to compare against. Determines what the attribute is being compared to."
                },
                "type": {
                  "type": "string",
                  "description": "The type of condition (e.g., 'ATTRIBUTE', 'USER'). Categorizes the condition for proper evaluation."
                }
              },
              "required": ["attribute", "operator", "value", "type"]
            },
            "description": "Conditions that must be met for the workflow to be triggered. Allows for granular control over workflow execution."
          }
        },
        "required": ["event", "workflow_id"]
      },
      "description": "Workflow triggers based on specific events and conditions. Automates processes in response to events within the Cabinet."
    },
    "audit_trail": {
      "type": "array",
      "items": {
        "type": "string",
        "description": "IDs of AuditLog entries related to this Cabinet. Ensures all actions are tracked and auditable."
      },
      "description": "Audit trail for actions related to the Cabinet. Provides traceability and supports compliance."
    },
    "files": {
      "type": "array",
      "items": {
        "type": "string",
        "description": "IDs of the Files stored in the Cabinet. Organizes the contents of the Cabinet."
      },
      "description": "References to Files within the Cabinet. Supports the organization of documents."
    }
  },
  "required": ["dataroom", "ari", "name", "created_by", "created_at", "type"],
  "additionalProperties": false
}
```

#### **Explanation of Attributes**

- **`dataroom`**: Associates the Cabinet with its parent DataRoom, maintaining the hierarchical structure.
- **`ari`**: Ensures consistent identification across services by assigning a unique identifier to the Cabinet.
- **`name`**: Provides a user-friendly name for the Cabinet, aiding in navigation and identification.
- **`description`**: Describes the contents or purpose of the Cabinet, helping users understand what it contains.
- **`created_by`** and **`modified_by`**: Track user actions, ensuring accountability for the creation and modification of Cabinets.
- **`created_at`**, **`modified_at`**, and **`deleted_at`**: Timestamps that support auditing and compliance by recording key actions.
- **`type`**: Differentiates between regular and secure Cabinets, allowing for the appropriate security measures to be applied.
- **`parent_cabinet_id`**: Supports the nesting of Cabinets within one another, enabling complex organizational structures.
- **`regulatory_hold`**: Manages legal or regulatory holds,

 preventing deletion or modification during investigations.
- **`workflow_triggers`**: Automates the execution of workflows in response to specific events, ensuring consistency and compliance.
- **`audit_trail`**: Links to audit logs, ensuring all actions related to the Cabinet are tracked and can be reviewed.
- **`files`**: Organizes the contents of the Cabinet by associating it with the Files it contains.

---

### **3. File JSON Schema**

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "File",
  "type": "object",
  "properties": {
    "cabinet_id": {
      "type": "string",
      "description": "The ID of the Cabinet this File belongs to. Ensures hierarchical organization and access control."
    },
    "ari": {
      "type": "string",
      "description": "The unique Agsiri Resource Identifier for the File. Enables consistent resource identification across services."
    },
    "name": {
      "type": "string",
      "description": "The name of the File. Provides a human-readable identifier for easy reference."
    },
    "description": {
      "type": "string",
      "description": "A brief description of the File. Helps users understand the purpose or contents of the File."
    },
    "created_by": {
      "type": "string",
      "description": "The ID of the user who created the File. Tracks ownership and accountability."
    },
    "created_at": {
      "type": "string",
      "format": "date-time",
      "description": "Timestamp of when the File was created. Provides historical context for auditing and compliance."
    },
    "modified_by": {
      "type": "string",
      "description": "The ID of the user who last modified the File. Tracks changes and updates to the File."
    },
    "modified_at": {
      "type": "string",
      "format": "date-time",
      "description": "Timestamp of when the File was last modified. Ensures all changes are recorded for auditing purposes."
    },
    "deleted_at": {
      "type": "string",
      "format": "date-time",
      "description": "Timestamp of when the File was marked for deletion. Supports soft delete functionality."
    },
    "type": {
      "type": "string",
      "enum": ["SHARED", "TEMPLATES", "SECURE"],
      "description": "The type of the File, indicating its security level. 'SHARED' for public files, 'TEMPLATES' for e-signing, 'SECURE' for sensitive documents."
    },
    "status": {
      "type": "string",
      "enum": ["Pending", "Signed", "Archived"],
      "description": "The current status of the File. Tracks the file's lifecycle from creation to archiving."
    },
    "content_url": {
      "type": "string",
      "description": "The URL to the File's location in storage. Provides access to the actual file content."
    },
    "encryption_key": {
      "type": "string",
      "description": "The encryption key used to secure the File. Ensures that sensitive data is protected."
    },
    "isDeleted": {
      "type": "boolean",
      "default": false,
      "description": "Indicator of whether the File has been soft deleted. Supports data recovery and compliance."
    },
    "versions": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "version_id": {
            "type": "string",
            "description": "Unique identifier for the file version. Tracks different versions of the file."
          },
          "url": {
            "type": "string",
            "description": "The URL to the specific version's location in storage. Provides access to the file version."
          },
          "created_at": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp of when the file version was created. Tracks the creation of different file versions."
          }
        },
        "required": ["version_id", "url", "created_at"]
      },
      "description": "The version history of the File. Supports version control and data recovery."
    },
    "regulatory_hold": {
      "type": "object",
      "properties": {
        "hold_id": {
          "type": "string",
          "description": "Unique identifier for the regulatory hold. Tracks specific holds applied to the File."
        },
        "reason": {
          "type": "string",
          "description": "Reason for the hold (e.g., legal investigation, audit). Provides context for why the hold is in place."
        },
        "applied_by": {
          "type": "string",
          "description": "ID of the user or entity who applied the hold. Ensures accountability for the hold."
        },
        "applied_at": {
          "type": "string",
          "format": "date-time",
          "description": "Date when the hold was applied. Tracks the duration of the hold."
        },
        "status": {
          "type": "string",
          "enum": ["ACTIVE", "RELEASED"],
          "description": "Current status of the hold. Indicates whether the hold is still in effect or has been released."
        },
        "released_at": {
          "type": "string",
          "format": "date-time",
          "description": "Date when the hold was lifted. Provides a complete record of the hold's lifecycle."
        }
      },
      "description": "Information related to any regulatory holds applied to the File. Ensures compliance with legal and regulatory requirements."
    },
    "workflow_triggers": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "event": {
            "type": "string",
            "description": "The event that triggers the workflow (e.g., 'CREATED', 'DELETED'). Defines the conditions under which the workflow is executed."
          },
          "workflow_id": {
            "type": "string",
            "description": "ID of the workflow to be triggered. Connects the event to a specific workflow."
          },
          "conditions": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "attribute": {
                  "type": "string",
                  "description": "The attribute to evaluate in the condition (e.g., 'status'). Specifies what is being checked."
                },
                "operator": {
                  "type": "string",
                  "description": "The operator used for comparison (e.g., 'EQUALS', 'NOT_EQUALS'). Defines how the attribute value is compared."
                },
                "value": {
                  "type": "any",
                  "description": "The value to compare against. Determines what the attribute is being compared to."
                },
                "type": {
                  "type": "string",
                  "description": "The type of condition (e.g., 'ATTRIBUTE', 'USER'). Categorizes the condition for proper evaluation."
                }
              },
              "required": ["attribute", "operator", "value", "type"]
            },
            "description": "Conditions that must be met for the workflow to be triggered. Allows for granular control over workflow execution."
          }
        },
        "required": ["event", "workflow_id"]
      },
      "description": "Workflow triggers based on specific events and conditions. Automates processes in response to events within the File."
    },
    "audit_trail": {
      "type": "array",
      "items": {
        "type": "string",
        "description": "IDs of AuditLog entries related to this File. Ensures all actions are tracked and auditable."
      },
      "description": "Audit trail for actions related to the File. Provides traceability and supports compliance."
    }
  },
  "required": ["cabinet_id", "ari", "name", "created_by", "created_at", "type", "status", "content_url", "encryption_key"],
  "additionalProperties": false
}
```

#### **Explanation of Attributes**

- **`cabinet_id`**: Associates the File with its parent Cabinet, ensuring it is part of the organized hierarchy.
- **`ari`**: Provides a unique identifier within the Agsiri ecosystem, enabling consistent resource identification.
- **`name`**: Allows users to easily reference and identify the File.
- **`description`**: Describes the contents or purpose of the File, aiding in understanding and searchability.
- **`created_by`** and **`modified_by`**: Ensure accountability by recording the user responsible for creating or modifying the File.
- **`created_at`**, **`modified_at`**, and **`deleted_at`**: Provide timestamps for key actions, supporting auditing and compliance with data management policies.
- **`type`**: Differentiates between shared, template, and secure files, allowing for appropriate security measures to be applied.
- **`status`**: Tracks the lifecycle of the File, ensuring proper handling of documents from creation to archiving.
- **`content_url`**: Stores the location of the File in the storage system, enabling access to the file’s content.
- **`encryption_key`**: Manages the encryption of the File, ensuring that sensitive data is protected.
- **`versions`**: Supports version control by tracking different versions of the File, aiding in recovery and compliance.
- **`regulatory_hold`**: Manages legal or regulatory holds, preventing deletion or modification during investigations.
-

 **`workflow_triggers`**: Automates the execution of workflows in response to specific events, ensuring consistency and compliance.
- **`audit_trail`**: Links to audit logs, ensuring all actions related to the File are tracked and can be reviewed.

---

### **4. AuditLog JSON Schema**

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "AuditLog",
  "type": "object",
  "properties": {
    "event_type": {
      "type": "string",
      "description": "The type of event being logged (e.g., 'CREATION', 'MODIFICATION', 'DELETION', 'ACCESS'). Categorizes the log entry."
    },
    "entity_type": {
      "type": "string",
      "description": "The type of entity involved in the event (e.g., 'DataRoom', 'Cabinet', 'File'). Provides context for the event."
    },
    "entity_id": {
      "type": "string",
      "description": "The ID of the entity involved in the event. Allows the specific instance of the entity to be traced within the logs."
    },
    "user_id": {
      "type": "string",
      "description": "The ID of the user who performed the action. Tracks accountability for the event."
    },
    "action": {
      "type": "string",
      "description": "The specific action taken (e.g., 'CREATED', 'DELETED', 'MODIFIED'). Provides clear insight into what was done."
    },
    "timestamp": {
      "type": "string",
      "format": "date-time",
      "description": "The date and time when the event occurred. Ensures that all actions are chronologically recorded."
    },
    "details": {
      "type": "object",
      "description": "Additional details about the event. Captures any extra information that is relevant to the action."
    },
    "ip_address": {
      "type": "string",
      "description": "The IP address of the user who performed the action. Useful for security auditing and tracking unauthorized access."
    },
    "user_agent": {
      "type": "string",
      "description": "The user agent string of the client used to perform the action. Identifies the platform and tools used."
    }
  },
  "required": ["event_type", "entity_type", "entity_id", "user_id", "action", "timestamp"],
  "additionalProperties": false
}
```

#### **Explanation of Attributes**

- **`event_type`**: Categorizes the type of event being logged, making it easier to search and filter log entries.
- **`entity_type`**: Provides context by specifying what type of entity (e.g., DataRoom, Cabinet, File) was involved in the event.
- **`entity_id`**: Links the log entry to a specific instance of an entity, ensuring traceability.
- **`user_id`**: Tracks the user who performed the action, providing accountability.
- **`action`**: Describes the specific action taken, giving clear insight into the event.
- **`timestamp`**: Ensures that all actions are recorded with the exact time they occurred, which is crucial for auditing.
- **`details`**: Allows for additional information to be captured, ensuring that any relevant context is logged.
- **`ip_address`** and **`user_agent`**: Provide details about the origin of the action, aiding in security audits and investigations.

### **Conclusion**

These JSON schemas define the structure and attributes for the DataRoom, Cabinet, File, and AuditLog models, ensuring that the system can effectively manage and track data, enforce compliance, and automate workflows. Each attribute is designed to meet specific business requirements, from ensuring data security and compliance with regulations to automating processes and providing detailed audit trails for all actions taken within the system.
