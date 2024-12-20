# Document Verification API
AmlCloud offers an extensive array of out-of-the-box document verifications. Two verification types exist:

MRZ Verification: Performs analysis checks on the Machine Readable Zone (MRZ) values specified by the user.
Image Verification: Performs image, Optical Character Recognition (OCR), and MRZ analysis on the attachments associated with the supplied document.

The API allows you to create and retrieve document verification requests.

Verification Types and Analysis

Analysis Type	Verification	Description
authenticity_analysis	IMAGE, MRZ	Asserts whether the document is a fake, a specimen, or a copy.
integrity_analysis	IMAGE, MRZ	Asserts whether the document is of a valid and identifiable format.
content_analysis	IMAGE	Asserts whether data extracted by OCR from multiple places on the document is consistent with the data held in MRZ.
mrz_analysis	IMAGE, MRZ	Asserts whether MRZ data is valid and adheres to internationally recognized standards.
consistency_analysis	IMAGE, MRZ	Asserts whether data on the document is consistent with customer details held by AmlCloud (e.g., whether the name on a passport is the same as the customer's name).
expiration_check	IMAGE, MRZ	Checks whether the document has expired or not.

Document Types Requiring Both Sides

Name	Country	Type
National Identity Card	EU and European Free Trade Association	NATIONAL_ID_CARD
Driving License	Canada	DRIVING_LICENSE
Visa	Biometric Residence Permit	VISA

## Document Verification Object
Attributes:

id (string): The unique identifier for the document verification.
customer_id (string): The unique identifier for the customer.
entity_name (string): The concatenated first_name and last_name of the customer if an individual, or company_name if a company.
document_id (string): The unique identifier for the document to be verified.
created_at (datetime): The date and time when the document verification was created.
updated_at (datetime): The date and time when the document verification was updated.
type (string): The type of document verification to be performed. Valid values are:
IMAGE
MRZ
outcome (hash): Provides the outcome and breakdown of the analysis done on the document.
properties (list): The document properties derived using OCR technology.
status (string): The overall status of the document verification. Values can be:
INITIATED - indicates verification request is created.
PENDING - indicates one or more of the verifications checks are IN_PROGRESS.
DONE - indicates all the verifications checks have been completed by AmlCloud.

Example Response:

{
    "created_at": "2017-11-10T22:54:17Z",
    "updated_at": "2017-11-10T22:54:17Z",
    "document_id": "{DOCUMENT_ID}",
    "customer_id": "{CUSTOMER_ID}",
    "entity_name": "John Doe",
    "type": "IMAGE",
    "outcome": {
        "authenticity_analysis": {
            "status": "ERROR",
            "breakdown": [
                {
                    "type": "MRZ_MATCHING_TYPE",
                    "status": "NOT_APPLICABLE"
                },
                {
                    "type": "MRZ_VISUAL_FORMAT",
                    "status": "NOT_APPLICABLE"
                },
                {
                    "type": "PHOTO_LOCATION",
                    "status": "NOT_APPLICABLE"
                },
                {
                    "type": "DAYLIGHT_COLOUR_ANALYSIS",
                    "status": "NOT_APPLICABLE"
                },
                {
                    "type": "DOCUMENT_SPECIMEN",
                    "status": "ERROR"
                },
                {
                    "type": "VISUAL_SECURITY_ELEMENTS",
                    "status": "NOT_APPLICABLE"
                }
            ]
        },
        "integrity_analysis": {
            "status": "CLEAR",
            "breakdown": [
                {
                    "type": "ISSUE_COUNTRY",
                    "status": "CLEAR"
                },
                {
                    "type": "DOCUMENT_TYPE_EXPIRATION",
                    "status": "CLEAR"
                },
                {
                    "type": "VALIDITY_OUT_OF_COUNTRY",
                    "status": "NOT_APPLICABLE"
                },
                {
                    "type": "NATIONALITY_MATCH",
                    "status": "CLEAR"
                },
                {
                    "type": "DOCUMENT_RECOGNISED",
                    "status": "CLEAR"
                },
                {
                    "type": "ISSUE_DATE",
                    "status": "CLEAR"
                }
            ]
        },
        "content_analysis": {
            "status": "NOT_APPLICABLE",
            "breakdown": [
                {
                    "type": "DOC_NUMBER_RECOGNISED",
                    "status": "NOT_APPLICABLE"
                },
                {
                    "type": "LAST_NAME_RECOGNISED",
                    "status": "NOT_APPLICABLE"
                },
                {
                    "type": "FIRST_NAME_RECOGNISED",
                    "status": "NOT_APPLICABLE"
                },
                {
                    "type": "BIRTH_DATE_RECOGNISED",
                    "status": "NOT_APPLICABLE"
                }
            ]
        },
        "mrz_analysis": {
            "status": "CLEAR",
            "breakdown": [
                {
                    "type": "MRZ_FIELDS_FORMAT",
                    "status": "CLEAR"
                },
                {
                    "type": "MRZ_CHECKSUM",
                    "status": "CLEAR"
                }
            ]
        },
        "consistency_analysis": {
            "status": "ATTENTION",
            "breakdown": [
                {
                    "type": "CUSTOMER_DOB",
                    "status": "ATTENTION"
                },
                {
                    "type": "CUSTOMER_BIRTH_PLACE",
                    "status": "NOT_APPLICABLE"
                },
                {
                    "type": "CUSTOMER_NATIONALITY",
                    "status": "ATTENTION"
                },
                {
                    "type": "CUSTOMER_LAST_NAME",
                    "status": "ATTENTION"
                },
                {
                    "type": "CUSTOMER_GENDER",
                    "status": "NOT_APPLICABLE"
                },
                {
                    "type": "CUSTOMER_FIRST_NAME",
                    "status": "ATTENTION"
                }
            ]
        },
        "expiration_check": {
            "status": "ATTENTION",
            "breakdown": [
                {
                    "type": "DOCUMENT_EXPIRATION",
                    "status": "ATTENTION"
                }
            ]
        }
    },
    "properties": {
        "document_type": "NATIONAL_IDENTITY_CARD",
        "document_data": {
            "document_number": "GZ000030E",
            "mrz_line1": "IDGIBGZ000030E2Q15000174<<<<<<",
            "mrz_line2": "7402061M2501280GBR<<<<<<<<<<<0",
            "mrz_line3": "FREEMAN<<PAUL<JAMES<<<<<<<<<<<",
            "issuing_country": "GIB",
            "expiry_date": {
                "day": 28,
                "month": 1,
                "year": 2025
            }
        },
        "holder_data": {
            "first_name": [
                "PAUL",
                "JAMES"
            ],
            "last_name": [
                "FREEMAN"
            ],
            "dob": {
                "day": 6,
                "month": 2,
                "year": 1974
            },
            "nationality": "GBR",
            "gender": "MALE"
        },
        "extracted_images": []
    },
    "status": "DONE",
    "id": "{VERIFICATION_ID}"
}

## Create a Document Verification
Definition:

POST https://api.amlcloud.ai/v1/customers/{customer_id}/verifications
Example Request:

curl https://api.amlcloud.ai/v1/customers/{customer_id}/verifications \
    -H 'Authorization: Bearer test_api_token' \
    -X POST \
    -d '{
        "document_id": "{document_id}",
        "type": "IMAGE"
    }'

Attributes:

type (required): The type of document verification to be performed. Valid values are:
IMAGE
MRZ
document_id (required): The unique identifier for the document to be verified.

## Retrieve a Document Verification
Definition:

GET https://api.amlcloud.ai/v1/customers/{customer_id}/verifications/{verification_id}
Example Request:

curl https://api.amlcloud.ai/v1/customers/{customer_id}/verifications/{verification_id} \
    -H 'Authorization: Bearer test_api_token' \
    -X GET

Example Response:

{
    "created_at": "2017-11-10T22:54:17Z",
    "updated_at": "2017-11-10T22:54:17Z",
    "document_id": "{DOCUMENT_ID}",
    "customer_id": "{CUSTOMER_ID}",
    "entity_name": "John Doe",
    "type": "IMAGE",
    "outcome": {
        "authenticity_analysis": {
            "status": "ERROR",
            "breakdown": [
                {
                    "type": "MRZ_MATCHING_TYPE",
                    "status": "NOT_APPLICABLE"
                },
                {
                    "type": "MRZ_VISUAL_FORMAT",
                    "status": "NOT_APPLICABLE"
                },
                {
                    "type": "PHOTO_LOCATION",
                    "status": "NOT_APPLICABLE"
                },
                {
                    "type": "DAYLIGHT_COLOUR_ANALYSIS",
                    "status": "NOT_APPLICABLE"
                },
                {
                    "type": "DOCUMENT_SPECIMEN",
                    "status": "ERROR"
                },
                {
                    "type": "VISUAL_SECURITY_ELEMENTS",
                    "status": "NOT_APPLICABLE"
                }
            ]
        },
        "integrity_analysis": {
            "status": "CLEAR",
            "breakdown": [
                {
                    "type": "ISSUE_COUNTRY",
                    "status": "CLEAR"
                },
                {
                    "type": "DOCUMENT_TYPE_EXPIRATION",
                    "status": "CLEAR"
                },
                {
                    "type": "VALIDITY_OUT_OF_COUNTRY",
                    "status": "NOT_APPLICABLE"
                },
                {
                    "type": "NATIONALITY_MATCH",
                    "status": "CLEAR"
                },
                {
                    "type": "DOCUMENT_RECOGNISED",
                    "status": "CLEAR"
                },
                {
                    "type": "ISSUE_DATE",
                    "status": "CLEAR"
                }
            ]
        },
        "content_analysis": {
            "status": "NOT_APPLICABLE",
            "breakdown": [
                {
                    "type": "DOC_NUMBER_RECOGNISED",
                    "status": "NOT_APPLICABLE"
                },
                {
                    "type": "LAST_NAME_RECOGNISED",
                    "status": "NOT_APPLICABLE"
                },
                {
                    "type": "FIRST_NAME_RECOGNISED",
                    "status": "NOT_APPLICABLE"
                },
                {
                    "type": "BIRTH_DATE_RECOGNISED",
                    "status": "NOT_APPLICABLE"
                }
            ]
        },
        "mrz_analysis": {
            "status": "CLEAR",
            "breakdown": [
                {
                    "type": "MRZ_FIELDS_FORMAT",
                    "status": "CLEAR"
                },
                {
                    "type": "MRZ_CHECKSUM",
                    "status": "CLEAR"
                }
            ]
        },
        "consistency_analysis": {
            "status": "ATTENTION",
            "breakdown": [
                {
                    "type": "CUSTOMER_DOB",
                    "status": "ATTENTION"
                },
                {
                    "type": "CUSTOMER_BIRTH_PLACE",
                    "status": "NOT_APPLICABLE"
                },
                {
                    "type": "CUSTOMER_NATIONALITY",
                    "status": "ATTENTION"
                },
                {
                    "type": "CUSTOMER_LAST_NAME",
                    "status": "ATTENTION"
                },
                {
                    "type": "CUSTOMER_GENDER",
                    "status": "NOT_APPLICABLE"
                },
                {
                    "type": "CUSTOMER_FIRST_NAME",
                    "status": "ATTENTION"
                }
            ]
        },
        "expiration_check": {
            "status": "ATTENTION",
            "breakdown": [
                {
                    "type": "DOCUMENT_EXPIRATION",
                    "status": "ATTENTION"
                }
            ]
        }
    },
    "properties": {
        "document_type": "NATIONAL_IDENTITY_CARD",
        "document_data": {
            "document_number": "GZ000030E",
            "mrz_line1": "IDGIBGZ000030E2Q15000174<<<<<<",
            "mrz_line2": "7402061M2501280GBR<<<<<<<<<<<0",
            "mrz_line3": "FREEMAN<<PAUL<JAMES<<<<<<<<<<<",
            "issuing_country": "GIB",
            "expiry_date": {
                "day": 28,
                "month": 1,
                "year": 2025
            }
        },
        "holder_data": {
            "first_name": [
                "PAUL",
                "JAMES"
            ],
            "last_name": [
                "FREEMAN"
            ],
            "dob": {
                "day": 6,
                "month": 2,
                "year": 1974
            },
            "nationality": "GBR",
            "gender": "MALE"
        },
        "extracted_images": []
    },
    "status": "DONE",
    "id": "{VERIFICATION_ID}"
}

Attributes:

customer_id (required): The unique identifier for the customer.
verification_id (required): The unique identifier for the document verification.

## List All Document Verifications for Customer
Definition:

GET https://api.amlcloud.ai/v1/customers/{customer_id}/verifications

Attributes:

created_after (optional): A “greater than” filter on the list based on the object created_at field.
created_before (optional): A “less than” filter on the list based on the object created_at field.
updated_after (optional): A “greater than” filter on the list based on the object updated_at field.
updated_before (optional): A “less than” filter on the list based on the object updated_at field.
type (optional): An “equal” filter on the list based on the object type field.
status (optional): An “equal” filter on the list based on the object status field.

## Search Document Verifications
Definition:

GET https://api.amlcloud.ai/v1/search/verifications

Attributes:

created_after (optional): A “greater than” filter on the list based on the object created_at field.
created_before (optional): A “less than” filter on the list based on the object created_at field.
updated_after (optional): A “greater than” filter on the list based on the object updated_at field.
updated_before (optional): A “less than” filter on the list based on the object updated_at field.
type (optional): An “equal” filter on the list based on the object type field.
status (optional): An “equal” filter on the list based on the object status field.
document_ids (optional): An “equal” filter on the list based on the document object ID field. This can be a list.
customer_ids (optional): An “equal” filter on the list based on the customer object ID field. This can be a list.
