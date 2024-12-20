# Agsiri Platform - KYC REST API
# Overview
The AmlCloud API provides a framework for automating Know Your Customer (KYC) and Anti-Money Laundering (AML) processes. It is built using REST endpoints with predictable, resource-oriented URLs, and uses HTTP response codes to indicate API errors. JSON is returned by all API responses, including errors.

## API Endpoints

Live: `https://api.agsiri.com`
Sandbox: `https://sandbox.agsiri.com`

## Access Test Token
To make the API explorable, accounts have sandbox and live API keys. Use the appropriate key along with the corresponding AmlCloud domain to perform a live call to api.agsiri.com, or a test call to sandbox.agsiri.com. Requests made to the sandbox environment will not incur a cost.

Register an account to access your live and sandbox tokens from your Dashboard.

## Example Requests

### Create Customer
```
curl https://api.agsiri.com/v1/customers \
    -H 'Authorization: Bearer test_api_token' \
    -H 'content-type: application/json' \
    -X POST \
    -d '{
            "type" : "INDIVIDUAL",
            "email" : "john.doe@example.com",
            "first_name" : "John",
            "last_name" : "Doe",
            "gender" : "MALE",
            "dob" : "1980-01-01"
        }'
```
### Screen Customer
```
curl https://api.agsiri.com/v1/customers/{customer_id}/screenings \
    -H 'Authorization: Bearer test_api_token' \
    -H 'content-type: application/json' \
    -X POST \
    -d '[
        "WATCHLIST",
        "PEP"
        ]'
```
## Authentication and Headers

```
curl https://api.agsiri.com/v1/oauth2/token \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -u "client_id:secret"
```
### Request Headers

#### Authorization:

Required: To request an access token, send your `client_id` and secret values as HTTP basic authentication credentials. If using cURL, specify `-u "client_id:secret"`. When calling APIs, send the value as the OAuth 2.0 access token with the authentication type set as Bearer (e.g., Authorization: Bearer).

## Errors
AmlCloud uses standard HTTP response codes to indicate the success or failure of an API request.

### HTTP Response Codes:

- 200: OK - Everything worked as expected.
- 201: Created - New resource created.
- 204: No Content - Resource is deleted.
- 400: Bad Request - Request has missing arguments or is malformed.
- 401: Unauthorized - Invalid authorization credentials.
- 403: Forbidden - Request is authenticated but has insufficient permissions.
- 404: Not Found - The endpoint requested does not exist.
- 405: Not Found - Method not found.
- 409: Conflict - The request conflicts with another request.
- 410: Gone - Resource no longer available.
- 500: Server Error - Something is wrong on our end.
- 503: Server Unavailable - Service is unavailable (perhaps due to a planned upgrade).

### Error Object
Example:

```
{
  "id": "7e2e3fe2-4ae8-4bff-a1b5-d0b84a964e02",
  "type": "invalid_request",
  "message": "Error message",
  "errors": [
    {
      "field": "nationality",
      "type": "invalid_country_code",
      "message": "No country found for specified code"
    }
  ]
}
```
Attributes:

- id: A unique identifier for the error.
- type: The type of error returned.
- message: A user-friendly message providing more details about the error.
- errors: The list of attributes which have errors associated with them. Only applies to validation errors.

Error Types

- invalid_request: Request has malformed or missing fields.
- invalid_sorting_request: No property “{sort_term}” found.
- invalid_patch_request: Specified patch has invalid path or operation.
- malformed_content: Content of the request does not conform to specification.
- invalid_operation: Operation is not supported.
- invalid_token: Provided token is invalid or expired.
- access_denied: Access to this resource is denied.
- insufficient_permissions: You don’t have sufficient permissions to perform this action.
- resource_not_found: Cannot find a resource {resource}.
- duplicate: Such resource already exists.
- conflict: Resource cannot be modified because of conflicting request.
- resource_deleted: The requested resource was deleted.
- internal_error: Operation execution failed.
- not_implemented: Requested operation isn’t implemented yet.
- service_maintenance: A service is under planned maintenance.

Validation Error Codes
- mandatory_field_missing: This field is required.
- incorrect_email_format: The format of the email is incorrect.
- past_date_expected: The date value for this field is expected to be in the past.
- date_out_of_bounds:
- Date is expected to be earlier than {x}.
- Date is expected to be later than {x}.
- Date is expected to be between {x} and {y}.
- incorrect_phone_number_format: Phone number does not meet international format.
- invalid_country_code: No country found for specified code.
- invalid_pattern:
- For search terms: %, ^,* and @ are not allowed.
- For incorporation number: Only numbers, digits, _ and - are allowed.
- wrong_value_length: Size must be between {x} and {y}.
- invalid_value: The value provided does not conform to specification.
- invalid_date_format: Invalid date format or value, expected YYYY-MM-DD.
- invalid_mrz_format: The format of MRZ line is invalid, only A-Z, 0-9 and < are expected.
- invalid_constant_value: The value provided does not conform to specification.

## Pagination
```
GET https://api.agsiri.com/v1/customers?page=0&size=2&sort=last_name,DESC
```
All top-level API resources support bulk fetches via “list” API methods. These requests will be paginated to 20 items by default. You can specify further pages using the page parameter and specify page size. Other parameters include sort, which will expect a string-based attribute name, followed by asc or desc.

### Attributes:

- page: Specifies the page number to retrieve. Value must be between 0 and 100.
- size: Indicates how many records each page should contain. Value must be greater than or equal to 1.
- sort: Sorts the records in the response by the specified attribute. Optionally, you can specify whether the records are returned in ascending or descending order.

## Patch Object
A JSON patch object can be used across several endpoints to apply partial updates to resources.

Attributes:

- op: The operation to perform. Valid values are: add, remove, replace, move, copy, and test.
- path: A JSON pointer that references a location in the target document where the operation is performed.
- value: The value to apply based on the operation. The remove operation does not require a value.
- from: A JSON pointer that references the location in the target document from which to move the value. Required for the move operation.

# Customers
A customer represents the individual or company the various checks are being performed on. To initiate a check, a customer must be created first. The API allows you to create, retrieve, update, and delete customers. You can retrieve specific customers as well as a list of all customers.

## Create a Customer

POST `https://api.agsiri.com/v1/customers`

```
curl https://api.agsiri.com/v1/customers \
    -H 'Authorization: Bearer test_api_token' \
    -H 'content-type: application/json' \
    -X POST \
    -d '{
            "type" : "INDIVIDUAL",
            "email" : "john.doe@example.com",
            "title" : "MR",
            "first_name" : "John",
            "middle_name": "A.",
            "last_name" : "Doe",
            "dob" : "1980-01-01",
            "gender": "MALE",
            "addresses" : [
                {
                    "type": "PRIMARY",
                    "property_name": "Custom House",
                    "line": "Main Street",
                    "extra_line": "City Square",
                    "city": "Aldgate",
                    "state_or_province": "London",
                    "postal_code": "E99 0ZZ",
                    "country": "GBR",
                    "from_date": "2010-01-01"
                }
            ]
        }'
```
Example Response:

```
{
    "id": "{CUSTOMER_ID}",
    "created_at": "2017-01-17T23:46:26Z",
    "updated_at": "2017-01-17T23:46:26Z",
    "type" : "INDIVIDUAL",
    "title" : "MR",
    "first_name" : "John",
    "middle_name": "A.",
    "last_name" : "Doe",
    "email" : "john.doe@example.com",
    "dob" : "1980-01-01",
    "gender": "MALE",
    "addresses": [
        {
            "type": "PRIMARY",
            "property_name": "Custom House",
            "line": "Main Street",
            "extra_line": "City Square",
            "city": "Aldgate",
            "state_or_province": "London",
            "postal_code": "E99 0ZZ",
            "country": "GBR",
            "from_date": "2010-01-01"
        }
    ]
}
```

## Retrieve a Customer

Definition:

GET `https://api.agsiri.com/v1/customers/{customer_id}`

Example Request:

```
curl https://api.agsiri.com/v1/customers/{customer_id} \
    -H 'Authorization: Bearer test_api_token' \
    -X GET
```
Example Response:

```
{
    "id": "{CUSTOMER_ID}",
    "created_at": "2017-01-24T12:30:10Z",
    "updated_at": "2017-01-24T12:30:10Z",
    "type": "COMPANY",
    "company_name": "John Doe's Bakery",
    "incorporation_type": "PRIVATE_LIMITED",
    "incorporation_country": "GBR",
    "business_purpose": "PRIVATE_ENTITY",
    "email": "company@example.com",
    "primary_contact_name": "John Doe",
    "primary_contact_email": "john.doe@example.com",
    "addresses":[
        {
            "type": "PRIMARY",
            "property_number": "10",
            "property_name": "Atrium House",
            "line": "Main Business Park",
            "city": "Knutsford",
            "state_or_province": "Cheshire",
            "postal_code": "W99 6ZZ",
            "country": "GBR",
            "from_date": "2015-01-01"
       }
    ]
}
```
## Retrieves the details of an existing customer. You need only supply the unique customer identifier that was returned upon customer creation.

Attributes:

- customer_id: The unique identifier for the customer.

## Update a Customer

Definition:

PUT `https://api.agsiri.com/v1/customers/{customer_id}`

Example Request:

```
curl https://api.agsiri.com/v1/customers/{customer_id} \
    -H 'Authorization: Bearer test_api_token' \
    -H 'content-type: application/json' \
    -X PUT \
    -d '{
        "type" : "INDIVIDUAL",
        "email" : "john.doe@example.com",
        "title" : "MR",
        "first_name" : "John",
        "middle_name": "Smith",
        "last_name" : "Doe",
        "dob" : "1980-01-01",
        "gender": "MALE",
        "addresses" : [
            {
                "type": "PRIMARY",
                "property_name": "Custom House",
                "line": "Main Street",
                "extra_line": "City Square",
                "city": "Aldgate",
                "state_or_province": "London",
                "postal_code": "E99 0ZZ",
                "country": "GBR",
                "from_date": "2010-01-01"
            }
        ]
    }'
```
Example Response:
```
{
    "id": "{CUSTOMER_ID}",
    "created_at": "2017-01-17T23:46:26Z",
    "updated_at": "2017-02-01T12:10:11Z",
    "type" : "INDIVIDUAL",
    "title" : "MR",
    "first_name" : "John",
    "middle_name": "Smith",
    "last_name" : "Doe",
    "email" : "john.doe@example.com",
    "dob" : "1980-01-01",
    "gender": "MALE",
    "addresses": [
        {
            "type": "PRIMARY",
            "property_name": "Custom House",
            "line": "Main Street",
            "extra_line": "City Square",
            "city": "Aldgate",
            "state_or_province": "London",
            "postal_code": "E99 0ZZ",
            "country": "GBR",
            "from_date": "2010-01-01"
        }
    ]
}
```
Updates the details of an existing customer. This is an idempotent method and will require all fields you have on the customer to be provided as part of the request. This will ensure customer details held in your system are in line with the details held by AmlCloud.

Please note, the customer type will not be editable once set. Additionally, certain fields will not be editable once the customer has undergone a check:

- For individuals: first_name, middle_name, last_name, and dob.
- For companies: company_name.

Attributes:

- customer_id: The unique identifier for the customer.

## Partially Update a Customer
Definition:

PATCH `https://api.agsiri.com/v1/customers/{customer_id}`

Example Request:

```
curl https://api.agsiri.com/v1/customers/{customer_id} \
    -H 'Authorization: Bearer test_api_token' \
    -H 'content-type: application/json' \
    -X PATCH \
    -d '[
            {
                "op": "replace",
                "path": "/first_name",
                "value": "Eric"
            },
            {
                "op": "replace",
                "path": "/last_name",
                "value": "Jones"
            },
            {
                "op": "replace",
                "path": "/addresses/0/to_date",
                "value": "2015-01-01"
            },
            {
                "op": "add", "path": "/addresses/-",
                "value" : {
                    "type" : "PRIMARY",
                    "line": "Street Line",
                    "city": "Acton",
                    "postal_code": "W77 X11",
                    "country": "GBR",
                    "from_date": "2015-01-02"
                }
            }
        ]'
```
Partially updates the details of an existing customer. Only fields to be updated should be provided in the request as a JSON patch object.

## Delete a Customer
Definition:

DELETE `https://api.agsiri.com/v1/customers/{customer_id}`

Example Request:

```
curl https://api.agsiri.com/v1/customers/{customer_id} \
 -H 'Authorization: Bearer test_api_token' \
 -X DELETE
```
Deletes an existing customer. You need only supply the unique customer identifier that was returned upon customer creation. Also deletes any documents and notes on the customer. Please note, once a customer has undergone any type of checks (e.g., screening), they can no longer be deleted.

Attributes:

- customer_id: The unique identifier for the customer.

## List All Customers

Definition:

GET `https://api.agsiri.com/v1/customers`

Lists all existing customers. The customers are returned sorted by creation date, with the most recent customers appearing first. In addition to the attributes listed on the pagination section, the following optional parameters can be used to refine the response.

Attributes:

- created_after (optional): A “greater than” filter on the list based on the object created_at field.
- created_before (optional): A “less than” filter on the list based on the object created_at field.
- updated_after (optional): A “greater than” filter on the list based on the object updated_at field.
- updated_before (optional): A “less than” filter on the list based on the object updated_at field.
- email (optional): A “contains” filter on the list based on the object email field.
- first_name (optional): A “contains” filter on the list based on the object first_name field.
- middle_name (optional): A “contains” filter on the list based on the object middle_name field.
- last_name (optional): A “contains” filter on the list based on the object last_name field.
- company_name (optional): A “contains” filter on the list based on the object company_name field.
- joined_after (optional): A “greater than” filter on the list based on the object joined_at field.
- joined_before (optional): A “less than” filter on the list based on the object joined_at field.
- postal_code (optional): An “equal” filter on the list based on the object postal_code field.
- country (optional): An “equal” filter on the list based on the object country field.
- type (optional): An “equal” filter on the list based on the object type field.

# Retrieve a Risk Profile
Definition:


GET `https://api.agsiri.com/v1/customers/{customer_id}/risk_profile`

Example Request:

```
curl https://api.agsiri.com/v1/customers/{customer_id}/risk_profile \
    -H 'Authorization: Bearer test_api_token' \
    -H 'content-type: application/json' \
    -X GET
```

Example Response:

```
{
    "profile": {
        "politically_exposed": false,
        "disqualified_entity": false,
        "watchlist_entity": false,
        "relative_or_close_associate": false,
        "adverse_media_exposed": null
    },
    "risk": {
        "political_exposure": "LOW",
        "occupation": "LOW",
        "country": "LOW",
        "watchlist": null,
        "relationship": null,
        "overall": "LOW"
    },
    "last_trigger": "PERSONAL_DETAILS_UPDATE",
    "last_updated": "2017-06-26T12:09:34Z"
}
```

## Retrieves the risk profile of an existing customer.

Attributes:

- profile: Represents a set of attributes key to customer onboarding. The attributes are automatically derived from the various checks and operations conducted on your customers.
- risk: Represents a set of key risk factors associated with your customer, to assist you with onboarding and due diligence.
- last_trigger: The trigger that caused the latest update.
- last_updated: The date and time when the risk profile was last updated.

Profile Attributes

- watchlist_entity: This will be set to true if a customer is found to be in global sanctions and watchlists, or false if no watchlist relation is found. Default value is null if no relevant checks or operations have been conducted.
- politically_exposed: This will be set to true if a customer is found to be politically exposed, or false if no political exposure is found. Default value is null if no relevant checks or operations have been conducted.
- disqualified_entity: This will be set to true if a customer is found to be a disqualified entity, or false if no disqualification is found. Default value is null if no relevant checks or operations have been conducted.
- relative_or_close_associate: This will be set to true if a customer is found to be related to a politically exposed or watchlist entity (company or individual), or false if no relation is found. Default value is null if no relevant checks or operations have been conducted.
- adverse_media_exposed: This will be set to true if a customer is found to be associated with adverse media, or false if no adverse media relation is found. Default value is null if no relevant checks or operations have been conducted.

Risk Attributes

- watchlist: Indicates watchlist risk level, which is automatically calculated by AmlCloud upon the completion of a screening request with watchlist in its scope. Valid values are HIGH when set, or null when not set.
- political_exposure: Indicates political exposure level, which is automatically calculated by AmlCloud upon the completion of a screening request with PEP in its scope. Valid values are HIGH, MEDIUM, and LOW when set, or null when not set.
- relationship: Indicates relationship risk level, which is automatically calculated by AmlCloud upon the completion of a screening request. Valid values are HIGH, MEDIUM, and LOW when set, or null when not set.
- occupation: Represents the occupation risk level, which is automatically calculated by AmlCloud upon the completion of a screening request with PEP in its scope. This is only applicable to customers with political exposure. Valid values are HIGH, MEDIUM, and LOW when set, or null when not set.
- country: Represents the country risk level, which is automatically calculated by AmlCloud based on customer country details, which include the address, nationality, and incorporation_country. Valid values are HIGH, MEDIUM, and LOW when set, or null when not set.
- overall: Overall risk score based on all available risk scores. Valid values are HIGH, MEDIUM, and LOW when set, or null when not set.

Request Arguments

- page: Specifies the page number to retrieve. Value must be between 0 and 100.
- size: Indicates how many records each page should contain. Value must be greater than or equal to 1.
- sort: Sorts the records in the response by the specified attribute. Optionally, you can specify whether the records are returned in ascending or descending order.

- # Customer Document Management
- Documents can be created for a given customer for the following purposes:
- Secure and centralized document storage.
- Perform certain checks such as authenticity and integrity analysis for ID documents e.g., passports.

The documents API allows you to create, update, and delete documents. It also provides the ability to upload relevant attachments to our global document delivery infrastructure.

A document can be created without any attachments as they are optional. This means the document object can be used to capture your customer’s document details without the need of uploading any attachments. These can be uploaded at a later time.

## Document Object
Example Response:
```
{
    "id": "{DOCUMENT_ID}",
    "type": "PASSPORT",
    "document_name": "Customer passport",
    "document_description": "Primary ID document",
    "document_number": "N1234567890",
    "issuing_country": "GBR",
    "issue_date": "2010-01-01",
    "expiry_date": "2020-01-01",
    "created_at": "2017-06-28T08:04:32Z",
    "updated_at": "2017-06-28T08:04:32Z",
    "front_side": {
        "id": "{FILE_ID}",
        "created_at": "2017-06-28T08:04:32Z",
        "updated_at": "2017-06-28T08:04:32Z",
        "filename": "foo.jpg",
        "content_type": "image/jpeg",
        "size": 15,
        "locked": false
    },
    "back_side": {
        "id": "{FILE_ID}",
        "created_at": "2017-06-28T08:04:32Z",
        "updated_at": "2017-06-28T08:04:32Z",
        "filename": "bar.jpg",
        "content_type": "image/jpeg",
        "size": 15,
        "locked": false
    },
    "mrz_line1": "IDFRABERTHIER<<<<<<<<<<<<<<<<<<<<<<<",
    "mrz_line2": "N1234567890JOHN<<<<<<<<<<<<6512068F4"
}
```

Attributes:

- id (string): The unique identifier for the document.
- created_at (datetime): The date and time when the document was created.
- updated_at (datetime): The date and time when the document was updated.
- type (string): The type of document. Valid values are:
    - PASSPORT
    - DRIVING_LICENSE
    - NATIONAL_INSURANCE_NUMBER
    - SOCIAL_SECURITY_NUMBER
    - TAX_ID_NUMBER
    - NATIONAL_ID_CARD
    - VISA
    - POLLING_CARD
    - RESIDENCE_PERMIT
    - OTHER
- issuing_country (string): The country that issued the document. This will be the three-letter country ISO code.
- issuing_authority (string): The authority or organization that issued the document.
- document_number (string): The unique number associated with the document e.g., passport number for a document of type PASSPORT.
- document_name (string): The name of the document e.g., Bank Letter.
- document_description (string): The description of the document e.g., Bank letter confirming John Doe’s address history.
- mrz_line1 (string): The first line of MRZ string.
- mrz_line2 (string): The second line of MRZ string.
- mrz_line3 (string): The third line of MRZ string.
- front_side (hash, file attachments object): The list of attributes pertaining to the front side file attachment of the document.
- back_side (hash, file attachments object): The list of attributes pertaining to the back side file attachment of the document.
- issue_date (date): The issue date of the document. The format is YYYY-MM-DD.
- expiry_date (date): The expiry date of the document. The format is YYYY-MM-DD.

## Create and Upload a Document
Definition:
 
POST `https://api.amlcloud.ai/v1/customers/{customer_id}/documents`

Example Request:

```
curl https://api.amlcloud.ai/v1/customers/{customer_id}/documents \
    -H 'Authorization: Bearer test_api_token' \
    -X POST \
    -F 'front_side=@foo.jpg' \
    -F 'back_side=@bar.jpg' \
    -F 'type=PASSPORT' \
    -F 'document_name=Customer passport' \
    -F 'document_description=Primary ID document' \
    -F 'document_number=N1234567890' \
    -F 'issuing_country=GBR' \
    -F 'issue_date=2010-01-01' \
    -F 'expiry_date=2020-01-01' \
    -F 'mrz_line1=IDGBRDOE<<<<<<<<<<<<<<<<<<<<<<<<<<<<' \
    -F 'mrz_line2=N1234567890JOHN<<<<<<<<<<<<6512068F4'
```
Example Response:

```
{
    "id": "{DOCUMENT_ID}",
    "type": "PASSPORT",
    "document_name": "Customer passport",
    "document_description": "Primary ID document",
    "document_number": "N1234567890",
    "issuing_country": "GBR",
    "issue_date": "2010-01-01",
    "expiry_date": "2020-01-01",
    "created_at": "2017-06-28T08:04:32Z",
    "updated_at": "2017-06-28T08:04:32Z",
    "front_side": {
        "id": "{FILE_ID}",
        "created_at": "2017-06-28T08:04:32Z",
        "updated_at": "2017-06-28T08:04:32Z",
        "filename": "foo.jpg",
        "content_type": "image/jpeg",
        "size": 15,
        "locked": false
    },
    "back_side": {
        "id": "{FILE_ID}",
        "created_at": "2017-06-28T08:04:32Z",
        "updated_at": "2017-06-28T08:04:32Z",
        "filename": "bar.jpg",
        "content_type": "image/jpeg",
        "size": 15,
        "locked": false
    },
    "mrz_line1": "IDFRABERTHIER<<<<<<<<<<<<<<<<<<<<<<<",
    "mrz_line2": "N1234567890JOHN<<<<<<<<<<<<6512068F4"
}
```
Creates a new document object. Optionally, attachments can be uploaded as part of the document creation. Attachments must be uploaded as a multi-part form and the file size must not exceed 4MB. We recommend using files less than 2MB.

In order to upload the back side of a document, the front side must be provided too.

Attributes:

- type (required): The type of document. Valid values are:
    - PASSPORT
    - DRIVING_LICENSE
    - NATIONAL_INSURANCE_NUMBER
    - SOCIAL_SECURITY_NUMBER
    - TAX_ID_NUMBER
    - NATIONAL_ID_CARD
    - VISA
    - POLLING_CARD
    - RESIDENCE_PERMIT
    - OTHER
- issuing_country (optional): The country that issued the document. This will be the three-letter country ISO code.
- issuing_authority (optional): The authority or organization that issued the document.
- document_number (optional): The unique number associated with the document e.g., passport number for a document of type PASSPORT.
- document_name (optional): The name of the document e.g., Bank Letter.
- document_description (optional): The description of the document e.g., Bank letter confirming John Doe’s address history.
- mrz_line1 (optional): The first line of MRZ string.
- mrz_line2 (optional): The second line of MRZ string.
- mrz_line3 (optional): The third line of MRZ string.
- front_side (optional): The list of attributes pertaining to the front side file attachment of the document.
- back_side (optional): The list of attributes pertaining to the back side file attachment of the document.
- issue_date (optional): The issue date of the document. The format is YYYY-MM-DD.
- expiry_date (optional): The expiry date of the document. The format is YYYY-MM-DD.

## Retrieve a Document
Definition:

GET `https://api.amlcloud.ai/v1/customers/{customer_id}/documents/{document_id}`

Example Request:

```
curl https://api.amlcloud.ai/v1/customers/{customer_id}/documents/{document_id} \
    -H 'Authorization: Bearer test_api_token' \
    -X GET
```
Example Response:

```
{
    "id": "{DOCUMENT_ID}",
    "type": "PASSPORT",
    "document_name": "Customer passport",
    "document_description": "Primary ID document",
    "document_number": "N1234567890",
    "issuing_country": "GBR",
    "issue_date": "2010-01-01",
    "expiry_date": "2020-01-01",
    "created_at": "2017-06-28T08:04:32Z",
    "updated_at": "2017-06-28T08:04:32Z",
    "front_side": {
        "id": "{FILE_ID}",
        "created_at": "2017-06-28T08:04:32Z",
        "updated_at": "2017-06-28T08:04:32Z",
        "filename": "foo.jpg",
        "content_type": "image/jpeg",
        "size": 15,
        "locked": false
    },
    "back_side": {
        "id": "{FILE_ID}",
        "created_at": "2017-06-28T08:04:32Z",
        "updated_at": "2017-06-28T08:04:32Z",
        "filename": "bar.jpg",
        "content_type": "image/jpeg",
        "size": 15,
        "locked": false
    },
    "mrz_line1": "IDFRABERTHIER<<<<<<<<<<<<<<<<<<<<<<<",
    "mrz_line2": "N1234567890JOHN<<<<<<<<<<<<6512068F4"
}
```
Retrieves the details of an existing document. You need to supply the unique customer and document identifier.

Attributes:

- customer_id (required): The unique identifier for the customer.
- document_id (required): The unique identifier for the document.

## Download a Document
Definition:

GET `https://api.amlcloud.ai/v1/customers/{customer_id}/documents/{document_id}/download`

Example Request:

```
curl https://api.amlcloud.ai/v1/customers/{customer_id}/documents/{document_id}/download?side=front \
    -H 'Authorization: Bearer test_api_token' \
    -X GET
```
Downloads a previously uploaded document. You need to supply the unique customer and document identifier. Optionally, you can specify which side of a document to download by specifying the side parameter, with front or back as the value. When the side parameter is not explicitly specified, the front side will be downloaded by default.

Attributes:

- customer_id (required): The unique identifier for the customer.
- document_id (required): The unique identifier for the document.
- side (optional): The side of the document to download. Valid values are front or back. When not specified, the front side will be downloaded.

## Update a Document
Definition:


PUT `https://api.amlcloud.ai/v1/customers/{customer_id}/documents/{document_id}`

Example Request:

```
curl https://api.amlcloud.ai/v1/customers/{customer_id}/documents/{document_id} \
    -H 'Authorization: Bearer test_api_token' \
    -X PUT \
    -F 'front_side=@foo.jpg' \
    -F 'back_side=@bar.jpg' \
    -F 'type=DRIVING_LICENSE' \
    -F 'document_name=Customer driving license' \
    -F 'document_description=Primary ID document' \
    -F 'document_number=N1234567890' \
    -F 'issuing_country=GBR' \
    -F 'issue_date=2010-01-01' \
    -F 'expiry_date=2020-01-01'
```
Example Response:


```{
    "id": "{DOCUMENT_ID}",
    "type": "DRIVING_LICENSE",
    "document_name": "Customer driving license",
    "document_description": "Primary ID document",
    "document_number": "N1234567890",
    "issuing_country": "GBR",
    "issue_date": "2010-01-01",
    "expiry_date": "2020-01-01",
    "created_at": "2017-06-28T08:04:32Z",
    "updated_at": "2017-06-28T12:01:06Z",
    "front_side": {
        "id": "{FILE_ID}",
        "created_at": "2017-06-28T08:04:32Z",
        "updated_at": "2017-06-28T08:04:32Z",
        "filename": "foo.jpg",
        "content_type": "image/jpeg",
        "size": 15,
        "locked": false
    },
    "back_side": {
        "id": "{FILE_ID}",
        "created_at": "2017-06-28T08:04:32Z",
        "updated_at": "2017-06-28T08:04:32Z",
        "filename": "bar.jpg",
        "content_type": "image/jpeg",
        "size": 15,
        "locked": false
    }
}```
Updates the details of an existing document. This is an idempotent method and will require all fields you have on the document (including attachments if applicable) to be provided as part of the request. This will ensure document details held in your system are in line with the details held by AmlCloud.

Please note, a document attachment will not be editable once it has undergone an image verification check. Similarly, the MRZ lines will not be editable once an MRZ verification check has been made.

Attributes:

- customer_id (required): The unique identifier for the customer.
- document_id (required): The unique identifier for the document.
- type: The type of document. Valid values are:
    - PASSPORT
    - DRIVING_LICENSE
    - NATIONAL_INSURANCE_NUMBER
    - SOCIAL_SECURITY_NUMBER
    - TAX_ID_NUMBER
    - NATIONAL_ID_CARD
    - VISA
    - POLLING_CARD
    - RESIDENCE_PERMIT
    - OTHER
- issuing_country: The country that issued the document. This will be the three-letter country ISO code.
- issuing_authority: The authority or organization that issued the document.
- document_number: The unique number associated with the document e.g., passport number for a document of type PASSPORT.
- document_name: The name of the document e.g., Bank Letter.
- document_description: The description of the document e.g., Bank letter confirming John Doe’s address history.
- mrz_line1: The first line of MRZ string.
- mrz_line2: The second line of MRZ string.
- mrz_line3: The third line of MRZ string.
- front_side: The list of attributes pertaining to the front side file attachment of the document.
- back_side: The list of attributes pertaining to the back side file attachment of the document.
- issue_date: The issue date of the document. The format is YYYY-MM-DD.
- expiry_date: The expiry date of the document. The format is YYYY-MM-DD.

## Partially Update a Document
Definition:


PATCH `https://api.amlcloud.ai/v1/customers/{customer_id}/documents/{document_id}`

Example Request:

```
curl https://api.amlcloud.ai/v1/customers/{customer_id}/documents/{document_id} \
    -H 'Authorization: Bearer test_api_token' \
    -H 'content-type: application/json' \
    -X PATCH \
    -d '[
            {
                "op": "replace",
                "path": "/type",
                "value": "DRIVING_LICENSE"
            }
        ]'
```
Partially updates the details of an existing document. Only fields to be updated should be provided in the request as a JSON patch object.

## List All Documents
Definition:

GET https://api.amlcloud.ai/v1/customers/{customer_id}/documents

Lists all existing documents associated with a given customer. The documents are returned sorted by creation date, with the most recent documents appearing first. In addition to the attributes listed on the pagination section, the following optional parameters can be used to refine the response.

Attributes:

- created_after (optional): A “greater than” filter on the list based on the object created_at field.
- created_before (optional): A “less than” filter on the list based on the object created_at field.
- updated_after (optional): A “greater than” filter on the list based on the object updated_at field.
- updated_before (optional): A “less than” filter on the list based on the object updated_at field.
- type (optional): An “equal” filter on the list based on the object type field

# Customer Screening
AmlCloud enables you to meet your AML screening commitments through the application of our proprietary scorecard and fuzzy logic to screen your customer against our comprehensive database.

The API allows you to create and retrieve screening requests. Depending on the scope, a request can include the following screening types: global watchlists (including CIA Watchlists, Government Sanctions, Anti-Terrorism, and AML Watchlists), Politically Exposed Persons (PEPs), adverse media, and disqualified entities.

## Screening Object
Example Response:


{
    "id": "{SCREENING_ID}",
    "customer_id": "{CUSTOMER_ID}",
    "entity_name": "Jane Doe",
    "created_at": "2017-01-21T13:00:16Z",
    "updated_at": "2017-01-21T13:00:16Z",
    "scope": ["PEP", "WATCHLIST", "DISQUALIFIED_ENTITIES"],
    "status": "PENDING",
    "outcome": {
        "PEP": "CLEAR",
        "WATCHLIST": "AWAITING_VALIDATION",
        "DISQUALIFIED_ENTITIES": "CLEAR"
    }
}

Attributes:

- id (string): The unique identifier for the screening.
- customer_id (string): The unique identifier for the customer.
- report_id (string): The unique identifier for the report. This is generated once a screening status is DONE.
- entity_name (string): The concatenated first_name and last_name of the customer if an individual, or company_name if a company.
- created_at (datetime): The date and time when the screening was created.
- updated_at (datetime): The date and time when the screening or related matches were updated.
- scope (list screening type): The list of screening types to be performed.
- outcome (hash): Provides summary of screening result, in line with the selected screening scope. The format will be a list of key-value pairs where each of the keys is the screening scope and the value is the screening result.
- status (string): The overall status of the screening for the entire scope. Values can be:
    - CREATED - indicates screening request is created.
    - PENDING - indicates one or more of the screenings in scope are either IN_PROGRESS or AWAITING_VALIDATION.
    - DONE - indicates all the screenings in scope have been completed by AmlCloud and matches validated via the matches API where applicable. This means, all the screenings in scope have a status of CONFIRMED, DISMISSED or CLEAR.

### Screening Type

The following table outlines the various screening types available and their respective country coverage.

| Scope                | Description                                                                                                                                             | Coverage |
|----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|----------|
| WATCHLIST            | We will search your customer against our global watchlists. We will also highlight if your customer is Related or a Close Associate (RCA) of a watchlist or sanctioned entity, be it an individual or an organisation. | Global   |
| PEP                  | We will search your customer against our politically exposed persons (PEP) database. We will also highlight if your customer is Related or a Close Associate (RCA) of a PEP entity. | Global   |
| DISQUALIFIED_ENTITIES| We will search your customer against our disqualified entities database which also includes disqualified, banned and barred individuals and companies.  | Global   |
| ADVERSE_MEDIA        | We will search your customer against our adverse media database of hand-picked articles from trusted news outlets.                                        | Global   |

### Screening Result

| Screening Result     | Description                                                                                                                                            |
|----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| IN_PROGRESS          | Indicates the screening is still being processed by AmlCloud.                                                                                          |
| AWAITING_VALIDATION  | Indicates AmlCloud has found one or more potential matches against your customer. These matches will require manual validation using the Matches endpoint. |
| CONFIRMED            | Indicates at least one match has been confirmed using the Matches endpoint.                                                                            |
| DISMISSED            | Indicates that all the screening matches have been dismissed by you as they were not deemed to be genuine matches (i.e., false positives).             |
| CLEAR                | Indicates AmlCloud has not found your customer or any potential matches in the relevant databases, as per the scope you specified. Potential matches are determined by AmlCloud’s fuzzy scorecard logic and the pre-defined sensitivity thresholds. |


## Create a Screening

Definition


POST https://api.amlcloud.ai/v1/customers/{customer_id}/screenings/

Example Request

curl https://api.amlcloud.ai/v1/customers/{customer_id}/screenings \
    -H 'Authorization: Bearer test_api_token' \
    -H 'content-type: application/json' \
    -X POST \
    -d '[
        "PEP",
        "WATCHLIST",
        "DISQUALIFIED_ENTITIES"
    ]'

Example Response

{
    "id": "{SCREENING_ID}",
    "customer_id": "{CUSTOMER_ID}",
    "entity_name": "Jane Doe",
    "created_at": "2017-01-21T13:00:16Z",
    "updated_at": "2017-01-21T13:00:16Z",
    "scope": ["PEP", "WATCHLIST", "DISQUALIFIED_ENTITIES"],
    "status": "PENDING",
    "outcome": {
        "PEP": "CLEAR",
        "WATCHLIST": "AWAITING_VALIDATION",
        "DISQUALIFIED_ENTITIES": "CLEAR"
    }
}

Creates a new screening object.

Attributes

- scope (required): A list of the screenings to be performed.

## Retrieve a Screening

Definition

GET https://api.amlcloud.ai/v1/customers/{customer_id}/screenings/{screening_id}
Example Request


curl https://api.amlcloud.ai/v1/customers/{customer_id}/screenings/{screening_id} \
    -H 'Authorization: Bearer test_api_token' \
    -X GET

Example Response

{
    "id": "{SCREENING_ID}",
    "customer_id": "{CUSTOMER_ID}",
    "entity_name": "Jane Doe",
    "created_at": "2017-01-21T13:00:16Z",
    "updated_at": "2017-01-21T13:00:16Z",
    "scope": ["PEP", "WATCHLIST", "DISQUALIFIED_ENTITIES"],
    "status": "PENDING",
    "outcome": {
        "PEP": "CLEAR",
        "WATCHLIST": "AWAITING_VALIDATION",
        "DISQUALIFIED_ENTITIES": "CLEAR"
    }
}

Retrieves the details of an existing screening. You need to supply the unique customer and screening identifier.

Attributes

- customer_id (required): The unique identifier for the customer.
- screening_id (required): The unique identifier for the screening.

## List All Screenings for Customer
Definition

GET https://api.amlcloud.ai/v1/customers/{customer_id}/screenings

Lists all existing screenings for a given customer. The screenings are returned sorted by creation date, with the most recent screenings appearing first. In addition to the attributes listed on the pagination section, the following optional parameters can be used to refine the response.

Attributes

- created_after (optional): A “greater than” filter on the list based on the object created_at field.
- created_before (optional): A “less than” filter on the list based on the object created_at field.
- updated_after (optional): A “greater than” filter on the list based on the object updated_at field.
- updated_before (optional): A “less than” filter on the list based on the object updated_at field.
- scope (optional): An “equal” filter on the list based on the object scope field.
- status (optional): An “equal” filter on the list based on the object status field.

# Conclusion

This document serves as a detailed reference for the AmlCloud REST API, providing the necessary information to integrate and utilize the API effectively for automating KYC and AML processes. For any further assistance, please refer to the official AmlCloud documentation or contact their support team.
