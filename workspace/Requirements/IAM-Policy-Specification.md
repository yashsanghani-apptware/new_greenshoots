# Agsiri IAM Policy Schema

The Policy Schema in the Agsiri IAM Policy Service is designed to provide a flexible and comprehensive way to define and manage access control policies. This schema allows for the definition of detailed rules, conditions, variables, and schemas to enforce security and access controls robustly. Below is a detailed narrative of each component of the Policy Schema, along with examples to illustrate their use.

## Policy Schema Components

### 1. **Policy Object**

The `Policy` object represents a policy that can be applied to resources within an organization. Each policy contains metadata, rules, conditions, variables, and schemas.

### 2. **Policy Attributes**

- **name**: The name of the policy. This is a required field.
- **description**: A brief description of the policy.
- **resource**: The resource to which the policy applies. This is a required field.
- **version**: The version of the policy. This helps in managing changes and updates to the policy.
- **deprecation**: An object that indicates if the policy is deprecated, when it was deprecated, and what the alternative policy is.
- **priority**: An integer that determines the priority of the policy. Higher values indicate higher priority.
- **rules**: An array of rules that define the actions, effects, conditions, and outputs. This is a required field.
- **variables**: An optional object containing local variables and imported variable sets.
- **schemas**: An optional object defining the schemas for principal and resource validation.
- **organization**: The organization to which the policy belongs.
- **metadata**: An optional object containing tags and environment information.
- **audit**: An object containing audit information such as who created or updated the policy and when.

## Policy Rules

Each policy contains an array of rules. A rule defines the actions that are allowed or denied, the conditions under which these actions apply, and any outputs. Each rule has the following attributes:

- **actions**: An array of actions that the rule applies to (e.g., `view`, `create`, `update`, `list`, `subscribe`). This is a required field.
- **effect**: The effect of the rule (either `ALLOW` or `DENY`). This is a required field.
- **condition**: An optional condition object defining the conditions under which the rule applies.
- **outputs**: An optional object defining outputs when the rule is activated or the condition is not met.

## Conditions

Conditions are used to apply rules based on specific attributes or states. Conditions are evaluated using the Common Expression Language (CEL). A condition has the following structure:

- **match**: An object containing one or more of the following:
  - **all**: An array of expressions that must all evaluate to true (logical AND).
  - **any**: An array of expressions where at least one must evaluate to true (logical OR).
  - **none**: An array of expressions where none must evaluate to true (logical NOT).

## Variables

Variables allow for the reuse of common expressions and can be defined locally within the policy or imported from predefined variable sets.

- **local**: An object containing key-value pairs of local variables.
- **import**: An array of names of variable sets to import.

## Schemas

Schemas define the structure of the data used in the policy, allowing for validation of principals and resources.

- **principalSchema**: An optional reference to a schema for validating principal attributes.
- **resourceSchema**: An optional reference to a schema for validating resource attributes, with an option to ignore validation for specific actions.

## Example Policy Schema

Below is an example of a detailed policy schema:

```json
{
  "name": "InvestorPolicy",
  "description": "Policy for verified investors",
  "resource": "offers",
  "version": "1.0.0",
  "deprecation": {
    "deprecated": false,
    "deprecatedAt": null,
    "alternative": null
  },
  "priority": 1,
  "rules": [
    {
      "actions": ["view", "create", "update", "list", "subscribe"],
      "effect": "ALLOW",
      "condition": {
        "match": {
          "all": [
            { "expr": "user.attr.kycCompleted == true" },
            { "expr": "user.attr.isVerifiedInvestor == true" }
          ]
        }
      },
      "outputs": {
        "when": {
          "ruleActivated": "User has access to investor actions",
          "conditionNotMet": "User does not have access to investor actions"
        }
      }
    }
  ],
  "variables": {
    "local": {
      "kycCompleted": "user.attr.kycCompleted",
      "isVerifiedInvestor": "user.attr.isVerifiedInvestor"
    },
    "import": ["common_variables"]
  },
  "schemas": {
    "principalSchema": {
      "ref": "Agsiri:///principal.json"
    },
    "resourceSchema": {
      "ref": "Agsiri:///offers.json",
      "ignoreWhen": {
        "actions": ["create", "delete:*"]
      }
    }
  },
  "organization": "66adaae3dff42f72342ecf5e",
  "metadata": {
    "tags": ["investor", "access-control"],
    "environment": "production"
  },
  "audit": {
    "createdBy": "admin@example.com",
    "createdAt": "2024-08-05T12:34:56Z",
    "updatedBy": null,
    "updatedAt": null
  }
}
```

## Narrative Explanation

### Policy Metadata

- **name**: `InvestorPolicy`
  - This policy is specifically designed for investors.
- **description**: `Policy for verified investors`
  - Provides a brief explanation of the policy's purpose.
- **resource**: `offers`
  - The policy applies to the `offers` resource.
- **version**: `1.0.0`
  - The initial version of the policy.
- **deprecation**:
  - **deprecated**: `false`
  - **deprecatedAt**: `null`
  - **alternative**: `null`
  - Indicates that this policy is not deprecated.
- **priority**: `1`
  - This policy has a high priority.

### Rules

- **actions**: `["view", "create", "update", "list", "subscribe"]`
  - Specifies the actions that this policy will control.
- **effect**: `ALLOW`
  - This rule allows the specified actions if the conditions are met.
- **condition**:
  - **all**: Both conditions must be true:
    - `user.attr.kycCompleted == true`: The user must have completed KYC.
    - `user.attr.isVerifiedInvestor == true`: The user must be a verified investor.
- **outputs**:
  - **ruleActivated**: "User has access to investor actions"
  - **conditionNotMet**: "User does not have access to investor actions"

### Variables

- **local**:
  - `kycCompleted`: Defined as `user.attr.kycCompleted`
  - `isVerifiedInvestor`: Defined as `user.attr.isVerifiedInvestor`
- **import**: `["common_variables"]`
  - Imports common variables defined elsewhere.

### Schemas

- **principalSchema**:
  - **ref**: `Agsiri:///principal.json`
    - Refers to the schema for validating principal attributes.
- **resourceSchema**:
  - **ref**: `Agsiri:///offers.json`
    - Refers to the schema for validating resource attributes.
  - **ignoreWhen**:
    - **actions**: `["create", "delete:*"]`
      - Ignores validation for these actions.

### Organization

- **organization**: `"66adaae3dff42f72342ecf5e"`
  - The organization to which the policy belongs.

### Metadata

- **tags**: `["investor", "access-control"]`
  - Tags associated with the policy.
- **environment**: `production`
  - The environment where the policy is applied.

### Audit

- **createdBy**: `admin@example.com`
  - The user who created the policy.
- **createdAt**: `2024-08-05T12:34:56Z`
  - The timestamp when the policy was created.
- **updatedBy**: `null`
  - The user who last updated the policy.
- **updatedAt**: `null`
  - The timestamp when the policy was last updated.

## Variables, Rules, Conditions, and Outputs Explained

The Agsiri IAM Policy Specification provides a robust framework for defining access control policies through the use of variables, rules, conditions, and outputs. Each of these components plays a crucial role in ensuring that policies are flexible, dynamic, and context-sensitive. Below, we explain each concept in detail and provide examples to illustrate their use.

### 1. **Variables**

Variables in Agsiri IAM policies allow for the reuse of common expressions and conditions across different policies. They help to simplify policy definitions by avoiding redundancy and making policies easier to maintain.

#### Variable Components

- **local**: These are variables defined within the policy. They are specific to that particular policy and can be used in rules and conditions.
- **import**: These are predefined sets of variables that can be imported into a policy for reuse.

#### Example

Consider a policy where we need to check if a user is an active employee and part of the sales department. We can define these checks as local variables.

```json
{
  "name": "SalesPolicy",
  "description": "Policy for sales department access",
  "resource": "sales:data",
  "variables": {
    "local": {
      "isActiveEmployee": "user.attr.status == 'active'",
      "isSalesDepartment": "user.attr.department == 'sales'"
    }
  }
}
```

### 2. **Rules**

Rules define the actions that are allowed or denied based on specific conditions. Each rule specifies the actions, the effect (allow or deny), and the conditions under which the rule applies.

#### Rule Components

- **actions**: An array of actions that the rule applies to (e.g., `view`, `create`, `update`).
- **effect**: The effect of the rule, either `ALLOW` or `DENY`.
- **condition**: An optional object that defines the conditions under which the rule applies.
- **outputs**: An optional object that defines the outputs when the rule is activated or the condition is not met.

#### Example

Let's create a rule that allows users to view sales data only if they are active employees in the sales department.

```json
{
  "rules": [
    {
      "actions": ["view"],
      "effect": "ALLOW",
      "condition": {
        "match": {
          "all": [
            { "expr": "variables.isActiveEmployee" },
            { "expr": "variables.isSalesDepartment" }
          ]
        }
      }
    }
  ]
}
```

### 3. **Conditions**

Conditions are expressions that evaluate to true or false, determining whether a rule applies. Conditions are written using the Common Expression Language (CEL).

#### Condition Components

- **match**: An object containing one or more of the following:
  - **all**: An array of expressions that must all evaluate to true (logical AND).
  - **any**: An array of expressions where at least one must evaluate to true (logical OR).
  - **none**: An array of expressions where none must evaluate to true (logical NOT).

#### Example

Consider a condition that allows access if the user is either an admin or a manager.

```json
{
  "condition": {
    "match": {
      "any": [
        { "expr": "user.attr.role == 'admin'" },
        { "expr": "user.attr.role == 'manager'" }
      ]
    }
  }
}
```

### 4. **Outputs**

Outputs define what should happen when a rule is activated or when the condition is not met. Outputs can provide messages or trigger actions based on the evaluation of the rule.

#### Output Components

- **when**: An object that defines the outputs based on the condition outcomes.
  - **ruleActivated**: An expression evaluated when the rule is fully activated.
  - **conditionNotMet**: An expression evaluated when the condition is not met.

#### Example

Let's create an output that logs messages based on whether a user can view sensitive data.

```json
{
  "outputs": {
    "when": {
      "ruleActivated": "User is allowed to view sensitive data",
      "conditionNotMet": "User is not allowed to view sensitive data"
    }
  }
}
```

### Putting It All Together: Complete Policy Example

Below is a complete policy example that incorporates variables, rules, conditions, and outputs.

```json
{
  "name": "SalesPolicy",
  "description": "Policy for sales department access",
  "resource": "sales:data",
  "version": "1.0.0",
  "deprecation": {
    "deprecated": false,
    "deprecatedAt": null,
    "alternative": null
  },
  "priority": 1,
  "variables": {
    "local": {
      "isActiveEmployee": "user.attr.status == 'active'",
      "isSalesDepartment": "user.attr.department == 'sales'"
    },
    "import": ["common_variables"]
  },
  "rules": [
    {
      "actions": ["view"],
      "effect": "ALLOW",
      "condition": {
        "match": {
          "all": [
            { "expr": "variables.isActiveEmployee" },
            { "expr": "variables.isSalesDepartment" }
          ]
        }
      },
      "outputs": {
        "when": {
          "ruleActivated": "User is allowed to view sales data",
          "conditionNotMet": "User is not allowed to view sales data"
        }
      }
    }
  ],
  "schemas": {
    "principalSchema": {
      "ref": "Agsiri:///principal.json"
    },
    "resourceSchema": {
      "ref": "Agsiri:///sales/data.json",
      "ignoreWhen": {
        "actions": ["create", "delete:*"]
      }
    }
  },
  "organization": "66adaae3dff42f72342ecf5e",
  "metadata": {
    "tags": ["sales", "access-control"],
    "environment": "production"
  },
  "audit": {
    "createdBy": "admin@example.com",
    "createdAt": "2024-08-05T12:34:56Z",
    "updatedBy": null,
    "updatedAt": null
  }
}
```

### Narrative Explanation

#### Policy Metadata

- **name**: `SalesPolicy`
  - This policy is specifically designed for the sales department.
- **description**: `Policy for sales department access`
  - Provides a brief explanation of the policy's purpose.
- **resource**: `sales:data`
  - The policy applies to the `sales:data` resource.

#### Variables

- **local**:
  - `isActiveEmployee`: Defined as `user.attr.status == 'active'`
  - `isSalesDepartment`: Defined as `user.attr.department == 'sales'`
- **import**: `["common_variables"]`
  - Imports common variables defined elsewhere.

#### Rules

- **actions**: `["view"]`
  - Specifies that this rule controls the `view` action.
- **effect**: `ALLOW`
  - This rule allows the `view` action if the conditions are met.
- **condition**:
  - **all**: Both conditions must be true:
    - `variables.isActiveEmployee`: The user must be an active employee.
    - `variables.isSalesDepartment`: The user must be part of the sales department.
- **outputs**:
  - **ruleActivated**: "User is allowed to view sales data"
  - **conditionNotMet**: "User is not allowed to view sales data"

#### Schemas

- **principalSchema**:
  - **ref**: `Agsiri:///principal.json`
    - Refers to the schema for validating principal attributes.
- **resourceSchema**:
  - **ref**: `Agsiri:///sales/data.json`
    - Refers to the schema for validating resource attributes.
  - **ignoreWhen**:
    - **actions**: `["create", "delete:*"]`
      - Ignores validation for these actions.

#### Organization

- **organization**: `"66adaae3dff42f72342ecf5e"`
  - The organization to which the policy belongs.

#### Metadata and Audit

- **metadata**:
  - **tags**: `["sales", "access-control"]`
    - Tags for categorizing the policy.
  - **environment**: `production`
    - The environment in which the policy is applied.
- **audit**:
  - **createdBy**: `"admin@example.com"`
  - **createdAt**: `"2024-08-05T12:34:56Z"`
  - **updatedBy**: `null`
  - **updatedAt**: `null`

## Derived Roles in Agsiri IAM Policy Service

Derived roles in the Agsiri IAM Policy Service provide a powerful mechanism for dynamically assigning roles based on specific conditions and attributes. This allows for more granular and context-sensitive access control, enhancing security and flexibility within an organization. Below, we'll explain the concept of derived roles in detail and provide examples to illustrate their power and utility.

### Understanding Derived Roles

Derived roles are roles that are automatically assigned to a user based on certain conditions or attributes. Unlike static roles that are manually assigned, derived roles are evaluated dynamically, allowing the system to adjust access controls in real-time based on the current state of a user's attributes or the context of their actions.

### Components of Derived Roles

A derived role is defined by the following components:

- **name**: The name of the derived role.
- **parentRoles**: An array of roles that this derived role is based on.
- **condition**: The condition that must be met for the derived role to be assigned. This is typically a CEL (Common Expression Language) expression.

### Example: Investor Derived Role

Consider an organization that wants to grant certain permissions to users who are verified investors. A user is considered a verified investor if they have completed a KYC (Know Your Customer) check and are recognized as an accredited investor. We can define a derived role called `investor` to capture this logic.

#### Defining the Derived Role

```json
{
  "name": "investor",
  "parentRoles": ["user"],
  "condition": {
    "match": {
      "expr": "user.attr.kycCompleted == true && user.attr.isVerifiedInvestor == true"
    }
  }
}
```

In this definition:
- The derived role is named `investor`.
- It is based on the `user` role.
- The condition specifies that the user must have completed KYC (`user.attr.kycCompleted == true`) and be a verified investor (`user.attr.isVerifiedInvestor == true`).

#### Using the Derived Role in a Policy

Now, let's create a policy that grants specific permissions to users who have the `investor` derived role.

```json
{
  "name": "InvestorPolicy",
  "description": "Policy for verified investors",
  "resource": "offers",
  "version": "1.0.0",
  "deprecation": {
    "deprecated": false,
    "deprecatedAt": null,
    "alternative": null
  },
  "priority": 1,
  "rules": [
    {
      "actions": ["view", "create", "update", "list", "subscribe"],
      "effect": "ALLOW",
      "condition": {
        "match": {
          "all": [
            { "expr": "user.attr.kycCompleted == true" },
            { "expr": "user.attr.isVerifiedInvestor == true" }
          ]
        }
      },
      "outputs": {
        "when": {
          "ruleActivated": "User has access to investor actions",
          "conditionNotMet": "User does not have access to investor actions"
        }
      }
    }
  ],
  "variables": {
    "local": {
      "kycCompleted": "user.attr.kycCompleted",
      "isVerifiedInvestor": "user.attr.isVerifiedInvestor"
    },
    "import": ["common_variables"]
  },
  "schemas": {
    "principalSchema": {
      "ref": "Agsiri:///principal.json"
    },
    "resourceSchema": {
      "ref": "Agsiri:///offers.json",
      "ignoreWhen": {
        "actions": ["create", "delete:*"]
      }
    }
  },
  "organization": "66adaae3dff42f72342ecf5e",
  "metadata": {
    "tags": ["investor", "access-control"],
    "environment": "production"
  },
  "audit": {
    "createdBy": "admin@example.com",
    "createdAt": "2024-08-05T12:34:56Z",
    "updatedBy": null,
    "updatedAt": null
  }
}
```

In this policy:
- The policy is named `InvestorPolicy` and applies to the `offers` resource.
- The rule allows `view`, `create`, `update`, `list`, and `subscribe` actions if the user is an `investor` (i.e., they meet the derived role's condition).
- The `condition` checks if the user has completed KYC and is a verified investor.
- The `outputs` provide feedback on whether the user meets the conditions for the actions.

### Examples of Derived Roles in Action

#### Example 1: Dynamic Access Based on User Status

An organization wants to grant access to sensitive documents only to users who are managers and have completed a specific training.

**Derived Role Definition:**

```json
{
  "name": "trainedManager",
  "parentRoles": ["manager"],
  "condition": {
    "match": {
      "expr": "user.attr.trainingCompleted == true"
    }
  }
}
```

**Policy Using Derived Role:**

```json
{
  "name": "SensitiveDocsPolicy",
  "description": "Policy for accessing sensitive documents",
  "resource": "documents:sensitive",
  "rules": [
    {
      "actions": ["view"],
      "effect": "ALLOW",
      "condition": {
        "match": {
          "expr": "user.role == 'trainedManager'"
        }
      }
    }
  ]
}
```

#### Example 2: Temporary Elevated Access

A user is granted temporary elevated access to critical systems during an incident.

**Derived Role Definition:**

```json
{
  "name": "incidentResponder",
  "parentRoles": ["user"],
  "condition": {
    "match": {
      "expr": "user.attr.isOnCall == true && system.attr.incidentOngoing == true"
    }
  }
}
```

**Policy Using Derived Role:**

```json
{
  "name": "IncidentResponsePolicy",
  "description": "Policy for incident response",
  "resource": "systems:critical",
  "rules": [
    {
      "actions": ["access", "modify"],
      "effect": "ALLOW",
      "condition": {
        "match": {
          "expr": "user.role == 'incidentResponder'"
        }
      }
    }
  ]
}
```
## Conditions Evaluation and Conflict Resolution 

### Conditions Evaluation

Conditions in Agsiri IAM policies are expressions that evaluate to `true` or `false`, determining whether a particular rule applies. These conditions are written using the Common Expression Language (CEL) and can incorporate various logical operations.

#### Components of Conditions

- **match**: The main component of conditions which includes one or more logical evaluations.
  - **all**: An array of expressions that must all evaluate to `true` (logical AND).
  - **any**: An array of expressions where at least one must evaluate to `true` (logical OR).
  - **none**: An array of expressions where none must evaluate to `true` (logical NOT).

#### Example Condition

Here’s an example of a condition that allows access if the user is an admin or if the user has completed KYC and is a verified investor:

```json
{
  "condition": {
    "match": {
      "any": [
        { "expr": "user.attr.role == 'admin'" },
        {
          "all": [
            { "expr": "user.attr.kycCompleted == true" },
            { "expr": "user.attr.isVerifiedInvestor == true" }
          ]
        }
      ]
    }
  }
}
```

### Conflict Resolution

When a user tries to access a resource, multiple policies at different levels (user, group, role, organization) may apply. The Agsiri IAM policy evaluator resolves conflicts and determines the effective permissions through a systematic evaluation process.

#### Levels of Policy Application

1. **User Level Policies**: Policies directly attached to the user.
2. **Group Level Policies**: Policies attached to any groups the user is a member of.
3. **Role Level Policies**: Policies attached to any roles the user possesses.
4. **Organization Level Policies**: Policies that apply to the entire organization.

#### Conflict Resolution Rules

1. **Explicit Deny Overrides Allow**: If any policy explicitly denies access, that denial takes precedence over any allows.
2. **Explicit Allow**: If there is no explicit deny and one or more policies explicitly allow the action, the action is allowed.
3. **Implicit Deny**: If there is no explicit allow and no explicit deny, the action is denied by default.

### Effective Permissions Calculation

When a user attempts to access a resource, the policy evaluator follows these steps to determine the effective permissions:

1. **Collect Relevant Policies**: Gather all applicable policies for the user, including user, group, role, and organization policies.
2. **Evaluate Conditions**: Check the conditions in each policy’s rules to see if they apply to the current request.
3. **Apply Conflict Resolution Rules**: Use the conflict resolution rules to determine the final permission.

### Example Scenario

Let's consider a scenario where a user is trying to access a resource `sales:data`. The user is a member of a group `sales-team`, has a role `sales-manager`, and is part of the organization `Acme Corp`.

#### Policies

1. **User Policy**:
    ```json
    {
      "name": "UserPolicy",
      "resource": "sales:data",
      "rules": [
        {
          "actions": ["view"],
          "effect": "ALLOW",
          "condition": {
            "match": {
              "expr": "user.attr.status == 'active'"
            }
          }
        }
      ]
    }
    ```

2. **Group Policy**:
    ```json
    {
      "name": "GroupPolicy",
      "resource": "sales:data",
      "rules": [
        {
          "actions": ["view", "update"],
          "effect": "ALLOW",
          "condition": {
            "match": {
              "expr": "user.attr.department == 'sales'"
            }
          }
        }
      ]
    }
    ```

3. **Role Policy**:
    ```json
    {
      "name": "RolePolicy",
      "resource": "sales:data",
      "rules": [
        {
          "actions": ["delete"],
          "effect": "DENY",
          "condition": {
            "match": {
              "expr": "user.attr.role == 'sales-manager'"
            }
          }
        }
      ]
    }
    ```

4. **Organization Policy**:
    ```json
    {
      "name": "OrgPolicy",
      "resource": "sales:data",
      "rules": [
        {
          "actions": ["create"],
          "effect": "ALLOW",
          "condition": {
            "match": {
              "expr": "user.attr.isEmployee == true"
            }
          }
        }
      ]
    }
    ```

### Policy Evaluation Process

1. **Gather Policies**: The evaluator collects all applicable policies (UserPolicy, GroupPolicy, RolePolicy, OrgPolicy).

2. **Evaluate Conditions**:
    - **UserPolicy**: If `user.attr.status == 'active'` is `true`, the `view` action is allowed.
    - **GroupPolicy**: If `user.attr.department == 'sales'` is `true`, the `view` and `update` actions are allowed.
    - **RolePolicy**: If `user.attr.role == 'sales-manager'` is `true`, the `delete` action is denied.
    - **OrgPolicy**: If `user.attr.isEmployee == true` is `true`, the `create` action is allowed.

3. **Apply Conflict Resolution**:
    - **View**: Allowed by both UserPolicy and GroupPolicy.
    - **Update**: Allowed by GroupPolicy.
    - **Delete**: Explicitly denied by RolePolicy.
    - **Create**: Allowed by OrgPolicy.

### Conclusion

In this scenario, the effective permissions for the user are as follows:
- **View**: Allowed
- **Update**: Allowed
- **Delete**: Denied
- **Create**: Allowed

This process ensures that the most restrictive policy takes precedence (deny overrides allow) and that all conditions are evaluated to determine the correct access control decision.

### Example Curl Command to Explain Policy

You can use the following command to explain how the policy works for a specific user and resource:

```bash
curl -X POST http://localhost:3000/api/orgs/$ORG/policies/$POLICY/explain -H "Content-Type: application/json" -d '{
  "user": {
    "id": "user_id",
    "attr": {
      "status": "active",
      "department": "sales",
      "role": "sales-manager",
      "isEmployee": true
    }
  },
  "resource": {
    "id": "sales:data"
  },
  "action": "view"
}'
```

This command will return a detailed explanation of why the action is allowed or denied based on the policies and conditions in place.

## Policy Evaluator and Access to Attributes

The Policy Evaluator in the Agsiri IAM Policy Service needs to access various attributes of users, groups, roles, and resources to make accurate access control decisions. These attributes are crucial for evaluating conditions and determining the effective permissions for any given action. Here's how the Policy Evaluator gets access to these attributes and how the application sets them:

### Accessing Attributes

1. **User Attributes**: Attributes related to the user making the request, such as their roles, group memberships, and custom attributes like `kycCompleted` or `isVerifiedInvestor`.
2. **Resource Attributes**: Attributes related to the resource being accessed, such as its type, ownership, and specific permissions.
3. **Contextual Attributes**: Attributes that are relevant to the request context, such as the time of the request, IP address, and other environmental factors.

### How Attributes Are Set

Attributes are set and managed by the application and provided to the Policy Evaluator through the request payload. Here's a detailed explanation of the process:

#### 1. **User Attributes**

User attributes are typically stored in a user management system or database. When a user logs in or makes a request, the application retrieves the relevant user attributes and includes them in the request to the Policy Evaluator.

**Example: User Attributes Retrieval**
```json
{
  "id": "user_id",
  "attr": {
    "status": "active",
    "department": "sales",
    "role": "sales-manager",
    "kycCompleted": true,
    "isVerifiedInvestor": true
  }
}
```

#### 2. **Resource Attributes**

Resource attributes are associated with the specific resource being accessed. These attributes can be stored in a resource management system or database. When a request is made to access a resource, the application retrieves the relevant resource attributes and includes them in the request to the Policy Evaluator.

**Example: Resource Attributes Retrieval**
```json
{
  "id": "resource_id",
  "attr": {
    "type": "offers",
    "owner": "user_id",
    "public": false
  }
}
```

#### 3. **Contextual Attributes**

Contextual attributes are dynamically generated based on the context of the request. These can include the time of the request, the IP address of the user, and other environmental factors.

**Example: Contextual Attributes Retrieval**
```json
{
  "time": "2024-08-05T12:34:56Z",
  "ipAddress": "192.168.1.1"
}
```

### How Attributes Are Used in Policies

Attributes are used in the policy conditions to evaluate whether the policy rules apply to the current request. Here’s how the attributes are incorporated:

**Example Policy with Conditions**
```json
{
  "name": "InvestorPolicy",
  "description": "Policy for verified investors",
  "resource": "offers",
  "rules": [
    {
      "actions": ["view", "create", "update", "list", "subscribe"],
      "effect": "ALLOW",
      "condition": {
        "match": {
          "all": [
            { "expr": "user.attr.kycCompleted == true" },
            { "expr": "user.attr.isVerifiedInvestor == true" }
          ]
        }
      },
      "outputs": {
        "when": {
          "ruleActivated": "User has access to investor actions",
          "conditionNotMet": "User does not have access to investor actions"
        }
      }
    }
  ],
  "variables": {
    "local": {
      "kycCompleted": "user.attr.kycCompleted",
      "isVerifiedInvestor": "user.attr.isVerifiedInvestor"
    },
    "import": ["common_variables"]
  },
  "schemas": {
    "principalSchema": {
      "ref": "Agsiri:///principal.json"
    },
    "resourceSchema": {
      "ref": "Agsiri:///offers.json",
      "ignoreWhen": {
        "actions": ["create", "delete:*"]
      }
    }
  },
  "organization": "66adaae3dff42f72342ecf5e",
  "metadata": {
    "tags": ["investor", "access-control"],
    "environment": "production"
  },
  "audit": {
    "createdBy": "admin@example.com",
    "createdAt": "2024-08-05T12:34:56Z",
    "updatedBy": null,
    "updatedAt": null
  }
}
```

### Example Workflow: Setting and Evaluating Attributes

1. **User Logs In**: The user logs in to the application. The application retrieves user attributes from the user management system.
2. **User Makes a Request**: The user attempts to perform an action on a resource (e.g., view an offer). The application retrieves the relevant resource attributes.
3. **Construct Request Payload**: The application constructs a request payload that includes user attributes, resource attributes, and contextual attributes.
4. **Send Request to Policy Evaluator**: The application sends the request payload to the Policy Evaluator.
5. **Policy Evaluation**: The Policy Evaluator evaluates the conditions in the policies against the provided attributes.
6. **Determine Effective Permissions**: The Policy Evaluator resolves any conflicts and determines the effective permissions for the user.
7. **Return Result**: The Policy Evaluator returns the result to the application, indicating whether the action is allowed or denied.

### Example Curl Command for Policy Evaluation

```bash
curl -X POST http://localhost:3000/api/orgs/$ORG/policies/$POLICY/explain -H "Content-Type: application/json" -d '{
  "user": {
    "id": "user_id",
    "attr": {
      "status": "active",
      "department": "sales",
      "role": "sales-manager",
      "kycCompleted": true,
      "isVerifiedInvestor": true
    }
  },
  "resource": {
    "id": "offers",
    "attr": {
      "type": "offer",
      "owner": "user_id",
      "public": false
    }
  },
  "context": {
    "time": "2024-08-05T12:34:56Z",
    "ipAddress": "192.168.1.1"
  },
  "action": "view"
}'
```

This command will help determine whether the specified user is allowed to perform the `view` action on the `offers` resource based on the provided attributes and policies in place.

## Conclusion

The Policy Schema is a powerful tool for defining and managing access control within the Agsiri IAM Policy Service. It allows for the creation of complex policies that can enforce detailed security rules based on user attributes, conditions, and variables. By using conditions, variables, and schemas, the policy evaluator can ensure that only authorized actions are permitted, providing robust security for the organization's resources.
