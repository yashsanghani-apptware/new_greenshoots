# User Stories and Scenarios for Farm Service

## User Stories
As a farm manager, I want to create a new farm entry in the system so that I can manage its information and share issuance.

### Scenario: Creating a new farm entry

Given I am a farm manager
When I navigate to the farm creation page
And I provide all the required information about the farm
And I submit the form
Then a new farm entry should be created in the system
And I should see the newly created farm details
As a farm manager, I want to update an existing farm’s information so that I can keep the farm details accurate and current.

### Scenario: Updating an existing farm entry

Given I am a farm manager
And I have a farm that needs updated information
When I navigate to the farm's edit page
And I modify the necessary details
And I submit the form
Then the farm's information should be updated in the system
And I should see the updated farm details
As a farm manager, I want to view a list of all farms so that I can manage and review all available farms in the system.

### Scenario: Viewing a list of all farms

Given I am a farm manager
When I navigate to the farms listing page
Then I should see a list of all farms available in the system
As a farm manager, I want to view the details of a particular farm so that I can manage its specific information and track its status.

### Scenario: Viewing a particular farm's details

Given I am a farm manager
And I have the ID of a specific farm
When I navigate to the farm's detail page
Then I should see the complete details of that farm
As a farm manager, I want to delete a farm that is no longer needed so that the system remains clean and up-to-date.

### Scenario: Deleting a farm

Given I am a farm manager
And I have a farm that needs to be deleted
When I navigate to the farm's management page
And I initiate the delete action
Then the farm should be removed from the system
And I should see a confirmation message
As a due diligence officer, I want to add or update the soil information of a farm so that the farm's due diligence section is comprehensive and up-to-date.

### Scenario: Adding or updating soil information

Given I am a due diligence officer
And I have soil information that needs to be added or updated for a farm
When I navigate to the farm's due diligence section
And I provide the soil information details
And I submit the update
Then the soil information should be updated in the farm's due diligence section
And I should see the updated information
As a due diligence officer, I want to add or update the financial information of a farm so that the farm's due diligence section is comprehensive and up-to-date.

### Scenario: Adding or updating financial information

Given I am a due diligence officer
And I have financial information that needs to be added or updated for a farm
When I navigate to the farm's due diligence section
And I provide the financial information details
And I submit the update
Then the financial information should be updated in the farm's due diligence section
And I should see the updated information
As a due diligence officer, I want to add or update the crop information of a farm so that the farm's due diligence section is comprehensive and up-to-date.

### Scenario: Adding or updating crop information

Given I am a due diligence officer
And I have crop information that needs to be added or updated for a farm
When I navigate to the farm's due diligence section
And I provide the crop information details
And I submit the update
Then the crop information should be updated in the farm's due diligence section
And I should see the updated information
As a due diligence officer, I want to add or update other relevant information of a farm so that the farm's due diligence section is comprehensive and up-to-date.

### Scenario: Adding or updating other information

Given I am a due diligence officer
And I have other relevant information that needs to be added or updated for a farm
When I navigate to the farm's due diligence section
And I provide the other information details
And I submit the update
Then the other information should be updated in the farm's due diligence section
And I should see the updated information

## Scenarios

### Scenario: Creating a new farm entry

Given I am a farm manager
When I navigate to the farm creation page
And I provide all the required information about the farm (listing_id, name, address, location, property_description, main_picture, images, videos, maps, parcel_information)
And I submit the form
Then a new farm entry should be created in the system
And I should see the newly created farm details

### Scenario: Updating an existing farm entry

Given I am a farm manager
And I have a farm that needs updated information
When I navigate to the farm's edit page
And I modify the necessary details (e.g., address, property_description, images)
And I submit the form
Then the farm's information should be updated in the system
And I should see the updated farm details

### Scenario: Viewing a list of all farms

Given I am a farm manager
When I navigate to the farms listing page
Then I should see a list of all farms available in the system

### Scenario: Viewing a particular farm's details

Given I am a farm manager
And I have the ID of a specific farm
When I navigate to the farm's detail page
Then I should see the complete details of that farm

### Scenario: Deleting a farm

Given I am a farm manager
And I have a farm that needs to be deleted
When I navigate to the farm's management page
And I initiate the delete action
Then the farm should be removed from the system
And I should see a confirmation message

### Scenario: Adding or updating soil information

Given I am a due diligence officer
And I have soil information that needs to be added or updated for a farm
When I navigate to the farm's due diligence section
And I provide the soil information details (e.g., documents, maps)
And I submit the update
Then the soil information should be updated in the farm's due diligence section
And I should see the updated information

### Scenario: Adding or updating financial information

Given I am a due diligence officer
And I have financial information that needs to be added or updated for a farm
When I navigate to the farm's due diligence section
And I provide the financial information details (e.g., cash flow, sales data, expenses data, documents)
And I submit the update
Then the financial information should be updated in the farm's due diligence section
And I should see the updated information

### Scenario: Adding or updating crop information

Given I am a due diligence officer
And I have crop information that needs to be added or updated for a farm
When I navigate to the farm's due diligence section
And I provide the crop information details
And I submit the update
Then the crop information should be updated in the farm's due diligence section
And I should see the updated information

### Scenario: Adding or updating other relevant information

Given I am a due diligence officer
And I have other relevant information that needs to be added or updated for a farm
When I navigate to the farm's due diligence section
And I provide the other information details
And I submit the update
Then the other information should be updated in the farm's due diligence section
And I should see the updated information
