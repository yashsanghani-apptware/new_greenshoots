### Scenario Explanation

In this scenario, you have a set of policies defined in `policies.yaml` and a test scenario defined in `scenario.yaml`. The program reads these YAML files, converts them into JSON, and evaluates the scenario using the `evaluatePolicy` function.

#### **Policies Defined in `policies.yaml`**

1. **Admin Policy**:
   - **Description**: This policy allows users with the role `admin` to perform any action (`read`, `write`, `delete`) on resources that are `active`.
   - **Conditions**: The policy applies only if:
     - The user has the role `admin`.
     - The resource is `active`.

2. **Guest Policy**:
   - **Description**: This policy allows `guest` users to read `active` resources but explicitly denies them the ability to delete any resource.
   - **Conditions**: 
     - The user can `read` if they have the role `guest` and the resource is `active`.
     - The user is denied the `delete` action if they have the role `guest`.

#### **Scenario Defined in `scenario.yaml`**

- **User**: 
  - **Attributes**: The user has the role `admin` and is part of the `internal` network.
- **Resource**:
  - **Attributes**: The resource is `active`.
- **Context**: (Empty in this scenario)
- **Action**: The action being evaluated is `delete`.

### Output Explanation

The output is the result of evaluating the given scenario against the defined policies:

```json
Evaluation Results: [
  {
    "policy": "Admin Policy",
    "rule": {
      "actions": ["read", "write", "delete"],
      "effect": "ALLOW",
      "condition": {
        "match": {
          "all": [
            { "expr": "user.role === \"admin\"" },
            { "expr": "resource.status === \"active\"" }
          ]
        }
      }
    },
    "conditionEvaluation": [
      { "expr": "user.role === \"admin\"", "result": true },
      { "expr": "resource.status === \"active\"", "result": true }
    ],
    "result": "ALLOW"
  }
]
```

### Detailed Breakdown:

1. **Policy Evaluation**:
   - The `Admin Policy` is evaluated first. 
   - **Action Matching**: The action `delete` matches one of the actions in the rule (`read`, `write`, `delete`).
   - **Condition Matching**:
     - The user's role is checked to see if it is `admin` (which it is), so this condition evaluates to `true`.
     - The resource's status is checked to see if it is `active` (which it is), so this condition also evaluates to `true`.
   - **Result**: Since both conditions are met and the rule's effect is `ALLOW`, the policy evaluation returns `ALLOW`.

2. **Result Interpretation**:
   - The evaluation result indicates that the user is allowed to perform the `delete` action on the resource according to the `Admin Policy`.

### Summary

- The scenario involves a user with the role `admin` attempting to delete an active resource.
- The `Admin Policy` is applicable, and all conditions are satisfied.
- The policy grants the `ALLOW` effect, meaning the action is permitted.

This output demonstrates that the policy evaluation mechanism correctly interprets the defined policies and applies them to the given scenario, allowing the action based on the user's role and the resource's status.
