# Curl Scripts for Validating Farm Service

## Create a New Farm


curl -X POST http://localhost:3000/farms \
-H "Content-Type: application/json" \
-d '{
  "listing_id": "1",
  "name": "217 Pickle Hill",
  "address": {
    "house_number": "217",
    "street": "Pickle Hill Road",
    "apartment": "",
    "city": "Austin",
    "state": "TX",
    "zip": "78701"
  },
  "location": {
    "longitude": "-97.7431",
    "latitude": "30.2672"
  },
  "property_description": "A beautiful farm with great soil and crop yield.",
  "main_picture": "main_picture.jpg",
  "images": ["image1.jpg", "image2.jpg"],
  "videos": ["video1.mp4"],
  "maps": ["map1.png"],
  "parcel_information": ["parcel1", "parcel2"],
  "due_diligence": {
    "soil_information": {
      "documents": ["soil_doc1.pdf"],
      "maps": ["soil_map1.png"]
    },
    "financial_information": {
      "cash_flow": {},
      "sales_data": {},
      "expenses_data": {},
      "documents": ["financial_doc1.pdf"]
    },
    "crop_information": {},
    "other": {}
  }
}'

## Modify an Existing Farm


curl -X PUT http://localhost:3000/farms/{farm_id} \
-H "Content-Type: application/json" \
-d '{
  "name": "Updated 217 Pickle Hill",
  "property_description": "An updated description for the beautiful farm."
}'
Replace {farm_id} with the actual ID of the farm you want to update.


## Get All Farms


curl -X GET http://localhost:3000/farms

## Get a Particular Farm


curl -X GET http://localhost:3000/farms/{farm_id}
Replace {farm_id} with the actual ID of the farm you want to retrieve.


## Delete a Farm


curl -X DELETE http://localhost:3000/farms/{farm_id}
Replace {farm_id} with the actual ID of the farm you want to delete.


## Create/Update Due Diligence Soil Information


curl -X PUT http://localhost:3000/farms/{farm_id}/dd/soil \
-H "Content-Type: application/json" \
-d '{
  "documents": ["updated_soil_doc1.pdf"],
  "maps": ["updated_soil_map1.png"]
}'
Replace {farm_id} with the actual ID of the farm you want to update soil information for.


## Create/Update Due Diligence Financial Information


curl -X PUT http://localhost:3000/farms/{farm_id}/dd/financial \
-H "Content-Type: application/json" \
-d '{
  "cash_flow": {"2024": "50000"},
  "documents": ["updated_financial_doc1.pdf"]
}'
Replace {farm_id} with the actual ID of the farm you want to update financial information for.


## Create/Update Due Diligence Crop Information


curl -X PUT http://localhost:3000/farms/{farm_id}/dd/crop \
-H "Content-Type: application/json" \
-d '{
  "crop_information": {"crop_type": "corn", "yield": "2000"}
}'
Replace {farm_id} with the actual ID of the farm you want to update crop information for.


## Create/Update Due Diligence Other Information


curl -X PUT http://localhost:3000/farms/{farm_id}/dd/other \
-H "Content-Type: application/json" \
-d '{
  "other_information": {"misc": "some other important info"}
}'
Replace {farm_id} with the actual ID of the farm you want to update other information for.
