# Identity Verification API
AmlCloud uses the latest in facial recognition and biometric algorithms to calculate a similarity score of how likely two faces belong to the same person. The API allows you to create and retrieve identity verification requests. Only JPEG, PNG, and BMP formats are currently supported. The allowed image file size is from 1KB to 4MB.

Identity Verification Object

Attributes:

id (string): The unique identifier for the identity verification.
customer_id (string): The unique identifier for the customer.
entity_name (string): The concatenated first_name and last_name of the customer.
document_id (string): The unique identifier for the document (e.g., passport) to be used for comparison against a selfie image.
selfie_id (string): The unique identifier for the selfie image to be verified.
created_at (datetime): The date and time when the identity verification was created.
updated_at (datetime): The date and time when the identity verification was updated.
face_match (boolean): Indicates if the selfie image taken by the customer matches the photo embedded in a document.
similarity (integer): Indicates the similarity level of whether two faces belong to the same person. By default, AmlCloud sets the face_match to true when the similarity is greater than or equal to 0.5.
face_analysis (hash): Provides a breakdown of identity verification results. The format will be a list of key-value pairs for the selfie image and identity document provided.
status (hash): The overall status of the identity verification. Values can be:
INITIATED - indicates the verification request is created.
PENDING - indicates one or more of the verification checks are IN_PROGRESS.
DONE - indicates all the verification checks have been completed by AmlCloud.

Example Response:

{
    "created_at": "2017-11-10T22:54:17Z",
    "updated_at": "2017-11-10T22:54:17Z",
    "document_id": "{DOCUMENT_ID}",
    "customer_id": "{CUSTOMER_ID}",
    "entity_name": "John Doe",
    "selfie_id": "{SELFIE_ID}",
    "status": "DONE",
    "face_match": true,
    "similarity": 0.9531,
    "face_analysis": {
        "selfie_image": {
            "age": 25,
            "gender": "MALE",
            "exposure_level": "GOOD_EXPOSURE",
            "noise_level": "LOW",
            "blur_level": "LOW"
        },
        "identity_document": {
            "age": 22,
            "gender": "MALE",
            "exposure_level": "GOOD_EXPOSURE",
            "noise_level": "LOW",
            "blur_level": "LOW"
        }
    },
    "id": "{IDENTIFICATION_ID}"
}

## Identity Verification Result
Attributes:

age (integer): Indicates an estimated “visual age” number in years. It is how old a person looks rather than the actual biological age.
exposure_level (string): Indicates face exposure level. Values can be GOOD_EXPOSURE, OVER_EXPOSURE, or UNDER_EXPOSURE.
blur_level (string): Indicates the face blur level. Values can be LOW, MEDIUM, or HIGH. Larger values mean the face is more blurry.
noise_level (string): Indicates the noise level of face pixels. Values can be LOW, MEDIUM, or HIGH. Larger values mean the face is noisier.
gender (string): Indicates the gender. Values are MALE or FEMALE.

## Create an Identity Verification
Definition:

POST https://api.amlcloud.ai/v1/customers/{customer_id}/identifications
Example Request:

curl https://api.amlcloud.ai/v1/customers/{customer_id}/identifications \
    -H 'Authorization: Bearer test_api_token' \
    -X POST \
    -d '{
        "document_id": "{DOCUMENT_ID}",
        "selfie_image": "<BASE64_ENCODED_IMAGE>"
    }'

Attributes:

document_id (required): The unique identifier for the document (e.g., passport) to be used for comparison against a selfie image.
selfie_image (required): The Base64 encoded selfie image. Upon creation of the identity verification request, a selfie ID will be generated for subsequent retrieval.

## Retrieve an Identity Verification
Definition:

GET https://api.amlcloud.ai/v1/customers/{customer_id}/identifications/{identification_id}
Example Request:

curl https://api.amlcloud.ai/v1/customers/{customer_id}/identifications/{identification_id} \
    -H 'Authorization: Bearer test_api_token' \
    -X GET

Example Response:

{
    "created_at": "2017-11-10T22:54:17Z",
    "updated_at": "2017-11-10T22:54:17Z",
    "document_id": "{DOCUMENT_ID}",
    "customer_id": "{CUSTOMER_ID}",
    "entity_name": "John Doe",
    "selfie_id": "{SELFIE_ID}",
    "status": "DONE",
    "face_match": true,
    "similarity": 0.9531,
    "face_analysis": {
        "selfie_image": {
            "age": 25,
            "gender": "MALE",
            "exposure_level": "GOOD_EXPOSURE",
            "noise_level": "LOW",
            "blur_level": "LOW"
        },
        "identity_document": {
            "age": 22,
            "gender": "MALE",
            "exposure_level": "GOOD_EXPOSURE",
            "noise_level": "LOW",
            "blur_level": "LOW"
        }
    },
    "id": "{IDENTIFICATION_ID}"
}
Attributes:

customer_id (required): The unique identifier for the customer.
identification_id (required): The unique identifier for the identity verification.

## List All Identity Verifications for Customer
Definition:

GET https://api.amlcloud.ai/v1/customers/{customer_id}/identifications
Attributes:

created_after (optional): A “greater than” filter on the list based on the object created_at field.
created_before (optional): A “less than” filter on the list based on the object created_at field.
updated_after (optional): A “greater than” filter on the list based on the object updated_at field.
updated_before (optional): A “less than” filter on the list based on the object updated_at field.
status (optional): An “equal” filter on the list based on the object status field.

## Search Identity Verifications
Definition:

GET https://api.amlcloud.ai/v1/search/identifications

Attributes:

created_after (optional): A “greater than” filter on the list based on the object created_at field.
created_before (optional): A “less than” filter on the list based on the object created_at field.
updated_after (optional): A “greater than” filter on the list based on the object updated_at field.
updated_before (optional): A “less than” filter on the list based on the object updated_at field.
status (optional): An “equal” filter on the list based on the object status field.
document_ids (optional): An “equal” filter on the list based on the document object ID field. This can be a list.
customer_ids (optional): An “equal” filter on the list based on the customer object ID field. This can be a list.
