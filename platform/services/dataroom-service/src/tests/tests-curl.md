# Data Room Service - Web Service Endpoints Validation
## Data Room Endpoints
### Create Data Room

curl --location 'http://localhost:3000/datarooms' \
--header 'Content-Type: application/json' \
--data '{
  "client_id": "60d5f484f8f8c5a001c8a3d1",
  "name": "Test Data Room",
  "description": "This is a test data room.",
  "user_id": "60d5f4b1f8f8c5a001c8a3d2",
  "key_info": {},
  "permissions": []
}'

### Get Data Room

curl -X GET http://localhost:3000/datarooms/{dataroom_id}
Replace {dataroom_id} with the actual ID of the data room.

### Get List of Data Rooms
curl -X GET http://localhost:3000/datarooms

### Update Data Room

curl -X PUT http://localhost:3000/datarooms/{dataroom_id} \
-H "Content-Type: application/json" \
-d '{
  "name": "Updated Farm Data Room",
  "description": "This is an updated description."
}'
Replace {dataroom_id} with the actual ID of the data room.

### Delete Data Room

curl -X DELETE http://localhost:3000/datarooms/{dataroom_id}
Replace {dataroom_id} with the actual ID of the data room.

### Create Data Room Permission

curl -X POST http://localhost:3000/datarooms/{dataroom_id}/permissions \
-H "Content-Type: application/json" \
-d '{
  "type": "VIEW",
  "roles": ["admin"],
  "users": ["60d5f4e2f8f8c5a001c8a3d3"],
  "start_time": "2024-07-10T00:00:00Z",
  "end_time": "2024-07-20T00:00:00Z"
}'
Replace {dataroom_id} with the actual ID of the data room.

### Get Data Room Permission

curl -X GET http://localhost:3000/datarooms/{dataroom_id}/permissions/{permission_id}
Replace {dataroom_id} and {permission_id} with the actual IDs.

### Get List of Data Room Permissions

curl -X GET http://localhost:3000/datarooms/{dataroom_id}/permissions
Replace {dataroom_id} with the actual ID of the data room.

### Update Data Room Permission

curl -X PUT http://localhost:3000/datarooms/{dataroom_id}/permissions/{permission_id} \
-H "Content-Type: application/json" \
-d '{
  "type": "READ",
  "roles": ["user"],
  "users": ["60d5f4e2f8f8c5a001c8a3d4"],
  "start_time": "2024-07-12T00:00:00Z",
  "end_time": "2024-07-25T00:00:00Z"
}'
Replace {dataroom_id} and {permission_id} with the actual IDs.

### Delete Data Room Permission

curl -X DELETE http://localhost:3000/datarooms/{dataroom_id}/permissions/{permission_id}
Replace {dataroom_id} and {permission_id} with the actual IDs.

### Check User Permissions for Data Room

curl -X POST http://localhost:3000/datarooms/{dataroom_id}/user/{user_id}/checkpermission \
-H "Content-Type: application/json" \
-d '{
  "permissions": ["VIEW"]
}'
Replace {dataroom_id} and {user_id} with the actual IDs.

## Cabinet Endpoints
### Create Cabinet


curl -X POST http://localhost:3000/cabinets \
-H "Content-Type: application/json" \
-d '{
  "dataroom_id": "60d5f484f8f8c5a001c8a3d1",
  "name": "Investor Cabinet",
  "description": "Cabinet for investor documents.",
  "user_id": "60d5f4b1f8f8c5a001c8a3d2",
  "type": "SECURE"
}'
### Get Cabinet


curl -X GET http://localhost:3000/cabinets/{cabinet_id}
Replace {cabinet_id} with the actual ID of the cabinet.

### Get List of Cabinets


curl -X GET http://localhost:3000/cabinets
### Update Cabinet


curl -X PUT http://localhost:3000/cabinets/{cabinet_id} \
-H "Content-Type: application/json" \
-d '{
  "name": "Updated Investor Cabinet",
  "description": "Updated cabinet description."
}'
Replace {cabinet_id} with the actual ID of the cabinet.

### Delete Cabinet


curl -X DELETE http://localhost:3000/cabinets/{cabinet_id}
Replace {cabinet_id} with the actual ID of the cabinet.

### Create Cabinet Permission


curl -X POST http://localhost:3000/cabinets/{cabinet_id}/permissions \
-H "Content-Type: application/json" \
-d '{
  "type": "WRITE",
  "roles": ["manager"],
  "users": ["60d5f4e2f8f8c5a001c8a3d5"],
  "start_time": "2024-07-15T00:00:00Z",
  "end_time": "2024-07-30T00:00:00Z"
}'
Replace {cabinet_id} with the actual ID of the cabinet.

### Get Cabinet Permission


curl -X GET http://localhost:3000/cabinets/{cabinet_id}/permissions/{permission_id}
Replace {cabinet_id} and {permission_id} with the actual IDs.

### Get List of Cabinet Permissions


curl -X GET http://localhost:3000/cabinets/{cabinet_id}/permissions
Replace {cabinet_id} with the actual ID of the cabinet.

### Update Cabinet Permission


curl -X PUT http://localhost:3000/cabinets/{cabinet_id}/permissions/{permission_id} \
-H "Content-Type: application/json" \
-d '{
  "type": "READ",
  "roles": ["guest"],
  "users": ["60d5f4e2f8f8c5a001c8a3d6"],
  "start_time": "2024-07-16T00:00:00Z",
  "end_time": "2024-07-20T00:00:00Z"
}'
Replace {cabinet_id} and {permission_id} with the actual IDs.

### Delete Cabinet Permission


curl -X DELETE http://localhost:3000/cabinets/{cabinet_id}/permissions/{permission_id}
Replace {cabinet_id} and {permission_id} with the actual IDs.

### Check User Permissions for Cabinet


curl -X POST http://localhost:3000/cabinets/{cabinet_id}/user/{user_id}/checkpermission \
-H "Content-Type: application/json" \
-d '{
  "permissions": ["WRITE"]
}'
Replace {cabinet_id} and {user_id} with the actual IDs.

## File Endpoints
### Upload File


curl -X POST http://localhost:3000/files \
-H "Content-Type: multipart/form-data" \
-F "file=@/path/to/your/file" \
-F "cabinet_id=60d5f4e8f8f8c5a001c8a3d7" \
-F "name=Investor Document" \
-F "description=Document for investors" \
-F "user_id=60d5f4b1f8f8c5a001c8a3d2" \
-F "type=SHARED"
Replace /path/to/your/file with the actual file path you want to upload.

### Get File


curl -X GET http://localhost:3000/files/{file_id}
Replace {file_id} with the actual ID of the file.

### Get List of Files


curl -X GET http://localhost:3000/cabinets/{cabinet_id}/files
Replace {cabinet_id} with the actual ID of the cabinet.

### Update File


curl -X PUT http://localhost:3000/files/{file_id} \
-H "Content-Type: application/json" \
-d '{
  "name": "Updated Investor Document",
  "description": "Updated document description."
}'
Replace {file_id} with the actual ID of the file.

### Delete File


curl -X DELETE http://localhost:3000/files/{file_id}
Replace {file_id} with the actual ID of the file.

### Create File Permission


curl -X POST http://localhost:3000/files/{file_id}/permissions \
-H "Content-Type: application/json" \
-d '{
  "type": "READ",
  "roles": ["employee"],
  "users": ["60d5f4e2f8f8c5a001c8a3d8"],
  "start_time": "2024-07-18T00:00:00Z",
  "end_time": "2024-07-25T00:00:00Z"
}'
Replace {file_id} with the actual ID of the file.

### Get File Permission


curl -X GET http://localhost:3000/files/{file_id}/permissions/{permission_id}
Replace {file_id} and {permission_id} with the actual IDs.

### Get List of File Permissions


curl -X GET http://localhost:3000/files/{file_id}/permissions
Replace {file_id} with the actual ID of the file.

### Update File Permission


curl -X PUT http://localhost:3000/files/{file_id}/permissions/{permission_id} \
-H "Content-Type: application/json" \
-d '{
  "type": "WRITE",
  "roles": ["admin"],
  "users": ["60d5f4e2f8f8c5a001c8a3d9"],
  "start_time": "2024-07-19T00:00:00Z",
  "end_time": "2024-07-30T00:00:00Z"
}'
Replace {file_id} and {permission_id} with the actual IDs.

### Delete File Permission


curl -X DELETE http://localhost:3000/files/{file_id}/permissions/{permission_id}
Replace {file_id} and {permission_id} with the actual IDs.

### Check User Permissions for File


curl -X POST http://localhost:3000/files/{file_id}/user/{user_id}/checkpermission \
-H "Content-Type: application/json" \
-d '{
  "permissions": ["READ"]
}'
Replace {file_id} and {user_id} with the actual IDs.

These curl commands should cover the basic operations for testing all the endpoints of the Data Room Service. Adjust the data and IDs as per your specific setup and requirements.
