# Business Requirements Document for Listing Service

## 1. Detailed Narrative of the Service

The Listing Service is a crucial component of the Agsiri platform, responsible for managing all farm and property listings. This service integrates with external listing sources and other external data sources to gather detailed information about farms and properties. It processes and enhances this data to ensure that all relevant details are accurately captured and stored in the Agsiri platform's database. The primary goal of the Listing Service is to provide a comprehensive and accurate repository of farm listings, enabling other services and users to access and utilize this information effectively.

The Listing Service supports two primary routes for sourcing properties:

- **Route 1: Property Scouting Service (PSS)**
  - An AI-powered system takes the investment thesis, location, and target property specification as input.
  - The AI scrapes different property listing services and MLS data sources to select an initial list of properties.
  - Once a property is identified, PSS creates a listing record with status `SOURCED` and `listing_source` attribute set to `SYSTEM`.

- **Route 2: Realtor-Driven Listings**
  - Realtors, who are partners with Agsiri, bring potential properties to the platform.
  - Realtors use the platform to provide leads to property listings.
  - A new listing record is created in the system with status `SOURCED` and `listing_source` attribute set to `REALTOR`.

Once a listing is created with status `SOURCED`, the system will trigger a workflow to provide a detailed screening of the property using a set of algorithms and rules. The status transitions are as follows:

1. **SOURCED**: Initial state when the property is sourced from either PSS or Realtors.
2. **SCREENED**: Status after the property has been initially screened by the system.
3. **IN REVIEW**: Status during the detailed analyst review phase.
4. **REVIEWED**: Status after the initial review is completed.
5. **IN DUE DILIGENCE**: Status during the full due diligence process.
6. **SELECTED**: Status if the property passes due diligence.
7. **REJECTED**: Status if the property fails due diligence.

Once the property is in `SELECTED` state, a workflow is triggered to create a Farm based on the listing information. This is managed by the Farm Onboarding Flow.

## 2. User Stories, Scenarios, Stakeholders, and Their Interactions

### User Stories and Scenarios

**Route 1: AI-Driven Listings (Property Scouting Service)**

**User Story 1: AI Scouts Property**
- As the platform, I want the AI to scout properties that match the Investment Thesis to ensure alignment with our investment strategy.
  - **Scenario:** The AI assesses properties and creates a listing record with status `SOURCED` and `listing_source` set to `SYSTEM`.

**User Story 2: System Screens Property**
- As the platform, I want to screen sourced properties to ensure they meet initial criteria before analyst review.
  - **Scenario:** The system screens the property, updating the status to `SCREENED`.

**Route 2: Realtor-Driven Listings**

**User Story 3: Realtor Submits Property**
- As a Realtor, I want to submit properties for listing to provide more opportunities for investors.
  - **Scenario:** The Realtor submits property details, and the platform creates a listing record with status `SOURCED` and `listing_source` set to `REALTOR`.

**Common Scenarios**

**User Story 4: Analyst Reviews Property**
- As an Analyst, I want to review properties that have been sourced and screened to assess their suitability.
  - **Scenario:** The Analyst reviews the property, and upon completion, the status is updated to `REVIEWED`.

**User Story 5: Conduct Due Diligence**
- As an Analyst, I want to conduct due diligence on properties to collect all necessary documentation and assessments.
  - **Scenario:** The Analyst performs due diligence, and the status is updated to either `SELECTED` or `REJECTED`.

**User Story 6: Create Farm from Selected Property**
- As the platform, I want to create a farm record from the listing information once the property is selected.
  - **Scenario:** The system triggers the Farm Onboarding Flow to create a farm based on the listing information.

### Stakeholders and Their Interactions

1. **Administrators**
   - Oversee platform operations and ensure the integrity of the listing data.
   - Approve critical actions and maintain the listing service.

2. **Analysts**
   - Conduct due diligence on properties sourced by the AI or submitted by Realtors.
   - Approve properties for listing on the platform.

3. **Realtors**
   - Submit properties to the platform for potential listing.
   - Provide necessary documentation and details about the properties.

4. **Platform AI (Property Scouting Service)**
   - Scout properties that match the Investment Thesis.
   - Assess properties against predefined criteria and create listings with status `SOURCED`.

5. **Users (Investors, Buyers, Sellers)**
   - View all listings and specific details of individual listings.
   - Utilize the information to make informed decisions about investments and purchases.

## 3. Life Cycle and Various States, Events, and State Transitions

### Life Cycle of a Listing

1. **SOURCED**
   - Initial state when a property is sourced from either PSS or Realtors.
   - Actions: Trigger screening workflow.

2. **SCREENED**
   - Status after the property has been initially screened by the system.
   - Actions: Trigger analyst review workflow.

3. **IN REVIEW**
   - Status during the detailed analyst review phase.
   - Actions: Complete analyst review, update details, delete.

4. **REVIEWED**
   - Status after the initial review is completed.
   - Actions: Trigger due diligence workflow.

5. **IN DUE DILIGENCE**
   - Status during the full due diligence process.
   - Actions: Complete due diligence, update details, delete.

6. **SELECTED**
   - Status if the property passes due diligence.
   - Actions: Trigger Farm Onboarding Flow.

7. **REJECTED**
   - Status if the property fails due diligence.
   - Actions: Archive listing, update details, delete.

8. **ARCHIVED**
   - The listing is no longer active but kept for historical purposes.
   - Actions: View archived listing, delete archived listing.

### State Transitions

- **SOURCED to SCREENED**
  - Event: System completes initial screening.
  - Transition: `completeScreening()`

- **SCREENED to IN REVIEW**
  - Event: System triggers analyst review workflow.
  - Transition: `startReview()`

- **IN REVIEW to REVIEWED**
  - Event: Analyst completes the initial review.
  - Transition: `completeReview()`

- **REVIEWED to IN DUE DILIGENCE**
  - Event: System triggers due diligence workflow.
  - Transition: `startDueDiligence()`

- **IN DUE DILIGENCE to SELECTED**
  - Event: Analyst completes due diligence successfully.
  - Transition: `completeDueDiligence()`

- **IN DUE DILIGENCE to REJECTED**
  - Event: Analyst finds the property unsuitable during due diligence.
  - Transition: `rejectProperty()`

- **SELECTED to FARM CREATED**
  - Event: System triggers Farm Onboarding Flow.
  - Transition: `createFarm()`

## 4. Listing Schema Explained in Detail

The Listing Schema defines the structure of a listing document in the Agsiri platform. Below is the detailed explanation of the schema components:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Listing",
  "type": "object",
  "properties": {
    "listing_id": {
      "type": "string",
      "description": "Unique identifier for the listing"
    },
    "name": {
      "type": "string",
      "description": "Name of the listing"
    },
    "address": {
      "type": "object",
      "properties": {
        "house_number": { "type": "string", "description": "House number" },
        "street": { "type": "string", "description": "Street name" },
        "apartment": { "type": "string", "description": "Apartment number, if applicable" },
        "city": { "type": "string", "description": "City" },
        "state": { "type": "string", "description": "State" },
        "zip": { "type": "string", "description": "Zip code" }
      },
      "required": ["house_number", "street", "city", "state", "zip"]
    },
    "property_description": {
      "type": "string",
      "description": "Detailed description of the property"
    },
    "property_highlights": {
      "type": "object",
      "properties": {
        "total_acres": { "type": "number", "description": "Total acres of the property" },
        "tillable": { "type": "number", "description": "Tillable acres" },
        "woodland": { "type": "number", "description": "Woodland acres" },
        "wetland": { "type": "number", "description": "Wetland acres" },
        "deed_restrictions": { "type": "string", "description": "Deed restrictions, if any" },
        "barns": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "size": { "type":

 "string", "description": "Size of the barn" },
              "description": { "type": "string", "description": "Description of the barn" }
            },
            "required": ["size", "description"]
          },
          "description": "List of barns on the property"
        }
      },
      "required": ["total_acres", "tillable", "woodland", "wetland", "deed_restrictions"]
    },
    "days_on_market": {
      "type": "string",
      "description": "Number of days the listing has been on the market"
    },
    "type": {
      "type": "string",
      "description": "Type of the property"
    },
    "built_on": {
      "type": "string",
      "format": "date",
      "description": "Date when the property was built"
    },
    "renovated_on": {
      "type": "array",
      "items": {
        "type": "string",
        "format": "date",
        "description": "Dates when the property was renovated"
      },
      "description": "List of renovation dates"
    },
    "listing_agent": {
      "type": "object",
      "properties": {
        "name": { "type": "string", "description": "Name of the listing agent" },
        "company": { "type": "string", "description": "Company of the listing agent" },
        "phone_number": { "type": "string", "description": "Phone number of the listing agent" },
        "email": { "type": "string", "format": "email", "description": "Email of the listing agent" }
      },
      "required": ["name", "company", "phone_number", "email"]
    },
    "dataroom_id": {
      "type": "string",
      "description": "Identifier for the associated data room"
    },
    "workflows": {
      "type": "object",
      "description": "Workflow-related information"
    },
    "images": {
      "type": "array",
      "items": { "type": "string", "description": "URL of the image" },
      "description": "List of image URLs"
    },
    "videos": {
      "type": "array",
      "items": { "type": "string", "description": "URL of the video" },
      "description": "List of video URLs"
    },
    "maps": {
      "type": "array",
      "items": { "type": "string", "description": "URL of the map" },
      "description": "List of map URLs"
    },
    "property_details": {
      "type": "object",
      "properties": {
        "parking": {
          "type": "object",
          "properties": {
            "number_of_spaces": { "type": "number", "description": "Number of parking spaces" },
            "type": { "type": "string", "description": "Type of parking" }
          },
          "description": "Parking details"
        },
        "interior": {
          "type": "object",
          "properties": {
            "bathrooms": {
              "type": "object",
              "properties": {
                "number_full": { "type": "number", "description": "Number of full bathrooms" },
                "number_total": { "type": "number", "description": "Total number of bathrooms" },
                "bathroom1_level": { "type": "string", "description": "Level of the first bathroom" },
                "bathroom2_level": { "type": "string", "description": "Level of the second bathroom" }
              },
              "description": "Bathroom details"
            },
            "rooms": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "type": { "type": "string", "description": "Type of the room" },
                  "level": { "type": "string", "description": "Level of the room" }
                },
                "required": ["type", "level"]
              },
              "description": "List of rooms"
            },
            "basement": {
              "type": "object",
              "description": "Basement details"
            },
            "laundry": {
              "type": "object",
              "description": "Laundry details"
            },
            "fireplace": {
              "type": "object",
              "description": "Fireplace details"
            },
            "interior_features": {
              "type": "object",
              "description": "Interior features"
            }
          },
          "description": "Interior details"
        },
        "exterior": {
          "type": "object",
          "properties": {
            "features": {
              "type": "object",
              "description": "Exterior features"
            },
            "property_information": {
              "type": "object",
              "description": "Property information"
            },
            "lot_information": {
              "type": "object",
              "description": "Lot information"
            }
          },
          "description": "Exterior details"
        },
        "financial": {
          "type": "object",
          "description": "Financial details"
        },
        "utilities": {
          "type": "object",
          "properties": {
            "heating_and_cooling": {
              "type": "object",
              "description": "Heating and cooling details"
            },
            "utility": {
              "type": "object",
              "description": "Utility details"
            }
          },
          "description": "Utility details"
        },
        "location": {
          "type": "object",
          "properties": {
            "school_information": {
              "type": "object",
              "description": "School information"
            },
            "location_information": {
              "type": "object",
              "description": "Location information"
            }
          },
          "description": "Location details"
        },
        "other": {
          "type": "object",
          "properties": {
            "listing_information": {
              "type": "object",
              "description": "Listing information"
            }
          },
          "description": "Other details"
        }
      },
      "description": "Property details"
    },
    "sales_and_tax": {
      "type": "object",
      "properties": {
        "sales_history": {
          "type": "object",
          "description": "Sales history"
        },
        "tax_history": {
          "type": "object",
          "description": "Tax history"
        }
      },
      "description": "Sales and tax details"
    },
    "public_facts": {
      "type": "object",
      "description": "Public facts"
    },
    "schools": {
      "type": "object",
      "description": "School details"
    },
    "listing_source": {
      "type": "string",
      "description": "Source of the listing, either SYSTEM or REALTOR"
    },
    "status": {
      "type": "string",
      "description": "Current status of the listing",
      "enum": ["SOURCED", "SCREENED", "IN REVIEW", "REVIEWED", "IN DUE DILIGENCE", "SELECTED", "REJECTED", "ARCHIVED"]
    }
  },
  "required": ["listing_id", "name", "address", "property_description", "property_highlights", "listing_agent", "listing_source", "status"]
}
```

### Schema Explanation

- **listing_id**: Unique identifier for the listing.
- **name**: Name of the listing.
- **address**: Contains the address details of the property, including house number, street, apartment, city, state, and zip code.
- **property_description**: Detailed description of the property.
- **property_highlights**: Highlights key aspects of the property such as total acres, tillable land, woodland, wetland, deed restrictions, and barns.
- **days_on_market**: Number of days the listing has been on the market.
- **type**: Type of the property.
- **built_on**: Date when the property was built.
- **renovated_on**: List of dates when the property was renovated.
- **listing_agent**: Details of the listing agent, including name, company, phone number, and email.
- **dataroom_id**: Identifier for the associated data room.
- **workflows**: Workflow-related information.
- **images, videos, maps**: Lists of URLs for images, videos, and maps related to the property.
- **property_details**: Detailed information about the property's parking, interior, exterior, financial aspects, utilities, location, and other features.
- **sales_and_tax**: Sales and tax history of the property.
- **public_facts**: Public facts related to the property.
- **schools**: Information about nearby schools.
- **listing_source**: Indicates whether the property was sourced by the system (SYSTEM) or by a Realtor (REALTOR).
- **status**: Current status of the listing, which can be `SOURCED`, `SCREENED`, `IN REVIEW`, `REVIEWED`, `IN DUE DILIGENCE`, `SELECTED`, `REJECTED`, or `ARCHIVED`.

By adhering to this detailed schema, the Listing Service ensures that all necessary and relevant information is captured, providing a comprehensive and accurate representation of each property listed on the Agsiri platform.

## 5. Service Endpoints

To support the various business activities described, the following service endpoints are required:

### Create a New Listing
-

 **Endpoint**: `POST /listings`
- **Description**: Creates a new listing in the system.
- **Request Body**: Listing document as defined in the schema above.
- **Response**: The complete listing document if successful.

### Modify an Existing Listing
- **Endpoint**: `PUT /listings/{listing_id}`
- **Description**: Modifies an existing listing.
- **Request Body**: Attributes to be modified or added.
- **Response**: The complete listing document if successful.

### Get All Listings
- **Endpoint**: `GET /listings`
- **Description**: Retrieves all listings from the listing service.
- **Response**: An array of all the listing documents.

### Get a Particular Listing
- **Endpoint**: `GET /listings/{listing_id}`
- **Description**: Retrieves a particular listing specified by the listing_id.
- **Response**: The requested listing document.

### Delete a Listing
- **Endpoint**: `DELETE /listings/{listing_id}`
- **Description**: Deletes a listing from the listing service. Note that the listing cannot be deleted if there is any farm document created from the listing id specified.
- **Response**: Confirmation of deletion if successful.

### Trigger Screening Workflow
- **Endpoint**: `POST /listings/{listing_id}/screen`
- **Description**: Triggers the screening workflow for a sourced listing.
- **Response**: Confirmation of workflow initiation.

### Trigger Analyst Review Workflow
- **Endpoint**: `POST /listings/{listing_id}/review`
- **Description**: Triggers the analyst review workflow for a screened listing.
- **Response**: Confirmation of workflow initiation.

### Trigger Due Diligence Workflow
- **Endpoint**: `POST /listings/{listing_id}/due_diligence`
- **Description**: Triggers the due diligence workflow for a reviewed listing.
- **Response**: Confirmation of workflow initiation.

### Create Farm from Listing
- **Endpoint**: `POST /listings/{listing_id}/create_farm`
- **Description**: Triggers the Farm Onboarding Flow to create a farm from the listing information for a selected listing.
- **Response**: Confirmation of workflow initiation.

### Add Notes During Review
- **Endpoint**: `POST /listings/{listing_id}/review/notes`
- **Description**: Adds notes during the review process for a listing.
- **Request Body**: Note details (e.g., author, content).
- **Response**: Confirmation of note addition.

### Add Documents During Review
- **Endpoint**: `POST /listings/{listing_id}/review/documents`
- **Description**: Adds documents during the review process for a listing.
- **Request Body**: Document details (e.g., document type, URL).
- **Response**: Confirmation of document addition.

### Add Photos During Review
- **Endpoint**: `POST /listings/{listing_id}/review/photos`
- **Description**: Adds photos during the review process for a listing.
- **Request Body**: Photo details (e.g., URL, description).
- **Response**: Confirmation of photo addition.

### Add Videos During Review
- **Endpoint**: `POST /listings/{listing_id}/review/videos`
- **Description**: Adds videos during the review process for a listing.
- **Request Body**: Video details (e.g., URL, description).
- **Response**: Confirmation of video addition.

### Add Notes During Due Diligence
- **Endpoint**: `POST /listings/{listing_id}/due_diligence/notes`
- **Description**: Adds notes during the due diligence process for a listing.
- **Request Body**: Note details (e.g., author, content).
- **Response**: Confirmation of note addition.

### Add Documents During Due Diligence
- **Endpoint**: `POST /listings/{listing_id}/due_diligence/documents`
- **Description**: Adds documents during the due diligence process for a listing.
- **Request Body**: Document details (e.g., document type, URL).
- **Response**: Confirmation of document addition.

### Add Photos During Due Diligence
- **Endpoint**: `POST /listings/{listing_id}/due_diligence/photos`
- **Description**: Adds photos during the due diligence process for a listing.
- **Request Body**: Photo details (e.g., URL, description).
- **Response**: Confirmation of photo addition.

### Add Videos During Due Diligence
- **Endpoint**: `POST /listings/{listing_id}/due_diligence/videos`
- **Description**: Adds videos during the due diligence process for a listing.
- **Request Body**: Video details (e.g., URL, description).
- **Response**: Confirmation of video addition.

## 6. Events and Their Schema

### Event: Listing Created
- **Event Name**: `listing.created`
- **Description**: Emitted when a new listing is created.
- **Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "event": { "type": "string", "enum": ["listing.created"] },
      "timestamp": { "type": "string", "format": "date-time" },
      "listing": { "$ref": "#/definitions/listing" }
    },
    "required": ["event", "timestamp", "listing"]
  }
  ```

### Event: Listing Updated
- **Event Name**: `listing.updated`
- **Description**: Emitted when a listing is updated.
- **Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "event": { "type": "string", "enum": ["listing.updated"] },
      "timestamp": { "type": "string", "format": "date-time" },
      "listing_id": { "type": "string" },
      "updated_fields": { "type": "object" }
    },
    "required": ["event", "timestamp", "listing_id", "updated_fields"]
  }
  ```

### Event: Listing Status Changed
- **Event Name**: `listing.status_changed`
- **Description**: Emitted when the status of a listing changes.
- **Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "event": { "type": "string", "enum": ["listing.status_changed"] },
      "timestamp": { "type": "string", "format": "date-time" },
      "listing_id": { "type": "string" },
      "old_status": { "type": "string", "enum": ["SOURCED", "SCREENED", "IN REVIEW", "REVIEWED", "IN DUE DILIGENCE", "SELECTED", "REJECTED", "ARCHIVED"] },
      "new_status": { "type": "string", "enum": ["SOURCED", "SCREENED", "IN REVIEW", "REVIEWED", "IN DUE DILIGENCE", "SELECTED", "REJECTED", "ARCHIVED"] }
    },
    "required": ["event", "timestamp", "listing_id", "old_status", "new_status"]
  }
  ```

### Event: Note Added
- **Event Name**: `listing.note_added`
- **Description**: Emitted when a note is added to a listing during review or due diligence.
- **Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "event": { "type": "string", "enum": ["listing.note_added"] },
      "timestamp": { "type": "string", "format": "date-time" },
      "listing_id": { "type": "string" },
      "phase": { "type": "string", "enum": ["REVIEW", "DUE DILIGENCE"] },
      "note": { "type": "object", "properties": { "author": { "type": "string" }, "content": { "type": "string" } }, "required": ["author", "content"] }
    },
    "required": ["event", "timestamp", "listing_id", "phase", "note"]
  }
  ```

### Event: Document Added
- **Event Name**: `listing.document_added`
- **Description**: Emitted when a document is added to a listing during review or due diligence.
- **Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "event": { "type": "string", "enum": ["listing.document_added"] },
      "timestamp": { "type": "string", "format": "date-time" },
      "listing_id": { "type": "string" },
      "phase": { "type": "string", "enum": ["REVIEW", "DUE DILIGENCE"] },
      "document": { "type": "object", "properties": { "type": { "type": "string" }, "url": { "type": "string" } }, "required": ["type", "url"] }
    },
    "required": ["event", "timestamp", "listing_id", "phase", "document"]
  }
  ```

### Event: Photo Added
- **Event Name**: `listing.photo_added`
- **Description**: Emitted when a photo is added to a listing during review or due diligence.
- **Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "event": { "type": "string", "enum": ["listing.photo_added"] },
      "timestamp": { "type":

 "string", "format": "date-time" },
      "listing_id": { "type": "string" },
      "phase": { "type": "string", "enum": ["REVIEW", "DUE DILIGENCE"] },
      "photo": { "type": "object", "properties": { "url": { "type": "string" }, "description": { "type": "string" } }, "required": ["url", "description"] }
    },
    "required": ["event", "timestamp", "listing_id", "phase", "photo"]
  }
  ```

### Event: Video Added
- **Event Name**: `listing.video_added`
- **Description**: Emitted when a video is added to a listing during review or due diligence.
- **Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "event": { "type": "string", "enum": ["listing.video_added"] },
      "timestamp": { "type": "string", "format": "date-time" },
      "listing_id": { "type": "string" },
      "phase": { "type": "string", "enum": ["REVIEW", "DUE DILIGENCE"] },
      "video": { "type": "object", "properties": { "url": { "type": "string" }, "description": { "type": "string" } }, "required": ["url", "description"] }
    },
    "required": ["event", "timestamp", "listing_id", "phase", "video"]
  }
  ```

## Example Event Payloads

### Example: Listing Created
```json
{
  "event": "listing.created",
  "timestamp": "2024-08-05T10:00:00Z",
  "listing": {
    "listing_id": "12345",
    "name": "Sunny Acres",
    "address": {
      "house_number": "123",
      "street": "Farm Road",
      "apartment": "",
      "city": "Agri Town",
      "state": "CA",
      "zip": "98765"
    },
    "property_description": "Beautiful farm with 132 acres of tillable land.",
    "property_highlights": {
      "total_acres": 132,
      "tillable": 105,
      "woodland": 20,
      "wetland": 2,
      "deed_restrictions": "No",
      "barns": [
        {
          "size": "20x30",
          "description": "Needs lots of repairs"
        }
      ]
    },
    "days_on_market": "10",
    "type": "Farm",
    "built_on": "1990-01-01",
    "renovated_on": ["2000-01-01", "2010-01-01"],
    "listing_agent": {
      "name": "John Doe",
      "company": "Agri Realty",
      "phone_number": "555-1234",
      "email": "johndoe@agrirealty.com"
    },
    "dataroom_id": "67890",
    "workflows": {},
    "images": ["http://example.com/image1.jpg"],
    "videos": ["http://example.com/video1.mp4"],
    "maps": ["http://example.com/map1.png"],
    "property_details": {
      "parking": {
        "number_of_spaces": 5,
        "type": "Garage"
      },
      "interior": {
        "bathrooms": {
          "number_full": 2,
          "number_total": 3,
          "bathroom1_level": "First Floor",
          "bathroom2_level": "Second Floor"
        },
        "rooms": [
          {
            "type": "Living Room",
            "level": "First Floor"
          }
        ],
        "basement": {},
        "laundry": {},
        "fireplace": {},
        "interior_features": {}
      },
      "exterior": {
        "features": {},
        "property_information": {},
        "lot_information": {}
      },
      "financial": {},
      "utilities": {
        "heating_and_cooling": {},
        "utility": {}
      },
      "location": {
        "school_information": {},
        "location_information": {}
      },
      "other": {
        "listing_information": {}
      }
    },
    "sales_and_tax": {
      "sales_history": {},
      "tax_history": {}
    },
    "public_facts": {},
    "schools": {},
    "listing_source": "SYSTEM",
    "status": "SOURCED"
  }
}
```

### Example: Listing Updated
```json
{
  "event": "listing.updated",
  "timestamp": "2024-08-05T12:00:00Z",
  "listing_id": "12345",
  "updated_fields": {
    "property_description": "Updated description of the property.",
    "property_highlights": {
      "total_acres": 135
    }
  }
}
```

### Example: Listing Status Changed
```json
{
  "event": "listing.status_changed",
  "timestamp": "2024-08-05T14:00:00Z",
  "listing_id": "12345",
  "old_status": "SOURCED",
  "new_status": "SCREENED"
}
```

### Example: Note Added
```json
{
  "event": "listing.note_added",
  "timestamp": "2024-08-05T16:00:00Z",
  "listing_id": "12345",
  "phase": "REVIEW",
  "note": {
    "author": "Jane Smith",
    "content": "This property looks promising for our investment strategy."
  }
}
```

### Example: Document Added
```json
{
  "event": "listing.document_added",
  "timestamp": "2024-08-05T18:00:00Z",
  "listing_id": "12345",
  "phase": "DUE DILIGENCE",
  "document": {
    "type": "Soil Report",
    "url": "http://example.com/soil_report.pdf"
  }
}
```

### Example: Photo Added
```json
{
  "event": "listing.photo_added",
  "timestamp": "2024-08-05T20:00:00Z",
  "listing_id": "12345",
  "phase": "REVIEW",
  "photo": {
    "url": "http://example.com/photo1.jpg",
    "description": "Aerial view of the farm."
  }
}
```

### Example: Video Added
```json
{
  "event": "listing.video_added",
  "timestamp": "2024-08-05T22:00:00Z",
  "listing_id": "12345",
  "phase": "DUE DILIGENCE",
  "video": {
    "url": "http://example.com/video1.mp4",
    "description": "Walkthrough video of the property."
  }
}
```

## Policy Matrix for Listing Service

### User Roles and Access Control

The following policy matrix defines which actions each role can perform within the Listing Service:

| Role           | View | Create | Update | Delete | Screen | Review | Due Diligence | Add Notes | Add Documents | Add Photos | Add Videos |
|----------------|------|--------|--------|--------|--------|--------|---------------|-----------|---------------|------------|------------|
| Administrator  | ✔    | ✔      | ✔      | ✔      | ✔      | ✔      | ✔             | ✔         | ✔             | ✔          | ✔          |
| Analyst        | ✔    | ✔      | ✔      | ✖      | ✔      | ✔      | ✔             | ✔         | ✔             | ✔          | ✔          |
| Realtor        | ✔    | ✔      | ✖      | ✖      | ✖      | ✖      | ✖             | ✖         | ✖             | ✖          | ✖          |
| Farm Manager   | ✔    | ✖      | ✖      | ✖      | ✖      | ✖      | ✔             | ✔         | ✔             | ✔          | ✔          |
| Investor       | ✔    | ✖      | ✖      | ✖      | ✖      | ✖      | ✖             | ✖         | ✖             | ✖          | ✖          |

### Policy Definitions Using the Agsiri IAM Policy Schema

Here are the policies defined for each role using the Agsiri IAM Policy Schema:

### 1. Administrator Policy

```json
{
  "name": "AdministratorPolicy",
  "description": "Policy for administrators with full access to listings",
  "resource": "listings",
  "rules": [
    {
      "actions": ["view", "create", "update", "delete", "screen", "review", "due_diligence", "add_notes", "add_documents", "add_photos", "add_videos"],
      "effect": "ALLOW",
      "roles": ["administrator"]
    }
  ],
  "organization": "66adaae3dff42f72342ecf5e"
}
```

### 2. Analyst Policy

```json
{
  "name": "AnalystPolicy",
  "description": "Policy for analysts with access to review and due diligence processes",
  "resource": "listings",
  "rules": [
    {
      "actions": ["view", "create", "update", "screen", "review", "due_diligence", "add_notes", "add_documents", "add_photos", "add_videos"],
      "effect": "ALLOW",
      "roles": ["analyst"]
    },
    {
      "actions": ["delete"],
      "effect": "DENY",
      "roles": ["analyst"]
    }
  ],
  "organization": "66adaae3dff42f72342ecf5e"
}
```

### 3. Realtor Policy

```json
{
  "name": "RealtorPolicy",
  "description": "Policy for realtors with limited access to create listings",
  "resource": "listings",
  "rules": [
    {
      "actions": ["view", "create"],
      "effect": "ALLOW",
      "roles": ["realtor"]
    },
    {
      "actions": ["update", "delete", "screen", "review", "due_diligence", "add_notes", "add_documents", "add_photos", "add_videos"],
      "effect": "DENY",
      "roles": ["realtor"]
    }
  ],
  "organization": "66adaae3dff42f72342ecf5e"
}
```

### 4. Farm Manager Policy

```json
{
  "name": "FarmManagerPolicy",
  "description": "Policy for farm managers with access to view listings and perform due diligence",
  "resource": "listings",
  "rules": [
    {
      "actions": ["view", "due_diligence", "add_notes", "add_documents", "add_photos", "add_videos"],
      "effect": "ALLOW",
      "roles": ["farm_manager"]
    },
    {
      "actions": ["create", "update", "delete", "screen", "review"],
      "effect": "DENY",
      "roles": ["farm_manager"]
    }
  ],
  "organization": "66adaae3dff42f72342ecf5e"
}
```

### 5. Investor Policy

```json
{
  "name": "InvestorPolicy",
  "description": "Policy for investors with view-only access to listings",
  "resource": "listings",
  "rules": [
    {
      "actions": ["view"],
      "effect": "ALLOW",
      "roles": ["investor"]
    },
    {
      "actions": ["create", "update", "delete", "screen", "review", "due_diligence", "add_notes", "add_documents", "add_photos", "add_videos"],
      "effect": "DENY",
      "roles": ["investor"]
    }
  ],
  "organization": "66adaae3dff42f72342ecf5e"
}
```

By utilizing these events and their schemas, the Listing Service ensures that all activities related to listings are accurately tracked, providing a transparent and auditable trail of actions and changes. This enhances the platform's integrity and trustworthiness for all stakeholders.
