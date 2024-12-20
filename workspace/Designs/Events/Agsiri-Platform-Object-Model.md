
### 1. Listing Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Listing",
  "type": "object",
  "properties": {
    "listing_id": { "type": "string" },
    "name": { "type": "string" },
    "address": {
      "type": "object",
      "properties": {
        "house_number": { "type": "string" },
        "street": { "type": "string" },
        "apartment": { "type": "string" },
        "city": { "type": "string" },
        "state": { "type": "string" },
        "zip": { "type": "string" }
      },
      "required": ["house_number", "street", "city", "state", "zip"]
    },
    "property_description": { "type": "string" },
    "property_highlights": {
      "type": "object",
      "properties": {
        "total_acres": { "type": "number" },
        "tillable": { "type": "number" },
        "woodland": { "type": "number" },
        "wetland": { "type": "number" },
        "deed_restrictions": { "type": "string" },
        "barns": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "size": { "type": "string" },
              "description": { "type": "string" }
            },
            "required": ["size", "description"]
          }
        }
      },
      "required": ["total_acres", "tillable", "woodland", "wetland", "deed_restrictions"]
    },
    "days_on_market": { "type": "string" },
    "type": { "type": "string" },
    "built_on": { "type": "string", "format": "date" },
    "renovated_on": { "type": "array", "items": { "type": "string", "format": "date" } },
    "listing_agent": {
      "type": "object",
      "properties": {
        "name": { "type": "string" },
        "company": { "type": "string" },
        "phone_number": { "type": "string" },
        "email": { "type": "string", "format": "email" }
      },
      "required": ["name", "company", "phone_number", "email"]
    },
    "dataroom_id": { "type": "string" },
    "workflows": { "type": "object" },
    "images": { "type": "array", "items": { "type": "string" } },
    "videos": { "type": "array", "items": { "type": "string" } },
    "maps": { "type": "array", "items": { "type": "string" } },
    "property_details": {
      "type": "object",
      "properties": {
        "parking": {
          "type": "object",
          "properties": {
            "number_of_spaces": { "type": "number" },
            "type": { "type": "string" }
          }
        },
        "interior": {
          "type": "object",
          "properties": {
            "bathrooms": {
              "type": "object",
              "properties": {
                "number_full": { "type": "number" },
                "number_total": { "type": "number" },
                "bathroom1_level": { "type": "string" },
                "bathroom2_level": { "type": "string" }
              }
            },
            "rooms": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "type": { "type": "string" },
                  "level": { "type": "string" }
                },
                "required": ["type", "level"]
              }
            },
            "basement": { "type": "object" },
            "laundry": { "type": "object" },
            "fireplace": { "type": "object" },
            "interior_features": { "type": "object" }
          }
        },
        "exterior": {
          "type": "object",
          "properties": {
            "features": { "type": "object" },
            "property_information": { "type": "object" },
            "lot_information": { "type": "object" }
          }
        },
        "financial": { "type": "object" },
        "utilities": {
          "type": "object",
          "properties": {
            "heating_and_cooling": { "type": "object" },
            "utility": { "type": "object" }
          }
        },
        "location": {
          "type": "object",
          "properties": {
            "school_information": { "type": "object" },
            "location_information": { "type": "object" }
          }
        },
        "other": {
          "type": "object",
          "properties": {
            "listing_information": { "type": "object" }
          }
        }
      }
    },
    "sales_and_tax": {
      "type": "object",
      "properties": {
        "sales_history": { "type": "object" },
        "tax_history": { "type": "object" }
      }
    },
    "public_facts": { "type": "object" },
    "schools": { "type": "object" }
  },
  "required": ["listing_id", "name", "address", "property_description", "property_highlights", "listing_agent"]
}
```

### 2. Farm Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Farm",
  "type": "object",
  "properties": {
    "farm_id": { "type": "string" },
    "listing_id": { "type": "string" },
    "name": { "type": "string" },
    "address": {
      "type": "object",
      "properties": {
        "house_number": { "type": "string" },
        "street": { "type": "string" },
        "apartment": { "type": "string" },
        "city": { "type": "string" },
        "state": { "type": "string" },
        "zip": { "type": "string" }
      },
      "required": ["house_number", "street", "city", "state", "zip"]
    },
    "location": {
      "type": "object",
      "properties": {
        "longitude": { "type": "number" },
        "latitude": { "type": "number" }
      },
      "required": ["longitude", "latitude"]
    },
    "property_description": { "type": "string" },
    "dataroom_id": { "type": "string" },
    "workflows": { "type": "object" },
    "images": { "type": "array", "items": { "type": "string" } },
    "videos": { "type": "array", "items": { "type": "string" } },
    "maps": { "type": "array", "items": { "type": "string" } },
    "parcel_information": { "type": "array", "items": { "type": "object" } },
    "due_diligence": {
      "type": "object",
      "properties": {
        "soil_information": {
          "type": "object",
          "properties": {
            "documents": { "type": "array", "items": { "type": "string" } },
            "maps": { "type": "array", "items": { "type": "string" } }
          }
        },
        "financial_information": {
          "type": "object",
          "properties": {
            "cash_flow": { "type": "object" },
            "sales_data": { "type": "object" },
            "expenses_data": { "type": "object" },
            "documents": { "type": "array", "items": { "type": "string" } }
          }
        },
        "crop_information": { "type": "object" },
        "other": { "type": "object" }
      }
    }
  },
  "required": ["farm_id", "listing_id", "name", "address", "location", "property_description", "dataroom_id"]
}
```

### 3. Offering Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Offering",
  "type": "object",
  "properties": {
    "offering_id": { "type": "string" },
    "farm_id": { "type": "string" },
    "name": { "type": "string" },
    "address": {
      "type": "object",
      "properties": {
        "house_number": { "type": "string" },
        "street": { "type": "string" },
       

 "apartment": { "type": "string" },
        "city": { "type": "string" },
        "state": { "type": "string" },
        "zip": { "type": "string" }
      },
      "required": ["house_number", "street", "city", "state", "zip"]
    },
    "property_description": { "type": "string" },
    "main_picture": { "type": "string" },
    "dataroom_id": { "type": "string" },
    "workflows": { "type": "object" },
    "images": { "type": "array", "items": { "type": "string" } },
    "videos": { "type": "array", "items": { "type": "string" } },
    "maps": { "type": "array", "items": { "type": "string" } },
    "parcel_information": { "type": "array", "items": { "type": "object" } },
    "value_driver": { "type": "object" },
    "expected_returns": {
      "type": "object",
      "properties": {
        "target_net_irr": { "type": "number" },
        "target_net_yield": { "type": "number" },
        "net_equity_multiple": { "type": "number" },
        "target_hold": { "type": "string" },
        "target_net_returns": { "type": "number" }
      },
      "required": ["target_net_irr", "target_net_yield", "net_equity_multiple", "target_hold", "target_net_returns"]
    },
    "details": {
      "type": "object",
      "properties": {
        "valid_from_date": { "type": "string", "format": "date" },
        "valid_to_date": { "type": "string", "format": "date" },
        "total_shares": { "type": "number" },
        "shares_remaining": { "type": "number" },
        "holding_period": { "type": "string" },
        "minimum_holding_shares": { "type": "number" },
        "maximum_holding_shares": { "type": "number" },
        "subscription_start_date": { "type": "string", "format": "date" },
        "subscription_end_date": { "type": "string", "format": "date" }
      },
      "required": ["valid_from_date", "valid_to_date", "total_shares", "shares_remaining", "holding_period", "minimum_holding_shares", "maximum_holding_shares", "subscription_start_date", "subscription_end_date"]
    },
    "documents": {
      "type": "object",
      "properties": {
        "investor_memo": { "type": "string" },
        "investor_documents": { "type": "array", "items": { "type": "string" } },
        "compliance_audits": { "type": "array", "items": { "type": "string" } }
      }
    }
  },
  "required": ["offering_id", "farm_id", "name", "address", "property_description", "main_picture", "dataroom_id", "expected_returns", "details"]
}
```

### 4. Subscription Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Subscription",
  "type": "object",
  "properties": {
    "offering_id": { "type": "string" },
    "subscriptions": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "user_id": { "type": "string" },
          "shares_subscribed": { "type": "number" },
          "date_subscribed": { "type": "string", "format": "date-time" },
          "status": { "type": "string", "enum": ["ACTIVE", "CLOSED"] }
        },
        "required": ["user_id", "shares_subscribed", "date_subscribed", "status"]
      }
    },
    "allocations": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "user_id": { "type": "string" },
          "shares_allocated": { "type": "number" },
          "date_allocated": { "type": "string", "format": "date-time" },
          "documents": { "type": "array", "items": { "type": "string" } }
        },
        "required": ["user_id", "shares_allocated", "date_allocated"]
      }
    },
    "dataroom_id": { "type": "string" },
    "workflows": { "type": "object" }
  },
  "required": ["offering_id", "subscriptions", "allocations", "dataroom_id"]
}
```

### 5. Campaign Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Campaign",
  "type": "object",
  "properties": {
    "campaign_id": { "type": "string" },
    "offering_id": { "type": "string" },
    "name": { "type": "string" },
    "address": {
      "type": "object",
      "properties": {
        "house_number": { "type": "string" },
        "street": { "type": "string" },
        "apartment": { "type": "string" },
        "city": { "type": "string" },
        "state": { "type": "string" },
        "zip": { "type": "string" }
      },
      "required": ["house_number", "street", "city", "state", "zip"]
    },
    "property_description": { "type": "string" },
    "dataroom_id": { "type": "string" },
    "workflows": { "type": "object" },
    "main_picture": { "type": "string" },
    "images": { "type": "array", "items": { "type": "string" } },
    "videos": { "type": "array", "items": { "type": "string" } },
    "maps": { "type": "array", "items": { "type": "string" } },
    "expected_returns": {
      "type": "object",
      "properties": {
        "target_net_irr": { "type": "number" },
        "target_net_yield": { "type": "number" },
        "net_equity_multiple": { "type": "number" },
        "target_hold": { "type": "string" },
        "target_net_returns": { "type": "number" }
      },
      "required": ["target_net_irr", "target_net_yield", "net_equity_multiple", "target_hold", "target_net_returns"]
    },
    "offering_details": {
      "type": "object",
      "properties": {
        "valid_from_date": { "type": "string", "format": "date" },
        "valid_to_date": { "type": "string", "format": "date" },
        "total_shares": { "type": "number" },
        "shares_remaining": { "type": "number" },
        "holding_period": { "type": "string" },
        "minimum_holding_shares": { "type": "number" },
        "maximum_holding_shares": { "type": "number" },
        "subscription_start_date": { "type": "string", "format": "date" },
        "subscription_end_date": { "type": "string", "format": "date" }
      },
      "required": ["valid_from_date", "valid_to_date", "total_shares", "shares_remaining", "holding_period", "minimum_holding_shares", "maximum_holding_shares", "subscription_start_date", "subscription_end_date"]
    },
    "webinars": { "type": "array", "items": { "type": "string" } },
    "newsletters": { "type": "array", "items": { "type": "string" } }
  },
  "required": ["campaign_id", "offering_id", "name", "address", "property_description", "dataroom_id", "main_picture", "expected_returns", "offering_details"]
}
```

### 6. Notification Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Notification",
  "type": "object",
  "properties": {
    "notification_id": { "type": "string" },
    "user_id": { "type": "string" },
    "type": { "type": "string" },
    "message": { "type": "string" },
    "date": { "type": "string", "format": "date-time" },
    "status": { "type": "string", "enum": ["unread", "read"] }
  },
  "required": ["notification_id", "user_id", "type", "message", "date", "status"]
}
```

### 7. Document Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "

title": "Document",
  "type": "object",
  "properties": {
    "document_id": { "type": "string" },
    "name": { "type": "string" },
    "type": { "type": "string" },
    "status": { "type": "string" },
    "content": { "type": "string" },
    "creation_date": { "type": "string", "format": "date-time" },
    "modification_date": { "type": "string", "format": "date-time" }
  },
  "required": ["document_id", "name", "type", "status", "content", "creation_date", "modification_date"]
}
```

These schemas should cover the major entities and flows described in the provided document. Adjustments can be made to further refine and match any additional requirements.
### Offering Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Offering",
  "type": "object",
  "properties": {
    "offering_id": { "type": "string" },
    "farm_id": { "type": "string" },
    "name": { "type": "string" },
    "address": {
      "type": "object",
      "properties": {
        "house_number": { "type": "string" },
        "street": { "type": "string" },
        "apartment": { "type": "string" },
        "city": { "type": "string" },
        "state": { "type": "string" },
        "zip": { "type": "string" }
      },
      "required": ["house_number", "street", "city", "state", "zip"]
    },
    "property_description": { "type": "string" },
    "main_picture": { "type": "string" },
    "dataroom_id": { "type": "string" },
    "workflows": { "type": "object" },
    "images": { "type": "array", "items": { "type": "string" } },
    "videos": { "type": "array", "items": { "type": "string" } },
    "maps": { "type": "array", "items": { "type": "string" } },
    "parcel_information": { "type": "array", "items": { "type": "object" } },
    "value_driver": { "type": "object" },
    "expected_returns": {
      "type": "object",
      "properties": {
        "target_net_irr": { "type": "number" },
        "target_net_yield": { "type": "number" },
        "net_equity_multiple": { "type": "number" },
        "target_hold": { "type": "string" },
        "target_net_returns": { "type": "number" }
      },
      "required": ["target_net_irr", "target_net_yield", "net_equity_multiple", "target_hold", "target_net_returns"]
    },
    "details": {
      "type": "object",
      "properties": {
        "valid_from_date": { "type": "string", "format": "date" },
        "valid_to_date": { "type": "string", "format": "date" },
        "total_shares": { "type": "number" },
        "shares_remaining": { "type": "number" },
        "holding_period": { "type": "string" },
        "minimum_holding_shares": { "type": "number" },
        "maximum_holding_shares": { "type": "number" },
        "subscription_start_date": { "type": "string", "format": "date" },
        "subscription_end_date": { "type": "string", "format": "date" }
      },
      "required": ["valid_from_date", "valid_to_date", "total_shares", "shares_remaining", "holding_period", "minimum_holding_shares", "maximum_holding_shares", "subscription_start_date", "subscription_end_date"]
    },
    "documents": {
      "type": "object",
      "properties": {
        "investor_memo": { "type": "string" },
        "investor_documents": { "type": "array", "items": { "type": "string" } },
        "compliance_audits": { "type": "array", "items": { "type": "string" } }
      }
    }
  },
  "required": ["offering_id", "farm_id", "name", "address", "property_description", "main_picture", "dataroom_id", "expected_returns", "details"]
}
```

### Data Room Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "DataRoom",
  "type": "object",
  "properties": {
    "dataroom_id": { "type": "string" },
    "farm_id": { "type": "string" },
    "name": { "type": "string" },
    "description": { "type": "string" },
    "user_id": { "type": "string" },
    "creation_date": { "type": "string", "format": "date-time" },
    "key_info": { "type": "string" },
    "permissions": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "permission_id": { "type": "string" },
          "type": { "type": "string" },
          "roles": { "type": "array", "items": { "type": "string" } }
        },
        "required": ["permission_id", "type", "roles"]
      }
    },
    "cabinets": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "cabinet_id": { "type": "string" },
          "name": { "type": "string" },
          "description": { "type": "string" },
          "user_id": { "type": "string" },
          "creation_date": { "type": "string", "format": "date-time" },
          "type": { "type": "string", "enum": ["regular", "secure"] },
          "permissions": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "permission_id": { "type": "string" },
                "type": { "type": "string" },
                "roles": { "type": "array", "items": { "type": "string" } }
              },
              "required": ["permission_id", "type", "roles"]
            }
          },
          "files": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "file_id": { "type": "string" },
                "name": { "type": "string" },
                "description": { "type": "string" },
                "user_id": { "type": "string" },
                "creation_date": { "type": "string", "format": "date-time" },
                "type": { "type": "string" },
                "status": { "type": "string" },
                "permissions": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "permission_id": { "type": "string" },
                      "type": { "type": "string" },
                      "roles": { "type": "array", "items": { "type": "string" } }
                    },
                    "required": ["permission_id", "type", "roles"]
                  }
                }
              },
              "required": ["file_id", "name", "description", "user_id", "creation_date", "type", "status"]
            }
          }
        },
        "required": ["cabinet_id", "name", "description", "user_id", "creation_date", "type"]
      }
    }
  },
  "required": ["dataroom_id", "farm_id", "name", "description", "user_id", "creation_date", "permissions", "cabinets"]
}
```

### Detailed Comments for `agsiriEventSchema.json`

Below is the detailed `agsiriEventSchema.json` with comments explaining each section:

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
    "policyEventPayload": {
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

This `agsiriEventSchema.json` schema includes definitions for various event payloads and ensures that events conform to the structure expected for each type of event. The comments provide explanations for each section and property, clarifying the purpose and usage within the Agsiri platform.
