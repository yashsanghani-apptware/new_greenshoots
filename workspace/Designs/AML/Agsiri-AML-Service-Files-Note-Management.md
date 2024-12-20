# File and Note Management API
Several of our services, such as document verification and identity verification, make use of file attachments to execute checks. The Files API allows you to retrieve, update, upload, download, and delete these files. This document provides detailed descriptions of the file and note objects, their attributes, and examples of API requests and responses.

File Object
Attributes:

id (string): The unique identifier for the file.
created_at (datetime): The date and time when the file was created.
updated_at (datetime): The date and time when the file was updated.
filename (string): The file name.
size (string): The size of the file in bytes. Required for an application/json request.
content_type (string): The MIME-standard content type of the file (e.g., image/jpeg).
content (string): Base64 encoded file content. Required for an application/json request.
file (form-data parameter): An attribute indicating a path to the local file to be uploaded. Required for a multipart/form-data request.
locked (boolean): Indicates if the file is locked and can no longer be deleted.

Example Response:

{
    "id": "{FILE_ID}",
    "created_at": "2018-02-14T12:00:16Z",
    "updated_at": "2018-02-14T12:00:16Z",
    "content_type": "image/jpeg",
    "filename": "passport",
    "size": 1234,
    "content": "<BASE64_ENCODED_IMAGE>",
    "locked": false
}

## Retrieve a File
Definition:

GET https://api.amlcloud.ai/v1/files/{file_id}
Example Request:

curl https://api.amlcloud.ai/v1/files/{file_id} \
    -H 'Authorization: Bearer test_api_token' \
    -X GET
Example Response:

{
    "id": "{FILE_ID}",
    "created_at": "2018-02-14T12:00:16Z",
    "updated_at": "2018-02-14T12:00:16Z",
    "content_type": "image/jpeg",
    "filename": "passport",
    "size": 1234,
    "content": "<BASE64_ENCODED_IMAGE>",
    "locked": false
}

## Download a File
Definition:

GET https://api.amlcloud.ai/v1/files/{file_id}?output=BASE64

Example Request:

curl https://api.amlcloud.ai/v1/files/{file_id}?output=BASE64 \
    -H 'Authorization: Bearer test_api_token' \
    -X GET
Attributes:

file_id (required): The unique identifier for the file.
output (required): The type of output file content. Valid values are:
STREAM - returns file contents as part of the HTTP response.
BASE64 - returns Base64 encoded string as part of the file object JSON.

## Update a File
Definition:

PUT https://api.amlcloud.ai/v1/files/{file_id}
Example Request:

curl https://api.amlcloud.ai/v1/files/{file_id} \
    -H 'Authorization: Bearer test_api_token' \
    -X PUT \
    -d '{
          "content_type": "image/jpeg",
          "filename": "passport copy",
          "size": 1234,
          "content": "<base64-encoded data>"
        }'
Example Response:

{
    "id": "{FILE_ID}",
    "created_at": "2018-02-14T12:00:16Z",
    "updated_at": "2018-02-14T12:00:16Z",
    "content_type": "image/jpeg",
    "filename": "passport",
    "size": 1234,
    "content": "<BASE64_ENCODED_IMAGE>",
    "locked": false
}

## Partially Update a File
Definition:

PATCH https://api.amlcloud.ai/v1/files/{file_id}
Example Request:

curl https://api.amlcloud.ai/v1/files/{file_id} \
    -H 'Authorization: Bearer test_api_token' \
    -H 'content-type: application/json' \
    -X PATCH \
    -d '[{
            "op": "replace",
            "path": "/filename",
            "value": "passport copy"
         }]'
Note: Only fields to be updated should be provided in the request as a JSON patch object.

## Delete a File
Definition:

DELETE https://api.amlcloud.ai/v1/files/{file_id}
Example Request:

curl https://api.amlcloud.ai/v1/files/{file_id} \
 -H 'Authorization: Bearer test_api_token' \
 -X DELETE
Attributes:

file_id (required): The unique identifier for the file.

## List All Files
Definition:

GET https://api.amlcloud.ai/v1/files

Attributes:

created_after (optional): A “greater than” filter on the list based on the object created_at field.
created_before (optional): A “less than” filter on the list based on the object created_at field.
updated_after (optional): A “greater than” filter on the list based on the object updated_at field.
updated_before (optional): A “less than” filter on the list based on the object updated_at field.

# Notes API
Note Object
Attributes:

id (string): The unique identifier for the note.
created_at (datetime): The date and time when the note was created.
updated_at (datetime): The date and time when the note was updated.
text (string): The text of the note. A note cannot exceed 4000 characters.

Example Response:

{
    "id": "{NOTE_ID}",
    "created_at": "2017-01-17T23:46:26Z",
    "updated_at": "2017-01-17T23:46:26Z",
    "text": "A useful note about John Doe."
}

## Create a Note
Definition:

POST https://api.amlcloud.ai/v1/customers/{customer_id}/notes/
Example Request:

curl https://api.amlcloud.ai/v1/customers/{note_id}/notes \
    -H 'Authorization: Bearer test_api_token' \
    -H 'content-type: application/json' \
    -X POST \
    -d '{
            "text": "A useful note about John Doe."
        }'
Example Response:

{
    "id": "{NOTE_ID}",
    "created_at": "2017-01-17T23:46:26Z",
    "updated_at": "2017-01-17T23:46:26Z",
    "text": "A useful note about John Doe."
}

## Retrieve a Note
Definition:

GET https://api.amlcloud.ai/v1/customers/{customer_id}/notes/{note_id}
Example Request:

curl https://api.amlcloud.ai/v1/customers/{customer_id}/notes/{note_id} \
 -H 'Authorization: Bearer test_api_token' \
 -X GET

Example Response:

{
    "id": "{NOTE_ID}",
    "created_at": "2017-01-17T23:46:26Z",
    "updated_at": "2017-01-17T23:46:26Z",
    "text": "A useful note about John Doe."
}
Attributes:

customer_id (required): The unique identifier for the customer.
note_id (required): The unique identifier for the note.

## Update a Note
Definition:

PUT https://api.amlcloud.ai/v1/customers/{customer_id}/notes/{note_id}
Example Request:

curl https://api.amlcloud.ai/v1/customers/{customer_id}/notes/{note_id} \
    -H 'Authorization: Bearer test_api_token' \
    -H 'content-type: application/json' \
    -X PUT \
    -d '{
            "text": "Update note on John Doe."
        }'
Example Response:

{
    "id": "{NOTE_ID}",
    "created_at": "2017-01-17T23:46:26Z",
    "updated_at": "2017-01-18T10:10:10Z",
    "text": "Update note on John Doe."
}

## Delete a Note
Definition:

DELETE https://api.amlcloud.ai/v1/customers/{customer_id}/notes/{note_id}
Example Request:

curl https://api.amlcloud.ai/v1/customers/{customer_id}/notes/{note_id} \
 -H 'Authorization: Bearer test_api_token' \
 -X DELETE
Attributes:

customer_id (required): The unique identifier for the customer.
note_id (required): The unique identifier for the note.

## List All Notes
Definition:

GET https://api.amlcloud.ai/v1/customers/{customer_id}/notes
Attributes:

created_after (optional): A “greater than” filter on the list based on the object created_at field.
created_before (optional): A “less than” filter on the list based on the object created_at field.
updated_after (optional): A “greater than” filter on the list based on the object updated_at field.
updated_before (optional): A “less than” filter on the list based on the object updated_at field.
text (optional): A “contains” filter on the list based on the object text field.
