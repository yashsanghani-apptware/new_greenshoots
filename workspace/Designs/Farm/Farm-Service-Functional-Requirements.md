# Introduction to Farms Service
The Farms Service is designed to manage all aspects of farm data within the Agsiri platform. This includes onboarding new farms, managing due diligence data, and maintaining up-to-date information about farms and their associated shares. The Farms Service ensures that all data is accurate and accessible, facilitating smooth operations and investment decisions.

## Key Capabilities
Farm Onboarding: Create and manage new farm entries, including determining the number of shares based on farm value and share price.
Due Diligence Management: Collect and update due diligence information for farms, covering soil, financial, crop, and other relevant data.
Farm Information Management: Maintain and update detailed information about each farm, including location, description, and media assets.
Share Management: Handle different types of shares (preferential and ordinary) and manage the share pricing and issuance.
Farm Listing and Retrieval: Provide APIs to list all farms, retrieve specific farm details, and delete farm entries when necessary.

# Functional Specifications for Farms Service

## API Endpoints

### Create a New Farm

Description: This API creates a new farm in Agsiri.

Endpoint: POST /farms

Request Body:

{
  "listing_id": "string",
  "name": "string",
  "address": {
    "house_number": "string",
    "street": "string",
    "apartment": "string",
    "city": "string",
    "state": "string",
    "zip": "string"
  },
  "location": {
    "longitude": "string",
    "latitude": "string"
  },
  "property_description": "string",
  "main_picture": "string",
  "images": ["string"],
  "videos": ["string"],
  "maps": ["string"],
  "parcel_information": ["string"],
  "due_diligence": {
    "soil_information": {
      "documents": ["string"],
      "maps": ["string"]
    },
    "financial_information": {
      "cash_flow": {},
      "sales_data": {},
      "expenses_data": {},
      "documents": ["string"]
    },
    "crop_information": {},
    "other": {}
  }
}
Response: Returns the complete farm document, if successful.

### Modify an Existing Farm

Description: This API modifies an existing farm. Modifications can include a subset of the attributes or the whole farm document.

Endpoint: PUT /farms/{farm_id}

Request Body: Contains the attributes that need to be modified or added.

Response: Returns the complete farm document, if successful.

### Get All Farms

Description: Get all the farms from the farm service.

Endpoint: GET /farms

Response: Returns an array of all the farm documents.

### Get a Particular Farm

Description: Get a particular farm as specified by the farm_id.

Endpoint: GET /farms/{farm_id}

Response: Returns the requested farm document.

### Delete a Farm

Description: Delete a farm from the farm service. The farm cannot be deleted if there is any offering document created from the specified farm id.

Endpoint: DELETE /farms/{farm_id}

Response: Returns the deleted farm document.

### Create/Update Due Diligence Soil Information

Description: This API creates/updates the soil information in the due diligence section.

Endpoint: PUT /farms/{farm_id}/dd/soil

Request Body: Contains one or more attributes of the soil information that will be updated as part of the due diligence of the farm.

Response: Returns the complete farm document.

### Create/Update Due Diligence Financial Information

Description: This API creates/updates the financial information in the due diligence section.

Endpoint: PUT /farms/{farm_id}/dd/financial

Request Body: Contains one or more attributes of the financial information that will be updated as part of the due diligence of the farm.

Response: Returns the complete farm document.

### Create/Update Due Diligence Crop Information

Description: This API creates/updates the crop information in the due diligence section.

Endpoint: PUT /farms/{farm_id}/dd/crop

Request Body: Contains one or more attributes of the crop information that will be updated as part of the due diligence of the farm.

Response: Returns the complete farm document.

### Create/Update Due Diligence Other Information

Description: This API creates/updates the other information in the due diligence section.

Endpoint: PUT /farms/{farm_id}/dd/other

Request Body: Contains one or more attributes of the other information that will be updated as part of the due diligence of the farm.

Response: Returns the complete farm document.

# Functional Flow for Farm Onboarding
## Compute Number of Shares:

Determine the number of shares based on the farm value and the price per share.
Fractional shares are possible.
Example: If farm value is $350,750 and share price is $1000, the number of shares is 350.75.
Onboarding Campaign:

Once the farm is onboarded, send out a campaign to all system customers with farm details, including share price and number of shares.

Each initial investor can opt to buy any number of shares within a configured maximum and minimum limit.
Minimum Holding Period:

Enforce a minimum holding period before investors can sell their shares.

# Data Model for Farm
## Farm Document Schema:

{
  "farm_id": "string",
  "listing_id": "string",
  "name": "string",
  "address": {
    "house_number": "string",
    "street": "string",
    "apartment": "string",
    "city": "string",
    "state": "string",
    "zip": "string"
  },
  "location": {
    "longitude": "string",
    "latitude": "string"
  },
  "property_description": "string",
  "main_picture": "string",
  "images": ["string"],
  "videos": ["string"],
  "maps": ["string"],
  "parcel_information": ["string"],
  "due_diligence": {
    "soil_information": {
      "documents": ["string"],
      "maps": ["string"]
    },
    "financial_information": {
      "cash_flow": {},
      "sales_data": {},
      "expenses_data": {},
      "documents": ["string"]
    },
    "crop_information": {},
    "other": {}
  }
}

This document schema ensures all necessary information about the farm is captured and organized for further processing and due diligence
