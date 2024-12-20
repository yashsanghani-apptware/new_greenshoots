# Custom Actions in Policy Definition and Enforcement Service (PDES)

## Overview
Custom actions within the PDES are user-defined actions that extend the built-in capabilities of the system, allowing for more flexible and specialized workflows. These actions can be created, executed, and managed using a standardized approach, enabling seamless integration with the core policy enforcement mechanisms.

## Creation of Custom Actions

1. **Define Custom Action**
   - Custom actions are defined in the Policy Definition Language (PDL) as part of a policy's actions block.
   - Each custom action includes details such as the action type, parameters, and any conditions that must be met for the action to execute.

2. **Example Definition**
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
    - type: "custom"
      name: "log_kyc_attempt"
      parameters:
        user_id: "{user_id}"
        action: "KYC Verification Started"
```

## Execution of Custom Actions

1. **Policy Evaluation**
   - When an event triggers policy evaluation, the PDES checks all conditions defined in the policy.
   - If conditions are met, the actions defined in the policy are queued for execution.

2. **Action Execution**
   - The PDES processes each action sequentially or concurrently, depending on the policy configuration.
   - For custom actions, the PDES invokes a predefined handler or an external service endpoint specified in the action parameters.

3. **Example Execution Flow**
   - The policy evaluation determines that an investor with a pending KYC status and an investment amount greater than $10,000 triggers the policy.
   - The `start_kyc_verification` workflow is initiated, and an email notification is sent to the user.
   - The custom action `log_kyc_attempt` is executed, which logs the KYC verification attempt in the system.

## Management of Custom Actions

1. **Action Handlers**
   - Custom action handlers are functions or services that execute the logic defined in the custom action parameters.
   - These handlers can be implemented as microservices, serverless functions, or integrated directly into the PDES codebase.

2. **Registration of Custom Actions**
   - Custom actions must be registered with the PDES during system configuration or deployment.
   - Registration includes defining the action name, handler endpoint, and any required security or authorization settings.

3. **Example Custom Action Handler (Python)**
```python
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/custom-actions/log_kyc_attempt', methods=['POST'])
def log_kyc_attempt():
    data = request.json
    user_id = data.get('user_id')
    action = data.get('action')
    # Logic to log the action in the system
    print(f"User {user_id}: {action}")
    return jsonify({"status": "success"}), 200

if __name__ == '__main__':
    app.run(port=5000)
```

4. **Monitoring and Logging**
   - The PDES includes mechanisms for monitoring and logging the execution of custom actions.
   - Logs are stored in a centralized logging service and can be queried for auditing and debugging purposes.

5. **Error Handling and Retries**
   - Custom actions include error handling mechanisms to manage failures gracefully.
   - If a custom action fails, the PDES can retry the action based on a predefined policy or escalate the issue to a case management system.

## Example Scenario

1. **User Signs Up as an Investor**
   - The user provides basic information and selects the "Investor" role.
   - The system creates a NORMAL user with limited access.

2. **Policy Trigger**
   - The system evaluates the `Investor KYC Verification` policy.
   - Conditions for KYC verification are met, triggering the defined actions.

3. **Action Execution**
   - The `start_kyc_verification` workflow is initiated.
   - An email notification is sent to the user.
   - The custom action `log_kyc_attempt` logs the KYC verification attempt.

4. **Monitoring and Logging**
   - All actions, including the custom action, are logged for auditing.
   - Any errors are handled and retried according to the policy.

This structured approach to custom actions ensures that the PDES is both flexible and robust, capable of handling complex workflows and integrations with external systems.
