# Data Room Service - Workflow Triggers

## Example Scenario

```json
{
  "_id": "64eaca2f62e0fb5f742e8a00",
  "organization_id": "64eaca2f62e0fb5f742e8a01",
  "ari": "ari:agsiri:drs:us:123456789012:dataroom/farm240",
  "name": "Sunny Acres Data Room",
  "description": "Data Room for Sunny Acres Farm",
  "created_by": "64eaca2f62e0fb5f742e8a02",
  "created_at": "2023-09-14T08:30:00.000Z",
  "modified_by": "64eaca2f62e0fb5f742e8a03",
  "modified_at": "2023-09-15T10:15:00.000Z",
  "data_residency": {
    "country": "US",
    "region": "West",
    "data_center": "Data Center 1"
  },
  "key_info": {
    "encryption_type": "AES-256",
    "key_id": "key-123456",
    "rotation_schedule": "Every 6 months"
  },
  "purpose": "Due diligence for investment in Sunny Acres Farm",
  "data_minimization": true,
  "retention_policy": "Retain for 7 years after closure",
  "deletion_date": "2030-09-14T08:30:00.000Z",
  "encryption_status": "Encrypted At Rest",
  "key_management": {
    "key_id": "key-123456",
    "rotation_schedule": "Every 6 months"
  },
  "third_party_access": [
    {
      "third_party_id": "64eaca2f62e0fb5f742e8a04",
      "access_granted": true,
      "access_start_date": "2023-09-14T09:00:00.000Z",
      "access_end_date": "2024-09-14T09:00:00.000Z"
    }
  ],
  "regulatory_hold": {
    "hold_id": "64eaca2f62e0fb5f742e8a05",
    "reason": "Pending legal review",
    "applied_by": "64eaca2f62e0fb5f742e8a06",
    "applied_at": "2023-09-15T09:30:00.000Z",
    "status": "ACTIVE"
  },
  "workflow_triggers": [
    {
      "event": "CREATED",
      "workflow_id": "64eaca2f62e0fb5f742e8a07",
      "condition": {
        "match": {
          "all": {
            "of": [
              { "expr": "request.principal.role == 'administrator'" },
              { "expr": "request.resource.attr.complianceChecked == true" }
            ]
          }
        }
      }
    },
    {
      "event": "DELETED",
      "workflow_id": "64eaca2f62e0fb5f742e8a08",
      "condition": {
        "script": "request.resource.attr.regulatoryHoldStatus != 'ACTIVE'"
      }
    },
    {
      "event": "ACCESSED",
      "workflow_id": "64eaca2f62e0fb5f742e8a09",
      "condition": {
        "match": {
          "any": {
            "of": [
              { "expr": "request.resource.attr.sensitiveData == true" },
              { "expr": "request.principal.role != 'compliance_manager'" }
            ]
          }
        }
      }
    },
    {
      "event": "SHARED",
      "workflow_id": "64eaca2f62e0fb5f742e8a10",
      "condition": {
        "match": {
          "all": {
            "of": [
              { "expr": "request.resource.attr.owner == request.principal.id" },
              { "expr": "request.resource.attr.shareable == true" }
            ]
          }
        }
      }
    }
  ],
  "cabinets": [
    "64eaca2f62e0fb5f742e8a11",
    "64eaca2f62e0fb5f742e8a12"
  ],
  "audit_trail": [
    "64eaca2f62e0fb5f742e8a13",
    "64eaca2f62e0fb5f742e8a14"
  ]
}
```

### **Explanation of the DataRoom Object:**

- **Basic Information:**
  - `_id`: The unique identifier for the DataRoom in MongoDB.
  - `organization_id`: The ID of the organization that owns the DataRoom.
  - `ari`: The Agsiri Resource Identifier (ARI) for the DataRoom.
  - `name`: Human-readable name for the DataRoom.
  - `description`: A brief description of the DataRoom.

- **Metadata and Security:**
  - `created_by`: The user ID of the person who created the DataRoom.
  - `created_at`: The timestamp of when the DataRoom was created.
  - `modified_by`: The user ID of the last person who modified the DataRoom.
  - `modified_at`: The timestamp of the last modification.
  - `data_residency`: Information about where the data is stored, including country, region, and specific data center.
  - `key_info`: Details about encryption and key management, including the encryption type, key ID, and rotation schedule.
  - `purpose`: The purpose of the DataRoom (e.g., due diligence).
  - `data_minimization`: Flag indicating whether data minimization principles are applied.
  - `retention_policy`: The data retention policy associated with the DataRoom.
  - `deletion_date`: The scheduled date for the final deletion of the DataRoom.
  - `encryption_status`: Current encryption status of the DataRoom.
  - `key_management`: Additional key management details.

- **Access Control:**
  - `third_party_access`: A list of third-party access permissions, including the start and end dates for access.
  - `regulatory_hold`: Information about any regulatory holds applied to the DataRoom, including the reason, applied by whom, and status.

- **Workflow Triggers:**
  - `event`: The event that triggers the workflow (e.g., CREATED, DELETED, ACCESSED, SHARED).
  - `workflow_id`: The ID of the workflow to be triggered.
  - `condition`: The condition that must be met for the workflow to be triggered. This includes both match-based and script-based conditions.
    - **Match-based conditions**: Uses logical operators like `all`, `any`, and `none` to evaluate simple expressions.
    - **Script-based conditions**: Uses more complex logic in the form of scripts.

- **Relationships:**
  - `cabinets`: An array of references to the Cabinet objects associated with this DataRoom.
  - `audit_trail`: An array of references to the AuditLog entries related to this DataRoom.

### **Use Case Scenarios Covered:**

1. **CREATED Event**: The workflow for the `CREATED` event is triggered only if the user has the `administrator` role and the resource has passed compliance checks.
   
2. **DELETED Event**: The `DELETED` event triggers a workflow only if the regulatory hold is not active, as defined by a script-based condition.

3. **ACCESSED Event**: The `ACCESSED` event triggers a workflow if any condition in the `any` block is true, such as if the data is sensitive or if the user does not have the `compliance_manager` role.

4. **SHARED Event**: The `SHARED` event triggers a workflow only if the user is the owner of the resource and the resource is marked as shareable.

