// src/eventSchemas.ts
export const listingEventSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "ListingEvent",
  type: "object",
  properties: {
    listingId: { type: "string" },
    name: { type: "string" },
    description: { type: "string" },
    category: { type: "string" },
    price: { type: "number" },
    status: { type: "string" }
  },
  required: ["listingId", "name", "description", "category", "price", "status"]
};

export const farmEventSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "FarmEvent",
  type: "object",
  properties: {
    farmId: { type: "string" },
    location: {
      type: "object",
      properties: {
        latitude: { type: "number" },
        longitude: { type: "number" }
      },
      required: ["latitude", "longitude"]
    },
    size: { type: "number" },
    crops: { type: "array", items: { type: "string" } },
    status: { type: "string" }
  },
  required: ["farmId", "location", "size", "crops", "status"]
};

export const offeringEventSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "OfferingEvent",
  type: "object",
  properties: {
    offeringId: { type: "string" },
    name: { type: "string" },
    description: { type: "string" },
    price: { type: "number" },
    status: { type: "string" }
  },
  required: ["offeringId", "name", "description", "price", "status"]
};

export const campaignEventSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "CampaignEvent",
  type: "object",
  properties: {
    campaignId: { type: "string" },
    title: { type: "string" },
    budget: { type: "number" },
    duration: { type: "string" },
    status: { type: "string" }
  },
  required: ["campaignId", "title", "budget", "duration", "status"]
};

export const dataRoomEventSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "DataRoomEvent",
  type: "object",
  properties: {
    dataRoomId: { type: "string" },
    name: { type: "string" },
    description: { type: "string" },
    documents: {
      type: "array",
      items: {
        type: "object",
        properties: {
          documentId: { type: "string" },
          title: { type: "string" },
          url: { type: "string", format: "uri" }
        },
        required: ["documentId", "title", "url"]
      }
    },
    status: { type: "string" }
  },
  required: ["dataRoomId", "name", "description", "documents", "status"]
};

export const portfolioEventSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "PortfolioEvent",
  type: "object",
  properties: {
    portfolioId: { type: "string" },
    userId: { type: "string" },
    investments: {
      type: "array",
      items: {
        type: "object",
        properties: {
          offeringId: { type: "string" },
          numberOfShares: { type: "number" },
          sharePrice: { type: "number" },
          investmentDate: { type: "string", format: "date-time" },
          status: { type: "string", enum: ["active", "closed"] }
        },
        required: ["offeringId", "numberOfShares", "sharePrice", "investmentDate", "status"]
      }
    }
  },
  required: ["portfolioId", "userId", "investments"]
};

export const investorEventSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "InvestorEvent",
  type: "object",
  properties: {
    investorId: { type: "string" },
    name: { type: "string" },
    investmentAmount: { type: "number" },
    investmentDate: { type: "string", format: "date-time" },
    status: { type: "string" }
  },
  required: ["investorId", "name", "investmentAmount", "investmentDate", "status"]
};

export const userEventSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "UserEvent",
  type: "object",
  properties: {
    userId: { type: "string" },
    name: { type: "string" },
    email: { type: "string", format: "email" },
    roles: { type: "array", items: { type: "string" } },
    status: { type: "string" }
  },
  required: ["userId", "name", "email", "roles", "status"]
};

export const roleEventSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "RoleEvent",
  type: "object",
  properties: {
    roleId: { type: "string" },
    name: { type: "string" },
    permissions: { type: "array", items: { type: "string" } },
    status: { type: "string" }
  },
  required: ["roleId", "name", "permissions", "status"]
};

export const policyEventSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "PolicyEvent",
  type: "object",
  properties: {
    policyId: { type: "string" },
    name: { type: "string" },
    rules: {
      type: "array",
      items: {
        type: "object",
        properties: {
          ruleId: { type: "string" },
          effect: { type: "string", enum: ["allow", "deny"] },
          action: { type: "string" },
          resource: { type: "string" }
        },
        required: ["ruleId", "effect", "action", "resource"]
      }
    },
    status: { type: "string" }
  },
  required: ["policyId", "name", "rules", "status"]
};

