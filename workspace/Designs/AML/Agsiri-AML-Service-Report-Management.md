# Reports Management API
Reports are auto-generated when a screening check is complete. The API allows you to retrieve and download reports in any of the supported formats, such as PDF. This document provides detailed descriptions of the report object, its attributes, and examples of API requests and responses.

Report Object

Attributes:

id (string): The unique identifier for the report.
created_at (datetime): The date and time when the report was created.
name (string): The name of the report.
type (string): The report type. Valid values are:

SCREENING_REPORT
parameters (map): A key-value map of parameters defined for the specified report type.
Example Response:

{
    "id": "{REPORT_ID}",
    "name": "My first report",
    "type": "SCREENING_REPORT",
    "parameters": {
        "screening_id": "{SCREENING_ID}"
    },
    "created_at": "2018-02-11T12:00:16Z"
}
Report Type
Each report type is associated with its own set of parameters, passed in a key-value format:

Report Type	Parameters	Description
SCREENING_REPORT	screening_id (string)	Generates a report for a completed screening request.

## Retrieve a Report
Definition:

GET https://api.amlcloud.ai/v1/reports/{report_id}
Example Request:

curl https://api.amlcloud.ai/v1/reports/{report_id} \
    -H 'Authorization: Bearer test_api_token' \
    -X GET
Example Response:

{
    "id": "{REPORT_ID}",
    "name": "My first report",
    "type": "SCREENING_REPORT",
    "parameters": {
        "screening_id": "{SCREENING_ID}"
    },
    "created_at": "2018-02-11T12:00:16Z"
}
Attributes:

report_id (required): The unique identifier for the report.

## Download a Report
Definition:

GET https://api.amlcloud.ai/v1/reports/{report_id}/{extension}/download
Example Request:

curl https://api.amlcloud.ai/v1/reports/{report_id}/pdf/download \
    -H 'Authorization: Bearer test_api_token' \
    -X GET

Attributes:

report_id (required): The unique identifier for the report.
extension (required): The required format for the report. Valid values are:
PDF

## List All Reports
Definition:

GET https://api.amlcloud.ai/v1/reports
Attributes:

created_after (optional): A “greater than” filter on the list based on the object created_at field.
created_before (optional): A “less than” filter on the list based on the object created_at field.
type (optional): An “equal” filter on the list based on the object type field.
