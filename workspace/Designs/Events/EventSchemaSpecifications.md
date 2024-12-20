Let's delve deeper into the provided design notes and identify all the events across various flows. Here are more detailed events for the Agsiri platform based on the detailed design note:

# Identified Events in the System

## Listing Events
- `ListingCreated`
- `ListingUpdated`
- `ListingDeleted`
- `ListingAgentAssigned`
- `ListingDocumentUploaded`

## Farm Events
- `FarmCreated`
- `FarmUpdated`
- `FarmDeleted`
- `FarmDueDiligenceStarted`
- `FarmDueDiligenceCompleted`
- `FarmDocumentUploaded`
- `FarmSoilInformationUpdated`
- `FarmFinancialInformationUpdated`
- `FarmCropInformationUpdated`
- `FarmOtherInformationUpdated`

## Offering Events
- `OfferingCreated`
- `OfferingUpdated`
- `OfferingDeleted`
- `OfferingSubscriptionStarted`
- `OfferingSubscriptionEnded`
- `OfferingSharesAllocated`
- `OfferingDocumentUploaded`

## Campaign Events
- `CampaignCreated`
- `CampaignUpdated`
- `CampaignDeleted`
- `CampaignStarted`
- `CampaignEnded`
- `CampaignDocumentUploaded`
- `CampaignWebinarScheduled`
- `CampaignNewsletterPublished`

## Data Room Events
- `DataRoomCreated`
- `DataRoomUpdated`
- `DataRoomDeleted`
- `DataRoomDocumentAdded`
- `DataRoomDocumentRemoved`
- `DataRoomAccessGranted`
- `DataRoomAccessRevoked`

## Portfolio Events
- `PortfolioCreated`
- `PortfolioUpdated`
- `PortfolioDeleted`
- `PortfolioInvestmentAdded`
- `PortfolioInvestmentRemoved`
- `PortfolioDocumentUploaded`

## Investor Events
- `InvestorCreated`
- `InvestorUpdated`
- `InvestorDeleted`
- `InvestorOnboardingStarted`
- `InvestorOnboardingCompleted`
- `InvestorDocumentUploaded`

## User Events
- `UserCreated`
- `UserUpdated`
- `UserDeleted`
- `UserRoleAssigned`
- `UserRoleRevoked`

## Role Events
- `RoleCreated`
- `RoleUpdated`
- `RoleDeleted`

## Policy Events
- `PolicyCreated`
- `PolicyUpdated`
- `PolicyDeleted`

## Agsiri Event Schema with Detailed Definitions

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "AgsiriEvent",
  "type": "object",
  "properties": {
    "eventType": {
      "type": "string",
      "description": "Type of the event, e.g., ListingCreated, FarmCreated, etc."
    },
    "eventVersion": {
      "type": "string",
      "description": "Version of the event schema"
    },
    "timestamp": {
      "type": "string",
      "format": "date-time",
      "description": "The time when the event occurred"
    },
    "source": {
      "type": "string",
      "description": "Source of the event, e.g., the service name"
    },
    "payload": {
      "type": "object",
      "oneOf": [
        { "$ref": "#/definitions/listingEventPayload" },
        { "$ref": "#/definitions/farmEventPayload" },
        { "$ref": "#/definitions/offeringEventPayload" },
        { "$ref": "#/definitions/campaignEventPayload" },
        { "$ref": "#/definitions/dataRoomEventPayload" },
        { "$ref": "#/definitions/portfolioEventPayload" },
        { "$ref": "#/definitions/investorEventPayload" },
        { "$ref": "#/definitions/userEventPayload" },
        { "$ref": "#/definitions/roleEventPayload" },
        { "$ref": "#/definitions/policyEventPayload" }
      ],
      "description": "Event payload containing specific event data"
    }
  },
  "required": ["eventType", "eventVersion", "timestamp", "source", "payload"],
  "definitions": {
    "listingEventPayload": {
      "type": "object",
      "properties": {
        "listingId": { "type": "string" },
        "name": { "type": "string" },
        "description": { "type": "string" },
        "category": { "type": "string" },
        "price": { "type": "number" },
        "status": { "type": "string" }
      },
      "required": ["listingId", "name", "description", "category", "price", "status"]
    },
    "farmEventPayload": {
      "type": "object",
      "properties": {
        "farmId": { "type": "string" },
        "location": {
          "type": "object",
          "properties": {
            "latitude": { "type": "number" },
            "longitude": { "type": "number" }
          },
          "required": ["latitude", "longitude"]
        },
        "size": { "type": "number" },
        "crops": { "type": "array", "items": { "type": "string" } },
        "status": { "type": "string" }
      },
      "required": ["farmId", "location", "size", "crops", "status"]
    },
    "offeringEventPayload": {
      "type": "object",
      "properties": {
        "offeringId": { "type": "string" },
        "name": { "type": "string" },
        "description": { "type": "string" },
        "price": { "type": "number" },
        "status": { "type": "string" }
      },
      "required": ["offeringId", "name", "description", "price", "status"]
    },
    "campaignEventPayload": {
      "type": "object",
      "properties": {
        "campaignId": { "type": "string" },
        "title": { "type": "string" },
        "budget": { "type": "number" },
        "duration": { "type": "string" },
        "status": { "type": "string" }
      },
      "required": ["campaignId", "title", "budget", "duration", "status"]
    },
    "dataRoomEventPayload": {
      "type": "object",
      "properties": {
        "dataRoomId": { "type": "string" },
        "name": { "type": "string" },
        "description": { "type": "string" },
        "documents": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "documentId": { "type": "string" },
              "title": { "type": "string" },
              "url": { "type": "string", "format": "uri" }
            },
            "required": ["documentId", "title", "url"]
          }
        },
        "status": { "type": "string" }
      },
      "required": ["dataRoomId", "name", "description", "documents", "status"]
    },
    "portfolioEventPayload": {
      "type": "object",
      "properties": {
        "portfolioId": { "type": "string" },
        "userId": { "type": "string" },
        "investments": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "offeringId": { "type": "string" },
              "numberOfShares": { "type": "number" },
              "sharePrice": { "type": "number" },
              "investmentDate": { "type": "string", "format": "date-time" },
              "status": { "type": "string", "enum": ["active", "closed"] }
            },
            "required": ["offeringId", "numberOfShares", "sharePrice", "investmentDate", "status"]
          }
        }
      },
      "required": ["portfolioId", "userId", "investments"]
    },
    "investorEventPayload": {
      "type": "object",
      "properties": {
        "investorId": { "type": "string" },
        "name": { "type": "string" },
        "investmentAmount": { "type": "number" },
        "investmentDate": { "type": "string", "format": "date-time" },
        "status": { "type": "string" }
      },
      "required": ["investorId", "name", "investmentAmount", "investmentDate", "status"]
    },
    "userEventPayload": {
      "type": "object",
      "properties": {
        "userId": { "type": "string" },
        "name": { "type": "string" },
        "email": { "type": "string", "format": "email" },
        "roles": { "type": "array", "items": { "type": "string" } },
        "status": { "type": "string" }
      },
      "required": ["userId", "name", "email", "roles", "status"]
    },
    "roleEventPayload": {
      "type": "object",
      "properties": {
        "roleId": { "type": "string" },
        "name": { "type": "string" },
        "permissions": { "type": "array", "items": { "type": "string" } },
        "status": { "type": "string" }
      },
      "required": ["roleId", "name", "permissions", "status"]
    },
    "policyEventPayload":

 {
      "type": "object",
      "properties": {
        "policyId": { "type": "string" },
        "name": { "type": "string" },
        "rules": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "ruleId": { "type": "string" },
              "effect": { "type": "string", "enum": ["allow", "deny"] },
              "action": { "type": "string" },
              "resource": { "type": "string" }
            },
            "required": ["ruleId", "effect", "action", "resource"]
          }
        },
        "status": { "type": "string" }
      },
      "required": ["policyId", "name", "rules", "status"]
    }
  }
}
```

This detailed schema covers a wide range of events across the different entities in the Agsiri platform, reflecting the processes described in the design note. Each event type includes a specific payload structure that ensures consistency and comprehensive data capture for each event.
