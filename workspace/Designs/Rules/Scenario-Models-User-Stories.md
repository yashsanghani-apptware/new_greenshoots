# User Stories and Scenarios for the Scenario Service

## User Story 1: Retrieve Scenario Models
As a compliance officer, I want to retrieve the list of scenario models with their execution status so that I can monitor and manage them.

### Scenario 1: Successful Retrieval of Scenario Models

Given I am a compliance officer.
When I send a GET request to the /scenarioModels endpoint.
Then the system retrieves and returns the list of scenario models with their execution status.
And I can see details such as scenario model ID, name, version, created date, modified date, and execution status.

### Scenario 2: No Scenario Models Available

Given I am a compliance officer.
When I send a GET request to the /scenarioModels endpoint.
And there are no scenario models available.
Then the system returns an empty list.

## User Story 2: Retrieve Scenario Model Details
As a compliance officer, I want to retrieve the details of a specific scenario model so that I can understand its configuration and status.

### Scenario 1: Successful Retrieval of Scenario Model Details

Given I am a compliance officer.
When I send a GET request to the /scenarioModels/{scenarioModelId} endpoint with a valid scenario model ID.
Then the system retrieves and returns the details of the specified scenario model.
And I can see details such as scenario IDs, names, descriptions, created date, modified date, and execution status.

### Scenario 2: Invalid Scenario Model ID

Given I am a compliance officer.
When I send a GET request to the /scenarioModels/{scenarioModelId} endpoint with an invalid scenario model ID.
Then the system returns an error message indicating that the scenario model ID is not found.

## User Story 3: Create or Update Scenario Model
As a compliance officer, I want to create or update a scenario model so that I can define or modify its configuration.

### Scenario 1: Successful Creation of Scenario Model

Given I am a compliance officer.
When I send a POST request to the /scenarioModels endpoint with valid scenario model details.
Then the system creates the scenario model and returns the details of the created scenario model.

### Scenario 2: Successful Update of Scenario Model

Given I am a compliance officer.
When I send a PUT request to the /scenarioModels/{scenarioModelId} endpoint with valid scenario model details.
Then the system updates the scenario model and returns the details of the updated scenario model.

### Scenario 3: Invalid Data for Scenario Model Creation or Update

Given I am a compliance officer.
When I send a POST or PUT request to the /scenarioModels or /scenarioModels/{scenarioModelId} endpoint with invalid data.
Then the system returns an error message indicating the validation issues.

## User Story 4: Delete Scenario Model
As a compliance officer, I want to delete a scenario model so that I can remove obsolete or incorrect configurations.

### Scenario 1: Successful Deletion of Scenario Model

Given I am a compliance officer.
When I send a DELETE request to the /scenarioModels/{scenarioModelId} endpoint with a valid scenario model ID.
Then the system deletes the scenario model and returns a success response.

### Scenario 2: Invalid Scenario Model ID for Deletion

Given I am a compliance officer.
When I send a DELETE request to the /scenarioModels/{scenarioModelId} endpoint with an invalid scenario model ID.
Then the system returns an error message indicating that the scenario model ID is not found.

## User Story 5: Execute/Schedule/Update Schedule for Scenario Model
As a compliance officer, I want to execute, schedule, or update the schedule for a scenario model so that I can manage its execution.

### Scenario 1: Successful Execution of Scenario Model

Given I am a compliance officer.
When I send a request to execute a scenario model.
Then the system initiates the execution and returns the execution status.

### Scenario 2: Successful Scheduling of Scenario Model

Given I am a compliance officer.
When I send a request to schedule a scenario model.
Then the system schedules the scenario model and returns the schedule details.

### Scenario 3: Successful Update of Scenario Model Schedule

Given I am a compliance officer.
When I send a request to update the schedule of a scenario model.
Then the system updates the schedule and returns the updated schedule details.

## User Story 6: Retrieve Scenario Model Flows
As a compliance officer, I want to retrieve the flows for a specific scenario model so that I can monitor its execution.

### Scenario 1: Successful Retrieval of Scenario Model Flows

Given I am a compliance officer.
When I send a GET request to the /scenarioModelFlows endpoint with a valid scenario model ID.
Then the system retrieves and returns the list of flows for the specified scenario model.

### Scenario 2: Invalid Scenario Model ID for Flow Retrieval

Given I am a compliance officer.
When I send a GET request to the /scenarioModelFlows endpoint with an invalid scenario model ID.
Then the system returns an error message indicating that the scenario model ID is not found.

## User Story 7: Retrieve Scenario List
As a compliance officer, I want to retrieve the list of scenarios available in the system so that I can manage and monitor them.

### Scenario 1: Successful Retrieval of Scenario List

Given I am a compliance officer.
When I send a GET request to the /scenarios endpoint.
Then the system retrieves and returns the list of scenarios available in the system.

## User Story 8: Retrieve Thresholds for Scenario Model
As a compliance officer, I want to retrieve the list of thresholds for a specific scenario model so that I can monitor and manage them.

### Scenario 1: Successful Retrieval of Thresholds for Scenario Model

Given I am a compliance officer.
When I send a GET request to the /thresholds endpoint with a valid scenario model ID.
Then the system retrieves and returns the list of thresholds for the specified scenario model.

### Scenario 2: Invalid Scenario Model ID for Threshold Retrieval

Given I am a compliance officer.
When I send a GET request to the /thresholds endpoint with an invalid scenario model ID.
Then the system returns an error message indicating that the scenario model ID is not found.

## User Story 9: Add Thresholds to Scenario Model
As a compliance officer, I want to add new thresholds to a specific scenario model so that I can define threshold parameters.

### Scenario 1: Successful Addition of Thresholds

Given I am a compliance officer.
When I send a POST request to the /thresholds endpoint with valid threshold details.
Then the system adds the thresholds to the specified scenario model and returns the details of the added thresholds.

### Scenario 2: Invalid Data for Adding Thresholds

Given I am a compliance officer.
When I send a POST request to the /thresholds endpoint with invalid threshold details.
Then the system returns an error message indicating the validation issues.

## User Story 10: Update Thresholds for Scenario Model
As a compliance officer, I want to update existing thresholds for a specific scenario model so that I can modify threshold parameters.

### Scenario 1: Successful Update of Thresholds

Given I am a compliance officer.
When I send a PUT request to the /thresholds endpoint with valid threshold details.
Then the system updates the thresholds for the specified scenario model and returns the details of the updated thresholds.

### Scenario 2: Invalid Data for Updating Thresholds

Given I am a compliance officer.
When I send a PUT request to the /thresholds endpoint with invalid threshold details.
Then the system returns an error message indicating the validation issues.

## User Story 11: Delete Thresholds for Scenario Model
As a compliance officer, I want to delete thresholds from a specific scenario model so that I can remove obsolete or incorrect threshold parameters.

### Scenario 1: Successful Deletion of Thresholds

Given I am a compliance officer.
When I send a DELETE request to the /thresholds endpoint with valid threshold IDs.
Then the system deletes the thresholds from the specified scenario model and returns a success response.

### Scenario 2: Invalid Threshold IDs for Deletion

Given I am a compliance officer.
When I send a DELETE request to the /thresholds endpoint with invalid threshold IDs.
Then the system returns an error message indicating that the threshold IDs are not found.

## User Story 12: Retrieve Data Sets for Scenario Model
As a compliance officer, I want to retrieve the list of data sets for a specific scenario model so that I can manage and monitor the data used in scenarios.

### Scenario 1: Successful Retrieval of Data Sets for Scenario Model

Given I am a compliance officer.
When I send a GET request to the /dataSets endpoint with a valid scenario model ID.
Then the system retrieves and returns the list of data sets for the specified scenario model.

### Scenario 2: Invalid Scenario Model ID for Data Set Retrieval

Given I am a compliance officer.
When I send a GET request to the /dataSets endpoint with an invalid scenario model ID.
Then the system returns an error message indicating that the scenario model ID is not found.

## User Story 13: Add Data Set Entries to Scenario Model
As a compliance officer, I want to add new data set entries to a specific scenario model so that I can define the data used in scenarios.

### Scenario 1: Successful Addition of Data Set Entries

Given I am a compliance officer.
When I send a POST request to the /dataSets endpoint with valid data set entry details.
Then the system adds the data set entries to the specified scenario model and returns the details of the added data set entries.

### Scenario 2: Invalid Data for Adding Data Set Entries

Given I am a compliance officer.
When I send a POST request to the /dataSets endpoint with invalid data set entry details.
Then the system returns an error message indicating the validation issues.

## User Story 14: Update Data Set Entries for Scenario Model
As a compliance officer, I want to update existing data set entries for a specific scenario model so that I can modify the data used in scenarios.

### Scenario 1: Successful Update of Data Set Entries

Given I am a compliance officer.
When I send a PUT request to the /dataSets endpoint with valid data set entry details.
Then the system updates the data set entries for the specified scenario model and returns the details of the updated data set entries.

### Scenario 2: Invalid Data for Updating Data Set Entries

Given I am a compliance officer.
When I send a PUT request to the /dataSets endpoint with invalid data set entry details.
Then the system returns an error message indicating the validation issues.

## User Story 15: Delete Data Set Entries for Scenario Model
As a compliance officer, I want to delete data set entries from a specific scenario model so that I can remove obsolete or incorrect data entries.

### Scenario 1: Successful Deletion of Data Set Entries

Given I am a compliance officer.
When I send a DELETE request to the /dataSets endpoint with valid data set entry IDs.
Then the system deletes the data set entries from the specified scenario model and returns a success response.

### Scenario 2: Invalid Data Set Entry IDs for Deletion

Given I am a compliance officer.
When I send a DELETE request to the /dataSets endpoint with invalid data set entry IDs.
Then the system returns an error message indicating that the data set entry IDs are not found.