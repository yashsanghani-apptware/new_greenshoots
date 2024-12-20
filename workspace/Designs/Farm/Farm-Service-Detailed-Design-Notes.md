# Detailed Design Specification for Farm Service
## Overview
The Farm Service is a critical component of the Agsiri platform, responsible for managing farm data, onboarding new farms, conducting due diligence, and handling share information. This service ensures that all farm-related information is accurately stored, maintained, and accessible for investment decisions.

## Architecture
Frontend: The frontend will use a modern JavaScript framework like React or Angular for a user-friendly interface to manage farms.
Backend: The backend will be built using Node.js and Express to provide RESTful APIs. MongoDB will be used for the metadata store.
Storage: Amazon S3 will be used for storing media assets (images, videos, documents).
External Services: Integration with the Quantum Flow Notification Service and a Workflow Service for handling notifications and document workflows.

## Data Models

### Farm Model

models/farm.js

javascript
Copy code
const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  house_number: String,
  street: String,
  apartment: String,
  city: String,
  state: String,
  zip: String
});

const LocationSchema = new mongoose.Schema({
  longitude: String,
  latitude: String
});

const DueDiligenceSchema = new mongoose.Schema({
  soil_information: {
    documents: [String],
    maps: [String]
  },
  financial_information: {
    cash_flow: Object,
    sales_data: Object,
    expenses_data: Object,
    documents: [String]
  },
  crop_information: Object,
  other: Object
});

const FarmSchema = new mongoose.Schema({
  listing_id: String,
  name: String,
  address: AddressSchema,
  location: LocationSchema,
  property_description: String,
  main_picture: String,
  images: [String],
  videos: [String],
  maps: [String],
  parcel_information: [String],
  due_diligence: DueDiligenceSchema
});

module.exports = mongoose.model('Farm', FarmSchema);

## API Endpoints

### Create a New Farm

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
Endpoint: PUT /farms/{farm_id}

Request Body: Contains the attributes that need to be modified or added.

Response: Returns the complete farm document, if successful.

### Get All Farms
Endpoint: GET /farms

Response: Returns an array of all the farm documents.

### Get a Particular Farm
Endpoint: GET /farms/{farm_id}

Response: Returns the requested farm document.

### Delete a Farm
Endpoint: DELETE /farms/{farm_id}

Response: Returns the deleted farm document.

### Create/Update Due Diligence Soil Information
Endpoint: PUT /farms/{farm_id}/dd/soil

Request Body: Contains one or more attributes of the soil information that will be updated as part of the due diligence of the farm.

Response: Returns the complete farm document.

### Create/Update Due Diligence Financial Information
Endpoint: PUT /farms/{farm_id}/dd/financial

Request Body: Contains one or more attributes of the financial information that will be updated as part of the due diligence of the farm.

Response: Returns the complete farm document.

### Create/Update Due Diligence Crop Information
Endpoint: PUT /farms/{farm_id}/dd/crop

Request Body: Contains one or more attributes of the crop information that will be updated as part of the due diligence of the farm.

Response: Returns the complete farm document.

### Create/Update Due Diligence Other Information
Endpoint: PUT /farms/{farm_id}/dd/other

Request Body: Contains one or more attributes of the other information that will be updated as part of the due diligence of the farm.

Response: Returns the complete farm document.
