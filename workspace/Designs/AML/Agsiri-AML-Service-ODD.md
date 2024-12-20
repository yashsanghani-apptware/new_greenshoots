# Ongoing Due Diligence (ODD) API
Agisiri AML allows you to meet your Ongoing Customer Due Diligence (ODD) commitments by providing you with the means to screen your customers regularly against our daily-refreshed databases and lists. The API allows you to create, update, and retrieve ODD instructions for each of your customers.

All ODD settings are at a customer level. Unlike regular screenings, ODD-triggered screenings will exclude any ODD-flagged matches you have previously dismissed, reducing false positives and the manual burden on compliance officers. If you disable an ODD instruction and then enable it again, the Agisiri AML KYC Engine will perform a full screening on the reinstated ODD run.

## ODD Object

Attributes:

id (string): The unique identifier for the ODD instruction.
created_at (datetime): The date and time when the ODD instruction was created.
updated_at (datetime): The date and time when the ODD instruction was updated.
scope (list screening type): The list of screening types to be performed as part of the ODD instruction.
frequency (string): The frequency at which an ODD instruction is executed. Valid values:
DAILY
WEEKLY
MONTHLY
active (boolean): Indicates whether an ODD instruction is enabled. Set to true to enable or false to disable.
Example Response:

{
    "id": "{ODD_ID}",
    "created_at": "2017-12-31T12:00:16Z",
    "updated_at": "2017-12-31T12:00:16Z",
    "scope": [
        "WATCHLIST",
        "ADVERSE_MEDIA"
    ],
    "frequency": "MONTHLY",
    "active": true
}

## Create an ODD
Definition:

POST https://api.amlcloud.ai/v1/customers/{customer_id}/odd

Example Request:

curl https://api.amlcloud.ai/v1/customers/{customer_id}/odd \
  -H 'Authorization: Bearer test_api_token' \
  -H 'content-type: application/json' \
  -X POST \
  -d '{
      "scope": ["WATCHLIST", "ADVERSE_MEDIA"],
      "frequency": "MONTHLY",
      "active": true
    }'
Example Response:

{
    "id": "{customer_id}",
    "created_at": "2017-12-31T12:00:16Z",
    "updated_at": "2017-12-31T12:00:16Z",
    "scope": [
       "WATCHLIST",
       "ADVERSE_MEDIA"
    ],
    "frequency": "MONTHLY",
    "active": true
}
Attributes:

scope (required): The list of screening types to be performed as part of the ODD instruction.
frequency (required): The frequency at which an ODD instruction is executed. Valid values:
DAILY
WEEKLY
MONTHLY
active (optional): Indicates whether an ODD instruction is enabled. Set to true to enable or false to disable.

## Retrieve an ODD
Definition:

GET https://api.amlcloud.ai/v1/customers/{customer_id}/odd/{odd_id}
Example Request:

curl https://api.amlcloud.ai/v1/customers/{customer_id}/odd/{odd_id} \
  -H 'Authorization: Bearer test_api_token' \
  -H 'content-type: application/json' \
  -X GET
Example Response:

{
    "id": "{ODD_ID}",
    "created_at": "2017-12-31T12:00:16Z",
    "updated_at": "2017-12-31T12:00:16Z",
    "scope": [
       "WATCHLIST",
       "ADVERSE_MEDIA"
    ],
    "frequency": "MONTHLY",
    "active": true
}
Attributes:

customer_id (required): The unique identifier for the customer.
odd_id (required): The unique identifier for the ODD.

## Retrieve an ODD Result
Definition:

GET https://api.amlcloud.ai/v1/customers/{customer_id}/odd/{odd_id}/results
Example Request:

curl https://api.amlcloud.ai/v1/customers/{customer_id}/odd/{odd_id}/results \
  -H 'Authorization: Bearer test_api_token' \
  -H 'content-type: application/json' \
  -X GET
Example Response:

{
  "content": [
    {
      "customer_id": "{CUSTOMER_ID}",
      "executed_at": "2018-01-15T12:00:15Z",
      "dataset_version": "55606f8e54dec6a456db52b426627cd72c904183",
      "screening_id": "{SCREENING_ID}"
    }
  ]
}
Attributes:

customer_id (required): The unique identifier for the customer.
odd_id (required): The unique identifier for the ODD.
Result Attributes
Attributes:

customer_id (string): The unique identifier for the customer.
screening_id (string): The unique identifier for the screening request created due to the execution of an ODD instruction.
dataset_version (string): The Agisiri AML dataset version used for the ODD run.
executed_at (datetime): The date and time when the ODD instruction was executed.

## Update an ODD
Definition:

plaintext
Copy code
PUT https://api.amlcloud.ai/v1/customers/{customer_id}/odd/{odd_id}
Example Request:

curl https://api.amlcloud.ai/v1/customers/{customer_id}/odd/{odd_id} \
  -H 'Authorization: Bearer test_api_token' \
  -H 'content-type: application/json' \
  -X PUT \
  -d '{
      "scope": ["WATCHLIST", "ADVERSE_MEDIA"],
      "frequency": "MONTHLY",
      "active": true
    }'
Example Response:

{
    "id": "{ODD_ID}",
    "created_at": "2017-12-31T12:00:16Z",
    "updated_at": "2017-12-31T12:02:48Z",
    "scope": [
       "WATCHLIST",
       "ADVERSE_MEDIA"
    ],
    "frequency": "MONTHLY",
    "active": true
}
Attributes:

customer_id (required): The unique identifier for the customer.
odd_id (required): The unique identifier for the ODD.
scope: The list of screening types to be performed as part of the ODD instruction.
frequency: The frequency at which an ODD instruction is executed. Valid values:
DAILY
WEEKLY
MONTHLY
active: Indicates whether an ODD instruction is enabled. Set to true to enable or false to disable.

## Partially Update an ODD
Definition:

PATCH https://api.amlcloud.ai/v1/customers/{customer_id}/odd/{odd_id}
Example Request:

curl https://api.amlcloud.ai/v1/customers/{customer_id}/odd/{odd_id} \
  -H 'Authorization: Bearer test_api_token' \
  -H 'content-type: application/json' \
  -X PATCH \
  -d '[
      {
          "op": "replace",
          "path": "/frequency",
          "value": "MONTHLY"
      }
  ]'
Note: Only fields to be updated should be provided in the request as a JSON patch object.

## Delete an ODD
Definition:

DELETE https://api.amlcloud.ai/v1/customers/{customer_id}/odd/{odd_id}
Example Request:

curl https://api.amlcloud.ai/v1/customers/{customer_id}/odd/{odd_id} \
 -H 'Authorization: Bearer test_api_token' \
 -X DELETE
Attributes:

customer_id (required): The unique identifier for the customer.
odd_id (required): The unique identifier for the ODD.

## List All ODDs
Definition:

GET https://api.amlcloud.ai/v1/customers/{customer_id}/odd
Attributes:

created_after (optional): A “greater than” filter on the list based on the object created_at field.
created_before (optional): A “less than” filter on the list based on the object created_at field.
updated_after (optional): A “greater than” filter on the list based on the object updated_at field.
updated_before (optional): A “less than” filter on the list based on the object updated_at field.
scope (optional): An “equal” filter on the list based on the object scope field.


# Search Screenings

Definition

GET https://api.amlcloud.ai/v1/search/screenings

Search for screenings across all existing customers. The screenings are returned sorted by creation date, with the most recent screenings appearing first. The following optional parameters can be used to refine the response.

Attributes

created_after (optional): A “greater than” filter on the list based on the object created_at field.
created_before (optional): A “less than” filter on the list based on the object created_at field.
updated_after (optional): A “greater than” filter on the list based on the object updated_at field.
updated_before (optional): A “less than” filter on the list based on the object updated_at field.
customer_ids (optional): A “equal” filter on the list based on the customer object id field. This can be a list.
scope (optional): An “equal” filter on the list based on the object scope field.
status (optional): An “equal” filter on the list based on the object status field.

## Matches
A screening request may result in one or multiple matches. A match object represents a potential match as determined by AmlCloud’s fuzzy scorecard logic and pre-defined thresholds.

The matches API allows you to retrieve and validate matches relating to a given screening request. The validation of a potential match refers to either confirmation or dismissal of the match once you have reviewed the details at hand.

Match Object
Attributes:

id (string): The unique identifier for the match.
created_at (datetime): The date and time when the match was created.
updated_at (datetime): The date and time when the match was last updated.
entity_type (string): The type of the matched entity. Values can be INDIVIDUAL or COMPANY.
validation_result (string): The result of the match's confirmation or dismissal process. Values can be AWAITING_VALIDATION, CONFIRMED, or DISMISSED.
match_type (list): The type of the match. Values can be:
SPECIAL_INTEREST_PERSON
SPECIAL_INTEREST_ENTITY
POLITICALLY_EXPOSED_PERSON
RELATIVE_OR_CLOSE_ASSOCIATE
BANNED_OR_DISQUALIFIED_PERSON
BANNED_OR_DISQUALIFIED_ENTITY
ADVERSE_MEDIA_PERSON
ADVERSE_MEDIA_ENTITY
names (list name): The matched individual or company names.
note (string): Additional notes if available on matched individual or company. When none available, this will be null.
documents (list document): The documents associated with matched individual or company. When not available, this will be null.
addresses (list address): The addresses associated with the matched individual or company. When not available, this will be null.
scorecard (hash, scorecard object): Provides a breakdown of scorecard results for potential matches.
references (list reference): The reference of listed information. When not available, this will be null.
associated_countries (list): The matched individual country of association. This will be the three-letter standard or non-standard country ISO code. When not available, this will be null.
jurisdiction (list): The matched individual associated jurisdiction. This will be the three-letter standard or non-standard country ISO code. When not available, this will be null.
countries_of_reported_allegation (list): The matched individual country of allegation. This will be the three-letter standard or non-standard country ISO code. When not available, this will be null.
countries_of_citizenship (INDIVIDUAL list): The matched individual country of citizenship. This will be the three-letter standard or non-standard country ISO code. When not available, this will be null.
countries_of_registration (COMPANY list): The matched company country of registration. This will be the three-letter standard or non-standard country ISO code. When not available, this will be null.
countries_of_ownership (COMPANY list): The matched company country of ownership. This will be the three-letter standard or non-standard country ISO code. When not available, this will be null.
countries_of_affiliation (COMPANY list): The matched company country of affiliation. This will be the three-letter standard or non-standard country ISO code. When not available, this will be null.
countries_of_residence (INDIVIDUAL list): The matched individual country of residence. This will be the three-letter standard or non-standard country ISO code. When not available, this will be null.
dobs (INDIVIDUAL list structured date): The recorded date of births of matched individual. When not available, this will be null.
gender (string): The matched individual gender. Values can be MALE, FEMALE, UNKNOWN, or OTHER.
birth_places (INDIVIDUAL list): The matched individual potential birth places. When not available, this will be null.
occupations (INDIVIDUAL list occupation): The matched individual occupation history. When not available, this will be null.
image_uri (INDIVIDUAL string): The URI to the image of the matched individual. When not available, this will be null.
deceased (INDIVIDUAL boolean): This will be set to true if the matched individual is deceased, false when alive, or null when unknown.
incorporation_number (COMPANY string): The matched company incorporation number. When not available, this will be null.
Example Response:

{
    "id": "{MATCH_ID}",
    "created_at": "2017-01-21T15:00:16Z",
    "updated_at": "2017-01-21T15:00:16Z",
    "entity_type": "INDIVIDUAL",
    "match_type": ["SPECIAL_INTEREST_PERSON"],
    "validation_result": "AWAITING_VALIDATION",
    "names": [
        {
            "name_type": "PRIMARY_NAME",
            "first_name": "John",
            "last_name": "Doe"
        },
        {
            "name_type": "ALSO_KNOWN_AS",
            "first_name": "Jo",
            "last_name": "Doe"
        }
    ],
    "documents": [
        {
            "type": "PASSPORT",
            "number": "A123456789"
        },
        {
            "type": "DRIVING_LICENSE",
            "number": "B987654321",
            "note": "Registered by Customs Office"
        }
    ],
    "addresses": [
        {
            "line": "Middle house",
            "city": "Forest Hill",
            "Country": "GBR"
        },
        {
            "line": "Old house, main street",
            "city": "Aldgate",
            "Country": "GBR"
        }
    ],
    "references": [
        {
            "name": "OFAC Specially Designated National",
            "status": "CURRENT",
            "from_date": {
                "month": "02",
                "year": "2015"
            }
        }
    ],
    "countries_of_reported_allegation": [
        "GBR",
        "DEU"
    ],
    "countries_of_citizenship": [
        "GBR"
    ],
    "dobs": [
        {
            "month": "01",
            "year": "1980"
        }
    ],
    "gender": "MALE",
    "image_uri": [
        "http://example.example/images/sample1.jpg",
        "http://example.example/images/sample2.jpg"
    ],
    "deceased": false,
    "scorecard": {
        "overall_score": 91.85,
        "breakdown": [
            {
                "field_name": "name",
                "field_value": "John Doe",
                "score": 100,
                "risk_weight": 45,
                "risk_weighted_score": 45,
                "normalised_score": 33.33
            },
            {
                "field_name": "dob",
                "field_value": "01/1980",
                "score": 90,
                "risk_weight": 20,
                "risk_weighted_score": 18,
                "normalised_score": 13.33
            },
            {
                "field_name": "gender",
                "field_value": "MALE",
                "score": 100,
                "risk_weight": 10,
                "risk_weighted_score": 10,
                "normalised_score": 7.41
            },
            {
                "field_name": "address",
                "field_value": "Old house st., Aldgate, GBR",
                "score": 85,
                "risk_weight": 60,
                "risk_weighted_score": 51,
                "normalised_score": 37.78,
                "breakdown": [
                    {
                        "field_name": "country",
                        "field_value": "GBR",
                        "score": 100,
                        "risk_weight": 15,
                        "risk_weighted_score": 15,
                        "normalised_score": 25
                    },
                    {
                        "field_name": "city",
                        "field_value": "Aldgate",
                        "score": 100,
                        "risk_weight": 15,
                        "risk_weighted_score": 15,
                        "normalised_score": 25
                    },
                    {
                        "field_name": "line",
                        "field_value": "Old house st.",
                        "score": 70,
                        "risk_weight": 30,
                        "risk_weighted_score": 21,
                        "normalised_score": 35
                    }
                ]
            }
        ]
    }
}

## Retrieve a Match
Definition:

GET https://api.amlcloud.ai/v1/customers/{customer_id}/screenings/{screening_id}/matches/{match_id}

Example Request:

curl https://api.amlcloud.ai/v1/customers/{customer_id}/screenings/{screening_id}/matches/{match_id} \
    -H 'Authorization: Bearer test_api_token' \
    -X GET
Example Response:

{
    "id": "{MATCH_ID}",
    "created_at": "2017-01-21T15:00:16Z",
    "updated_at": "2017-01-21T15:00:16Z",
    "entity_type": "INDIVIDUAL",
    "match_type": ["SPECIAL_INTEREST_PERSON"],
    "validation_result": "AWAITING_VALIDATION",
    "names": [
        {
            "name_type": "PRIMARY_NAME",
            "first_name": "John",
            "last_name": "Doe"
        },
        {
            "name_type": "ALSO_KNOWN_AS",
            "first_name": "Jo",
            "last_name": "Doe"
        }
    ],
    "documents": [
        {
            "type": "PASSPORT",
            "number": "A123456789"
        },
        {
            "type": "DRIVING_LICENSE",
            "number": "B987654321",
            "note": "Registered by Customs Office"
        }
    ],
    "addresses": [
        {
            "line": "Middle house",
            "city": "Forest Hill",
            "Country": "GBR"
        },
        {
            "line": "Old house, main street",
            "city": "Aldgate",
            "Country": "GBR"
        }
    ],
    "references": [
        {
            "name": "OFAC Specially Designated National",
            "status": "CURRENT",
            "from_date": {
                "month": "02",
                "year": "2015"
            }
        }
    ],
    "countries_of_reported_allegation": [
        "GBR",
        "DEU"
    ],
    "countries_of_citizenship": [
        "GBR"
    ],
    "dobs": [
        {
            "month": "01",
            "year": "1980"
        }
    ],
    "gender": "MALE",
    "image_uri": [
        "http://example.example/images/sample1.jpg",
        "http://example.example/images/sample2.jpg"
    ],
    "deceased": false,
    "scorecard": {
        "overall_score": 91.85,
        "breakdown": [
            {
                "field_name": "name",
                "field_value": "John Doe",
                "score": 100,
                "risk_weight": 45,
                "risk_weighted_score": 45,
                "normalised_score": 33.33
            },
            {
                "field_name": "dob",
                "field_value": "01/1980",
                "score": 90,
                "risk_weight": 20,
                "risk_weighted_score": 18,
                "normalised_score": 13.33
            },
            {
                "field_name": "gender",
                "field_value": "MALE",
                "score": 100,
                "risk_weight": 10,
                "risk_weighted_score": 10,
                "normalised_score": 7.41
            },
            {
                "field_name": "address",
                "field_value": "Old house st., Aldgate, GBR",
                "score": 85,
                "risk_weight": 60,
                "risk_weighted_score": 51,
                "normalised_score": 37.78,
                "breakdown": [
                    {
                        "field_name": "country",
                        "field_value": "GBR",
                        "score": 100,
                        "risk_weight": 15,
                        "risk_weighted_score": 15,
                        "normalised_score": 25
                    },
                    {
                        "field_name": "city",
                        "field_value": "Aldgate",
                        "score": 100,
                        "risk_weight": 15,
                        "risk_weighted_score": 15,
                        "normalised_score": 25
                    },
                    {
                        "field_name": "line",
                        "field_value": "Old house st.",
                        "score": 70,
                        "risk_weight": 30,
                        "risk_weighted_score": 21,
                        "normalised_score": 35
                    }
                ]
            }
        ]
    }
}
Attributes:

customer_id (required): The unique identifier for the customer.
screening_id (required): The unique identifier for the screening.
match_id (required): The unique identifier for the match.

## List All Matches
Definition:

GET https://api.amlcloud.ai/v1/customers/{customer_id}/screenings/{screening_id}/matches
Example Request:

curl https://api.amlcloud.ai/v1/customers/{customer_id}/screenings/{screening_id}/matches \
    -H 'Authorization: Bearer test_api_token' \
    -X GET
Lists all existing matches. The matches are returned sorted by overall score, with the highest scoring matches appearing first. In addition to the attributes listed on the pagination section, the following optional parameters can be used to refine the response.

Attributes:

match_type (optional): An “equal” filter on the list based on the object match_type field.
validation_result (optional): An “equal” filter on the list based on the object validation_result field.
Confirm a Match
Definition:

POST https://api.amlcloud.ai/v1/customers/{customer_id}/screenings/{screening_id}/matches/{match_id}/confirm
Example Request:

curl https://api.amlcloud.ai/v1/customers/{customer_id}/screenings/{screening_id}/matches/{match_id}/confirm \
    -X POST
Confirms a customer match. You need to supply the unique customer, screening, and match identifier.

Attributes:

customer_id (required): The unique identifier for the customer.
screening_id (required): The unique identifier for the screening.
match_id (required): The unique identifier for the match.
Dismiss a Match
Definition:

GET https://api.amlcloud.ai/v1/customers/{customer_id}/screenings/{screening_id}/matches/{match_id}/dismiss
Example Request:

curl https://api.amlcloud.ai/v1/customers/{customer_id}/screenings/{screening_id}/matches/{match_id}/dismiss \
    -H 'Authorization: Bearer test_api_token' \
    -X POST
Dismisses a customer match. You need to supply the unique customer, screening, and match identifier.

Attributes:

customer_id (required): The unique identifier for the customer.
screening_id (required): The unique identifier for the screening.
match_id (required): The unique identifier for the match.

## Confirm Multiple Matches
Definition:

POST https://api.amlcloud.ai/v1/customers/{customer_id}/screenings/{screening_id}/matches/confirm
Example Request:

curl https://api.amlcloud.ai/v1/customers/{customer_id}/screenings/{screening_id}/matches/confirm \
    -H 'Authorization: Bearer test_api_token' \
    -X POST \
    -d '[
            "{screening_id_1}",
            "{screening_id_2}"
    ]'
Bulk confirms multiple customer matches. You need to supply the unique customer, screening, and match identifiers.

Attributes:

customer_id (required): The unique identifier for the customer.
screening_id (required): The unique identifier for the screening.
match_ids (required): The list of match IDs to be confirmed in bulk.

## Dismiss Multiple Matches
Definition:

POST https://api.amlcloud.ai/v1/customers/{customer_id}/screenings/{screening_id}/matches/dismiss
Example Request:

curl https://api.amlcloud.ai/v1/customers/{customer_id}/screenings/{screening_id}/matches/dismiss \
    -H 'Authorization: Bearer test_api_token' \
    -X POST \
    -d '[
            "{screening_id_1}",
            "{screening_id_2}"
    ]'
Bulk dismisses multiple customer matches. You need to supply the unique customer, screening, and match identifiers.

Attributes:

customer_id (required): The unique identifier for the customer.
screening_id (required): The unique identifier for the screening.
match_ids (required): The list of match IDs to be dismissed in bulk.

# Associations
The API allows you to retrieve entities associated with a given match. The associated entities can be other individuals or companies.

## Association Object
Attributes:

id (string): The unique identifier for the associated individual or company.
created_at (datetime): The date and time when the associated entity was created.
updated_at (datetime): The date and time when the associated entity was updated.
entity_type (string): The type of the associated entity. Values can be INDIVIDUAL or COMPANY.
match_type (list): The type of the match. Values can be:
SPECIAL_INTEREST_PERSON
SPECIAL_INTEREST_ENTITY
POLITICALLY_EXPOSED_PERSON
RELATIVE_OR_CLOSE_ASSOCIATE
BANNED_OR_DISQUALIFIED_PERSON
BANNED_OR_DISQUALIFIED_ENTITY
ADVERSE_MEDIA_PERSON
ADVERSE_MEDIA_ENTITY
association_type (string): The type of association. Values can be:
WIFE
HUSBAND
BROTHER
SISTER
SON
DAUGHTER
MOTHER
FATHER
COUSIN
STEP_SON
STEP_DAUGHTER
BROTHER_IN_LAW
SISTER_IN_LAW
UNCLE
AUNT
MOTHER_IN_LAW
FATHER_IN_LAW
GRANDFATHER
GRANDMOTHER
SON_IN_LAW
DAUGHTER_IN_LAW
NIECE
NEPHEW
GRANDSON
GRANDDAUGHTER
STEPFATHER
STEPMOTHER
BUSINESS_ASSOCIATE
FRIEND
FINANCIAL_ADVISER
LEGAL_ADVISER
COLLEAGUE
AGENT_OR_REPRESENTATIVE
EMPLOYEE
ASSOCIATE
CHILD
FAMILY_MEMBER
POLITICAL_ADVISER
SENIOR_OFFICIAL
UNMARRIED_PARTNER
SAME_SEX_SPOUSE
EMPLOYER
SHAREHOLDER_OR_OWNER
ASSOCIATED_SPECIAL_INTEREST_PERSON
PARENT_COMPANY
SUBSIDIARY
ASSET
status (string): The association status. This will be set as CURRENT if the association is in effect, or PREVIOUS if the association has ceased to exist. When not available, this will be null.
direction (string): The direction of the association. This will be set as OUTBOUND when the association type is expressed as the relationship of a match towards the associate (e.g. FATHER), or INBOUND when expressed from associate towards a match (e.g. SON). Both directions will always be returned.
names (list name): The associated individual or company name.
note (string): Additional notes if available on the associated individual or company. When none available, this will be null.
documents (list document): The documents associated with the individual or company. When not available, this will be null.
addresses (list address): The associated individual or company addresses. When not available, this will be null.
references (list reference): The reference of listed information. When not available, this will be null.
associated_countries (list): The associated individual or company country of association. This will be the three-letter standard or non-standard country ISO code. When not available, this will be null.
jurisdiction (list): The associated individual or company associated jurisdiction. This will be the three-letter standard or non-standard country ISO code. When not available, this will be null.
countries_of_reported_allegation (list): The associated individual or company country of allegation. This will be the three-letter standard or non-standard country ISO code. When not available, this will be null.
countries_of_citizenship (INDIVIDUAL list): The associated individual country of citizenship. This will be the three-letter country ISO code. When not available, this will be null.
countries_of_registration (COMPANY list): The associated company country of registration. This will be the three-letter country ISO code. When not available, this will be null.
countries_of_ownership (COMPANY list): The associated company country of ownership. This will be the three-letter country ISO code. When not available, this will be null.
countries_of_affiliation (COMPANY list): The associated company country of affiliation. This will be the three-letter country ISO code. When not available, this will be null.
countries_of_residence (INDIVIDUAL list): The associated individual country of residence. This will be the three-letter country ISO code. When not available, this will be null.
dobs (INDIVIDUAL list structured date): The recorded date of births of the associated individual. When not available, this will be null.
gender (string): The associated individual gender. Values can be MALE, FEMALE, UNKNOWN, or OTHER.
birth_places (INDIVIDUAL list): The associated individual potential birth places. When not available, this will be null.
countries_of_citizenship (INDIVIDUAL list): The associated individual country of citizenship. This will be the three-letter country ISO code. When not available, this will be null.
countries_of_residence (INDIVIDUAL AND COMPANY list): The associated individual country of residence. This will be the three-letter country ISO code. When not available, this will be null.
occupations (INDIVIDUAL list occupation): The associated individual occupation history. When not available, this will be null.
image_uri (INDIVIDUAL string): The URI to the image of the associated individual. When not available, this will be null.
deceased (INDIVIDUAL boolean): This will be set to true if the associated individual is deceased, false when alive, or null when unknown.
incorporation_number (COMPANY string): The associated company incorporation number. When not available, this will be null.

Example Response:

{
    "id": "{ASSOCIATION_ID}",
    "created_at": "2017-01-21T15:00:16Z",
    "updated_at": "2017-01-21T15:00:16Z",
    "entity_type": "INDIVIDUAL",
    "match_type": ["RELATIVE_OR_CLOSE_ASSOCIATE"],
    "association_type": "WIFE",
    "direction": "OUTBOUND",
    "status": "CURRENT",
    "names": [
        {
            "name_type": "PRIMARY_NAME",
            "first_name": "Sue",
            "last_name": "Doe"
        }
    ],
    "addresses": [
        {
            "line": "Middle house",
            "city": "Forest Hill",
            "Country": "GBR"
        },
        {
            "line": "Old house, main street",
            "city": "Aldgate",
            "Country": "GBR"
        }
    ],
    "image_uri": [
        "http://example.example/images/sample3.jpg"
    ]
}

## Retrieve an Association
Definition:

GET https://api.amlcloud.ai/v1/customers/{customer_id}/screenings/{screening_id}/matches/{match_id}/associations/{association_id}
Example Request:

curl https://api.amlcloud.ai/v1/customers/{customer_id}/screenings/{screening_id}/matches/{match_id}/associations/{association_id} \
    -H 'Authorization: Bearer test_api_token' \
    -X GET
Example Response:

{
    "id": "{ASSOCIATION_ID}",
    "created_at": "2017-01-21T15:00:16Z",
    "updated_at": "2017-01-21T15:00:16Z",
    "entity_type": "INDIVIDUAL",
    "match_type": ["RELATIVE_OR_CLOSE_ASSOCIATE"],
    "association_type": "WIFE",
    "direction": "OUTBOUND",
    "status": "CURRENT",
    "names": [
        {
            "name_type": "PRIMARY_NAME",
            "first_name": "Sue",
            "last_name": "Doe"
        }
    ],
    "addresses": [
        {
            "line": "Middle house",
            "city": "Forest Hill",
            "Country": "GBR"
        },
        {
            "line": "Old house, main street",
            "city": "Aldgate",
            "Country": "GBR"
        }
    ],
    "image_uri": [
        "http://example.example/images/sample3.jpg"
    ]
}

Attributes:

customer_id (required): The unique identifier for the customer.
screening_id (required): The unique identifier for the screening.
match_id (required): The unique identifier for the match.
association_id (required): The unique identifier for the association.

## List All Associations
Definition:

GET https://api.amlcloud.ai/v1/customers/{customer_id}/screenings/{screening_id}/matches/{match_id}/associations
Example Request:

curl https://api.amlcloud.ai/v1/customers/{customer_id}/screenings/{screening_id}/matches/{match_id}/associations \
    -H 'Authorization: Bearer test_api_token' \
    -X GET
Lists all existing associations. The associations are returned sorted by creation date, with the most recent associations appearing first. In addition to the attributes listed on the pagination section, the following optional parameters can be used to refine the response.

Attributes:

entity_type (optional): An “equal” filter on the list based on the object entity_type field.
association_type (optional): An “equal” filter on the list based on the object association_type field.
status (optional): An “equal” filter on the list based on the object status field.
