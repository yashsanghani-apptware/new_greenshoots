# Policy Definition and Enforcement Service (PDES)

## Overview
The Policy Definition and Enforcement Service (PDES) is a microservice designed to manage and enforce policies within the Agsiri IAM Service. This service allows administrators to define policies using a domain-specific language (PDL), which can dynamically adapt to business requirements. By integrating AI/ML models and context-aware mechanisms, PDES ensures robust and secure policy management.

## Policy Definition Language (PDL)
PDL is a domain-specific language designed to encode various conditions, steps, and actions that need to be performed based on certain triggers. PDL allows for the flexible and dynamic definition of policies that can include complex logic and integrations with external services.

### PDL Syntax Example
```yaml
policy:
  name: "Investor KYC Verification"
  description: "Policy for verifying KYC documents for investors"
  roles:
    - "Investor"
  conditions:
    - type: "attribute"
      attribute: "kyc_status"
      operator: "equals"
      value: "pending"
    - type: "attribute"
      attribute: "investment_amount"
      operator: "greater_than"
      value: 10000
  actions:
    - type: "workflow"
      name: "start_kyc_verification"
      parameters:
        user_id: "{user_id}"
    - type: "notification"
      channel: "email"
      template: "kyc_pending"
      parameters:
        email: "{user_email}"
```

## User Stories and Scenarios

### User Story 1: Create a New Policy

**As an** Administrator  
**I want to** create a new policy using PDL  
**So that** I can enforce business rules and compliance requirements dynamically  

**Scenario: Create a Policy**

- **Given** I am logged into the PDES as an Administrator
- **When** I navigate to the "Policy Management" section and select "Create Policy"
- **And** I enter the policy details using PDL: 
```yaml
policy:
  name: "Investor KYC Verification"
  description: "Policy for verifying KYC documents for investors"
  roles:
    - "Investor"
  conditions:
    - type: "attribute"
      attribute: "kyc_status"
      operator: "equals"
      value: "pending"
    - type: "attribute"
      attribute: "investment_amount"
      operator: "greater_than"
      value: 10000
  actions:
    - type: "workflow"
      name: "start_kyc_verification"
      parameters:
        user_id: "{user_id}"
    - type: "notification"
      channel: "email"
      template: "kyc_pending"
      parameters:
        email: "{user_email}"
```
- **Then** the new policy is created and saved in the system
- **And** I receive a confirmation message

**Real-World Example:**
```
Policy: Investor KYC Verification  
Conditions: 
- kyc_status equals pending
- investment_amount greater than 10000  
Actions: 
- Start KYC verification workflow
- Send KYC pending email notification to the user
```
### User Story 2: Modify an Existing Policy

**As an** Administrator  
**I want to** modify an existing policy  
**So that** I can update the policy conditions and actions as per new requirements  

**Scenario: Modify a Policy**

- **Given** I am logged into the PDES as an Administrator
- **When** I navigate to the "Policy Management" section and select an existing policy
- **And** I modify the policy conditions or actions using PDL
- **Then** the policy is updated and saved in the system
- **And** I receive a confirmation message

**Real-World Example:**
```
Policy: Investor KYC Verification  
New Condition: 
- kyc_status equals verified
- investment_amount greater than 50000  
Actions: 
- Approve investor status
- Send KYC approved email notification to the user
```
### User Story 3: Delete a Policy

**As an** Administrator  
**I want to** delete an existing policy  
**So that** I can remove outdated or redundant policies  

**Scenario: Delete a Policy**

- **Given** I am logged into the PDES as an Administrator
- **When** I navigate to the "Policy Management" section and select an existing policy
- **And** I choose to delete the policy
- **Then** the policy is removed from the system
- **And** I receive a confirmation message

**Real-World Example:**

- Policy: Outdated Compliance Check  
- Action: Policy is no longer required and is deleted

### User Story 4: Define Custom Actions

**As an** Administrator  
**I want to** define custom actions in PDL  
**So that** I can perform specific operations based on policy enforcement  

**Scenario: Define a Custom Action**

- **Given** I am logged into the PDES as an Administrator
- **When** I navigate to the "Custom Actions" section and select "Create Custom Action"
- **And** I define the custom action logic: 

Here is the proper custom action definition in a detailed format:

```yaml

  actions:
    - type: "custom_action"
      name: "log_high_value_transaction"
      parameters:
        transaction_id: "{transaction_id}"
        amount: "{amount}"
```

- **Then** the custom action is created and saved in the system
- **And** I can use this custom action in my policies

Here is the complete Policy Defintion using the Custom Actions:

```yaml
policy:
  name: "High-Value Transaction Logging"
  description: "Policy for logging transactions that exceed a certain amount."
  roles:
    - "Financial Analyst"
    - "Administrator"
  conditions:
    - type: "attribute"
      attribute: "transaction_amount"
      operator: "greater_than"
      value: 50000
  actions:
    - type: "custom_action"
      name: "log_high_value_transaction"
      parameters:
        transaction_id: "{transaction_id}"
        amount: "{amount}"
```

#### Explanation
- **Policy Name and Description**: Provides a clear name and description for the policy, indicating its purpose.
- **Roles**: Specifies which roles are subject to this policy.
- **Conditions**: Defines the criteria that must be met for the policy to trigger.
  - Here, the condition is that the transaction amount must be greater than 50,000.
- **Actions**: Lists the actions to be taken when the conditions are met.
  - **Type**: Indicates this is a custom action.
  - **Name**: Provides a name for the custom action, which is `log_high_value_transaction`.
  - **Parameters**: Specifies the parameters for the custom action, with placeholders for dynamic values (transaction ID and amount).


**Real-World Example:**

- Custom Action: Log High Value Transaction  
- Logic: Log transaction details for amounts greater than 100000

### User Story 5: Policy Execution and Enforcement

**As a** System  
**I want to** execute policies and enforce actions  
**So that** I can ensure compliance and business rules are adhered to  

**Scenario: Policy Execution**

- **Given** a policy "Investor KYC Verification" is defined in the system
- **When** a user's kyc_status is updated to pending and investment_amount is greater than 10000
- **Then** the policy conditions are evaluated
- **And** the actions "start_kyc_verification" workflow and "send KYC pending email" are executed

**Real-World Example:**
```
User: John Doe  
KYC Status: Pending  
Investment Amount: 20000  
Policy: Investor KYC Verification  
Actions Executed: KYC Verification Workflow started, KYC Pending Email sent
```
## Detailed Functional Specifications

### Policy Management


1. **Create Policy**
   - Endpoint: POST /policies
   - Request Body: PDL Definition
   - Response: Policy ID and Confirmation Message

2. **Modify Policy**
   - Endpoint: PUT /policies/{policy_id}
   - Request Body: PDL Definition
   - Response: Policy ID and Confirmation Message

3. **Delete Policy**
   - Endpoint: DELETE /policies/{policy_id}
   - Response: Confirmation Message

4. **List Policies**
   - Endpoint: GET /policies
   - Response: List of Policies

### Custom Actions

1. **Create Custom Action**
   - Endpoint: POST /custom-actions
   - Request Body: Custom Action Definition
   - Response: Custom Action ID and Confirmation Message

2. **Modify Custom Action**
   - Endpoint: PUT /custom-actions/{action_id}
   - Request Body: Custom Action Definition
   - Response: Custom Action ID and Confirmation Message

3. **Delete Custom Action**
   - Endpoint: DELETE /custom-actions/{action_id}
   - Response: Confirmation Message

4. **List Custom Actions**
   - Endpoint: GET /custom-actions
   - Response: List of Custom Actions

### Policy Execution and Enforcement

1. **Evaluate Policy Conditions**
   - Method to evaluate conditions defined in the policy against user data and context.

2. **Execute Policy Actions**
   - Method to execute actions if policy conditions are met. Actions include workflows, notifications, logging, and custom actions.

3. **Log Policy Execution**
   - Log the details of policy execution for auditing and monitoring purposes.

## Security and Compliance

1. **Role-Based Access Control (RBAC)**
   - Ensure only authorized administrators can create, modify, or delete policies and custom actions.

2. **Audit Logging**
   - Log all changes to policies and actions for auditing purposes.

3. **Exception Handling**
   - Gracefully handle errors during policy evaluation and action execution, and log them for further investigation.

## Integration with Agsiri IAM Service

1. **User Onboarding Workflow**
   - Trigger policies during user onboarding to enforce KYC checks and other compliance requirements.

2. **Role and Permission Assignment**
   - Dynamically assign roles and permissions based on policy evaluation results.

3. **User Activity Monitoring**
   - Monitor user activities and trigger policies for anomalous behavior detection and compliance enforcement.

By carving out the Policy Definition and Enforcement as a separate microservice, we ensure a modular and scalable approach to managing policies within the Agsiri IAM Service. The detailed user stories and scenarios provide a comprehensive guide for implementing the PDES, incorporating smart and intelligent policy management to enhance security and compliance.
