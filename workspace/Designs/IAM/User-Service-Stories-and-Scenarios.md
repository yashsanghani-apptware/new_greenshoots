# User Service Stories and Scenarios

## Overview
The User Service in Agsiri allows for the management of user profiles, including creating, modifying, and deleting users, as well as updating user-related data such as KYC information, beneficiary details, and account information. This service is crucial for maintaining accurate and up-to-date user records, ensuring compliance with regulatory requirements, and enabling seamless user interactions with the platform.

## User Stories and Scenarios

### User Story 1: Create a New User
**As a Platform Administrator, I want to create a new user in Agsiri so that I can register new users on the platform.**

#### Scenario 1.1: Successfully Create a New User
- **Given**: I am logged into the Agsiri platform as an administrator.
- **When**: I send a POST request to /users with the user document and user type.
- **Then**: A new user is created, and I receive the complete user document in the response.

#### Scenario 1.2: Create User with Missing Information
- **Given**: I am logged into the Agsiri platform as an administrator.
- **When**: I send a POST request to /users with an incomplete user document.
- **Then**: The user is not created, and I receive an error message indicating the missing information.

### User Story 2: Modify an Existing User
**As a Platform Administrator, I want to modify an existing user so that I can update user details as needed.**

#### Scenario 2.1: Successfully Modify a User
- **Given**: I am logged into the Agsiri platform as an administrator.
- **When**: I send a PUT request to /users/{user_id} with the changes to be made to the user.
- **Then**: The user's information is updated, and I receive the complete updated user document in the response.

#### Scenario 2.2: Modify Non-existent User
- **Given**: I am logged into the Agsiri platform as an administrator.
- **When**: I send a PUT request to /users/{user_id} for a user that does not exist.
- **Then**: The user information is not updated, and I receive an error message indicating the user was not found.

### User Story 3: Delete a User
**As a Platform Administrator, I want to delete an existing user so that I can remove users who are no longer active on the platform.**

#### Scenario 3.1: Successfully Delete a User
- **Given**: I am logged into the Agsiri platform as an administrator.
- **When**: I send a DELETE request to /users/{user_id}.
- **Then**: The user is deleted, and I receive the complete user document in the response indicating the user was deleted.

#### Scenario 3.2: Delete Non-existent User
- **Given**: I am logged into the Agsiri platform as an administrator.
- **When**: I send a DELETE request to /users/{user_id} for a user that does not exist.
- **Then**: The user is not deleted, and I receive an error message indicating the user was not found.

### User Story 4: Update KYC Data for a User
**As a Platform Administrator, I want to update KYC data for an existing user so that I can ensure the user's KYC information is accurate and up-to-date.**

#### Scenario 4.1: Successfully Update KYC Data
- **Given**: I am logged into the Agsiri platform as an administrator.
- **When**: I send a PUT request to /users/{user_id}/investor/kyc with the KYC data.
- **Then**: The user's KYC information is updated, and I receive the complete updated user document in the response.

#### Scenario 4.2: Update KYC Data with Invalid Information
- **Given**: I am logged into the Agsiri platform as an administrator.
- **When**: I send a PUT request to /users/{user_id}/investor/kyc with invalid KYC data.
- **Then**: The KYC information is not updated, and I receive an error message indicating the validation errors.

### User Story 5: Update Beneficiary Data for a User
**As a Platform Administrator, I want to update beneficiary data for an existing user so that I can ensure the user's beneficiary information is accurate and up-to-date.**

#### Scenario 5.1: Successfully Update Beneficiary Data
- **Given**: I am logged into the Agsiri platform as an administrator.
- **When**: I send a PUT request to /users/{user_id}/investor/beneficiaries with the beneficiary data.
- **Then**: The user's beneficiary information is updated, and I receive the complete updated user document in the response.

#### Scenario 5.2: Update Beneficiary Data with Invalid Information
- **Given**: I am logged into the Agsiri platform as an administrator.
- **When**: I send a PUT request to /users/{user_id}/investor/beneficiaries with invalid beneficiary data.
- **Then**: The beneficiary information is not updated, and I receive an error message indicating the validation errors.

### User Story 6: Update Account Data for a User
**As a Platform Administrator, I want to update account data for an existing user so that I can ensure the user's account information is accurate and up-to-date.**

#### Scenario 6.1: Successfully Update Account Data
- **Given**: I am logged into the Agsiri platform as an administrator.
- **When**: I send a PUT request to /users/{user_id}/investor/accounts with the account data.
- **Then**: The user's account information is updated, and I receive the complete updated user document in the response.

#### Scenario 6.2: Update Account Data with Invalid Information
- **Given**: I am logged into the Agsiri platform as an administrator.
- **When**: I send a PUT request to /users/{user_id}/investor/accounts with invalid account data.
- **Then**: The account information is not updated, and I receive an error message indicating the validation errors.

### User Story 7: Create and Manage IAM Policies
**As an administrator, I want to create and manage IAM policies to control access to resources.**

#### Scenario 7.1: Create a New Policy
- **Given**: An administrator is logged into the Agsiri IAM system.
- **When**: The administrator creates a new policy to allow users to list and get user details.
- **Then**: The policy is stored in the system, and users with the appropriate permissions can list and get user details.

#### Scenario 7.2: Update an Existing Policy
- **Given**: An existing policy in the system.
- **When**: The administrator updates the policy to include an additional condition that restricts access based on IP address.
- **Then**: The policy is updated in the system, and the new conditions are enforced.

#### Scenario 7.3: Delete a Policy
- **Given**: An existing policy in the system.
- **When**: The administrator deletes the policy.
- **Then**: The policy is removed from the system, and access previously granted by the policy is revoked.

### User Story 8: Access Resources According to IAM Policies
**As a user, I want to access resources according to the permissions defined in the IAM policies.**

#### Scenario 8.1: Access a Resource with Sufficient Permissions
- **Given**: A user with permissions defined in a policy.
- **When**: The user attempts to access a resource.
- **Then**: The user is granted access to the resource.

#### Scenario 8.2: Access a Resource without Sufficient Permissions
- **Given**: A user without permissions defined in a policy.
- **When**: The user attempts to access a resource.
- **Then**: The user is denied access to the resource.

### User Story 9: Log and Query IAM Events for Auditing
**As an administrator, I want to log and query IAM events to audit resource access.**

#### Scenario 9.1: Log an Event When a User Accesses a Resource
- **Given**: A user accesses a resource.
- **When**: The access attempt is logged as an event in the system.
- **Then**: The event is recorded with details such as user ID, action, resource, and timestamp.

#### Scenario 9.2: Query Events for Auditing
- **Given**: An administrator wants to audit access to a specific resource.
- **When**: The administrator queries events related to the resource.
- **Then**: The system returns a list of events matching the query criteria.

### User Story 10: Enforce DSPM Controls Based on Logged Events
**As an administrator, I want to enforce Data Security Posture Management (DSPM) controls based on logged events.**

#### Scenario 10.1: Enforce a Lockout After Multiple Failed Login Attempts
- **Given**: A user has failed to log in multiple times.
- **When**: The system detects more than three failed login attempts within a specified timeframe.
- **Then**: The user's account is locked, and an event is logged.

#### Scenario 10.2: Trigger an Alert for Suspicious Activity
- **Given**: The system detects suspicious activity based on predefined conditions (e.g., access from an unknown IP address).
- **When**: The conditions for suspicious activity are met.
- **Then**: An alert is triggered, and an event is logged.
