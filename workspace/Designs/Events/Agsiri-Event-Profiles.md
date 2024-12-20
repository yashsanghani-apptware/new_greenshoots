## Developer Guide: Validating Agsiri Platform Events

This guide provides detailed explanations and examples of how to validate different event types in the Agsiri platform using the JSON schema. It includes both positive (valid) and negative (invalid) scenarios for each event type.

### Overview

The Agsiri platform uses event-driven architecture, where events are created, updated, and processed across various services. Each event must conform to a specific JSON schema to ensure data consistency and integrity.

The schema defines the structure of events, including properties such as `eventType`, `eventVersion`, `timestamp`, `source`, and `payload`. The `payload` property varies depending on the type of event (e.g., listing, farm, offering, campaign, data room, portfolio, investor, user, role, policy).

### Positive (Valid) Scenarios

Here are valid examples for each event type:

#### Listing Event

**Example:**
```json
{
  "eventType": "ListingCreated",
  "eventVersion": "1.0",
  "timestamp": "2024-08-05T14:48:00Z",
  "source": "listing-service",
  "payload": {
    "listingId": "listing-001",
    "name": "Farm Equipment",
    "description": "High quality farm equipment.",
    "category": "Machinery",
    "price": 1000,
    "status": "active"
  }
}
```

**Explanation:**
- `eventType`: Specifies the type of event. Here, it's "ListingCreated".
- `eventVersion`: Specifies the version of the event schema.
- `timestamp`: The timestamp when the event occurred, in ISO 8601 format.
- `source`: The source of the event, e.g., the service name.
- `payload`: Contains specific data related to the listing event, including all required fields like `listingId`, `name`, `description`, `category`, `price`, and `status`.

#### Farm Event

**Example:**
```json
{
  "eventType": "FarmCreated",
  "eventVersion": "1.0",
  "timestamp": "2024-08-05T15:00:00Z",
  "source": "farm-service",
  "payload": {
    "farmId": "farm-001",
    "location": {
      "latitude": 34.05,
      "longitude": -118.25
    },
    "size": 150,
    "crops": ["corn", "wheat", "barley"],
    "status": "operational"
  }
}
```

**Explanation:**
- `payload`: Contains specific data related to the farm event, including `farmId`, `location` (with `latitude` and `longitude`), `size`, `crops`, and `status`.

#### Offering Event

**Example:**
```json
{
  "eventType": "OfferingCreated",
  "eventVersion": "1.0",
  "timestamp": "2024-08-05T15:10:00Z",
  "source": "offering-service",
  "payload": {
    "offeringId": "offering-001",
    "name": "Investment Opportunity",
    "description": "A great investment opportunity.",
    "price": 5000,
    "status": "open"
  }
}
```

**Explanation:**
- `payload`: Contains specific data related to the offering event, including `offeringId`, `name`, `description`, `price`, and `status`.

#### Campaign Event

**Example:**
```json
{
  "eventType": "CampaignCreated",
  "eventVersion": "1.0",
  "timestamp": "2024-08-05T15:20:00Z",
  "source": "campaign-service",
  "payload": {
    "campaignId": "campaign-001",
    "title": "Marketing Campaign",
    "budget": 20000,
    "duration": "30 days",
    "status": "active"
  }
}
```

**Explanation:**
- `payload`: Contains specific data related to the campaign event, including `campaignId`, `title`, `budget`, `duration`, and `status`.

#### Data Room Event

**Example:**
```json
{
  "eventType": "DataRoomCreated",
  "eventVersion": "1.0",
  "timestamp": "2024-08-05T15:30:00Z",
  "source": "dataroom-service",
  "payload": {
    "dataRoomId": "dataroom-001",
    "name": "Project Documents",
    "description": "Documents related to the project.",
    "documents": [
      {
        "documentId": "doc-001",
        "title": "Business Plan",
        "url": "https://example.com/documents/business-plan"
      },
      {
        "documentId": "doc-002",
        "title": "Financial Report",
        "url": "https://example.com/documents/financial-report"
      }
    ],
    "status": "open"
  }
}
```

**Explanation:**
- `payload`: Contains specific data related to the data room event, including `dataRoomId`, `name`, `description`, `documents` (an array of document objects), and `status`.

#### Portfolio Event

**Example:**
```json
{
  "eventType": "PortfolioCreated",
  "eventVersion": "1.0",
  "timestamp": "2024-08-05T15:40:00Z",
  "source": "portfolio-service",
  "payload": {
    "portfolioId": "portfolio-001",
    "name": "Investor Portfolio",
    "description": "A portfolio of investments.",
    "assets": [
      {
        "assetId": "asset-001",
        "name": "Stock A",
        "value": 10000
      },
      {
        "assetId": "asset-002",
        "name": "Stock B",
        "value": 15000
      },
      {
        "assetId": "asset-003",
        "name": "Bond C",
        "value": 5000
      }
    ],
    "status": "active"
  }
}
```

**Explanation:**
- `payload`: Contains specific data related to the portfolio event, including `portfolioId`, `name`, `description`, `assets` (an array of asset objects), and `status`.

#### Investor Event

**Example:**
```json
{
  "eventType": "InvestorCreated",
  "eventVersion": "1.0",
  "timestamp": "2024-08-05T15:50:00Z",
  "source": "investor-service",
  "payload": {
    "investorId": "investor-001",
    "name": "John Doe",
    "investmentAmount": 100000,
    "investmentDate": "2024-08-05T15:50:00Z",
    "status": "active"
  }
}
```

**Explanation:**
- `payload`: Contains specific data related to the investor event, including `investorId`, `name`, `investmentAmount`, `investmentDate`, and `status`.

#### User Event

**Example:**
```json
{
  "eventType": "UserCreated",
  "eventVersion": "1.0",
  "timestamp": "2024-08-05T16:00:00Z",
  "source": "user-service",
  "payload": {
    "userId": "user-001",
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "roles": ["admin", "investor"],
    "status": "active"
  }
}
```

**Explanation:**
- `payload`: Contains specific data related to the user event, including `userId`, `name`, `email`, `roles` (an array of strings), and `status`.

#### Role Event

**Example:**
```json
{
  "eventType": "RoleCreated",
  "eventVersion": "1.0",
  "timestamp": "2024-08-05T16:10:00Z",
  "source": "role-service",
  "payload": {
    "roleId": "role-001",
    "name": "Admin",
    "permissions": ["create", "read", "update", "delete"],
    "status": "active"
  }
}
```

**Explanation:**
- `payload`: Contains specific data related to the role event, including `roleId`, `name`, `permissions` (an array of strings), and `status`.

#### Policy Event

**Example:**
```json
{
  "eventType": "PolicyCreated",
  "eventVersion": "1.0",
  "timestamp": "2024-08-05T16:20:00Z",
  "source": "policy-service",
  "payload": {
    "policyId": "policy-001",
    "name": "AdminPolicy",
    "rules": [
      {
        "ruleId": "rule-001",
        "effect": "allow",
        "action": "create",
        "resource": "resource-001"
      },
      {
        "ruleId": "rule-002",
        "effect": "deny",
        "action": "delete",
        "resource": "resource-002"
      }
    ],
    "status": "active"
  }
}
```

**Explanation:**
- `payload`: Contains specific data related to the policy event, including `policyId`, `name`, `rules` (an array of rule objects), and `status`.

### Negative (Invalid) Scenarios

Here

 are invalid examples for each event type and explanations of why they are invalid:

#### Invalid Listing Event (Missing Required Field)

**Example:**
```json
{
  "eventType": "ListingCreated",
  "eventVersion": "1.0",
  "timestamp": "2024-08-05T14:48:00Z",
  "source": "listing-service",
  "payload": {
    "name": "Farm Equipment",
    "description": "High quality farm equipment.",
    "category": "Machinery",
    "price": 1000,
    "status": "active"
  }
}
```

**Explanation:**
- Missing `listingId`, which is a required field in the payload.

#### Invalid Farm Event (Invalid Data Type)

**Example:**
```json
{
  "eventType": "FarmCreated",
  "eventVersion": "1.0",
  "timestamp": "2024-08-05T15:00:00Z",
  "source": "farm-service",
  "payload": {
    "farmId": "farm-001",
    "location": {
      "latitude": "34.05", // Should be a number
      "longitude": -118.25
    },
    "size": 150,
    "crops": ["corn", "wheat"],
    "status": "operational"
  }
}
```

**Explanation:**
- `latitude` is a string but should be a number.

#### Invalid Offering Event (Extra Undefined Property)

**Example:**
```json
{
  "eventType": "OfferingCreated",
  "eventVersion": "1.0",
  "timestamp": "2024-08-05T15:10:00Z",
  "source": "offering-service",
  "payload": {
    "offeringId": "offering-001",
    "name": "Investment Opportunity",
    "description": "A great investment opportunity.",
    "price": 5000,
    "status": "open",
    "extraProperty": "not allowed" // Extra undefined property
  }
}
```

**Explanation:**
- Contains `extraProperty`, which is not defined in the schema.

#### Invalid Campaign Event (Invalid Enum Value)

**Example:**
```json
{
  "eventType": "CampaignCreated",
  "eventVersion": "1.0",
  "timestamp": "2024-08-05T15:20:00Z",
  "source": "campaign-service",
  "payload": {
    "campaignId": "campaign-001",
    "title": "Marketing Campaign",
    "budget": 20000,
    "duration": "30 days",
    "status": "paused" // Invalid enum value, should be "active" or "inactive"
  }
}
```

**Explanation:**
- `status` has an invalid value (`paused`), which is not allowed by the schema.

#### Invalid Data Room Event (Invalid URL Format)

**Example:**
```json
{
  "eventType": "DataRoomCreated",
  "eventVersion": "1.0",
  "timestamp": "2024-08-05T15:30:00Z",
  "source": "dataroom-service",
  "payload": {
    "dataRoomId": "dataroom-001",
    "name": "Project Documents",
    "description": "Documents related to the project.",
    "documents": [
      {
        "documentId": "doc-001",
        "title": "Business Plan",
        "url": "invalid-url" // Invalid URL format
      }
    ],
    "status": "open"
  }
}
```

**Explanation:**
- `url` is not a valid URI format.

#### Invalid Portfolio Event (Missing Nested Required Field)

**Example:**
```json
{
  "eventType": "PortfolioCreated",
  "eventVersion": "1.0",
  "timestamp": "2024-08-05T15:40:00Z",
  "source": "portfolio-service",
  "payload": {
    "portfolioId": "portfolio-001",
    "name": "Investor Portfolio",
    "description": "A portfolio of investments.",
    "assets": [
      {
        "assetId": "asset-001",
        // Missing name
        "value": 10000
      }
    ],
    "status": "active"
  }
}
```

**Explanation:**
- Missing `name` in the assets array, which is a required field.

#### Invalid Investor Event (Invalid Date Format)

**Example:**
```json
{
  "eventType": "InvestorCreated",
  "eventVersion": "1.0",
  "timestamp": "2024-08-05T15:50:00Z",
  "source": "investor-service",
  "payload": {
    "investorId": "investor-001",
    "name": "John Doe",
    "investmentAmount": 100000,
    "investmentDate": "08-05-2024T15:50:00Z", // Invalid date format
    "status": "active"
  }
}
```

**Explanation:**
- `investmentDate` is not in the correct ISO 8601 format.

#### Invalid User Event (Invalid Email Format)

**Example:**
```json
{
  "eventType": "UserCreated",
  "eventVersion": "1.0",
  "timestamp": "2024-08-05T16:00:00Z",
  "source": "user-service",
  "payload": {
    "userId": "user-001",
    "name": "Jane Smith",
    "email": "invalid-email", // Invalid email format
    "roles": ["admin", "investor"],
    "status": "active"
  }
}
```

**Explanation:**
- `email` is not in a valid email format.

#### Invalid Role Event (Missing Required Field)

**Example:**
```json
{
  "eventType": "RoleCreated",
  "eventVersion": "1.0",
  "timestamp": "2024-08-05T16:10:00Z",
  "source": "role-service",
  "payload": {
    "roleId": "role-001",
    "name": "Admin",
    // Missing permissions
    "status": "active"
  }
}
```

**Explanation:**
- Missing `permissions`, which is a required field in the payload.

#### Invalid Policy Event (Invalid Enum Value)

**Example:**
```json
{
  "eventType": "PolicyCreated",
  "eventVersion": "1.0",
  "timestamp": "2024-08-05T16:20:00Z",
  "source": "policy-service",
  "payload": {
    "policyId": "policy-001",
    "name": "AdminPolicy",
    "rules": [
      {
        "ruleId": "rule-001",
        "effect": "block", // Invalid enum value, should be "allow" or "deny"
        "action": "create",
        "resource": "resource-001"
      }
    ],
    "status": "active"
  }
}
```

**Explanation:**
- `effect` has an invalid value (`block`), which is not allowed by the schema.

### Conclusion

This guide provides detailed explanations and examples for validating various event types in the Agsiri platform. By following these guidelines and using the provided schema, you can ensure that your events conform to the required structure and data integrity is maintained across the platform.
