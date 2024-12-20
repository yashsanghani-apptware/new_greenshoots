Here are five different sets of positive and negative scenarios, along with the relevant `curl` commands, for each of the policy types: Derived Roles, Resource Policies, Principal Policies, and Exported Variables.

### 1. Derived Roles

#### Scenario 1: Positive - Create a Derived Role for Farm Owners
**Description:** Define a derived role for users who are owners of a farm.

**Policy Definition:**

```json
{
  "apiVersion": "api.agsiri.dev/v1",
  "derivedRoles": {
    "name": "farm_owner_role",
    "definitions": [
      {
        "name": "owner",
        "parentRoles": ["user"],
        "condition": {
          "match": {
            "expr": "request.resource.attr.owner == request.principal.id"
          }
        }
      }
    ]
  }
}
```

**Curl Command:**

```bash
curl -X POST http://localhost:3592/orgs/{orgId}/derivedRoles \
-H "Content-Type: application/json" \
-d '{
  "apiVersion": "api.agsiri.dev/v1",
  "derivedRoles": {
    "name": "farm_owner_role",
    "definitions": [
      {
        "name": "owner",
        "parentRoles": ["user"],
        "condition": {
          "match": {
            "expr": "request.resource.attr.owner == request.principal.id"
          }
        }
      }
    ]
  }
}'
```

#### Scenario 2: Negative - Derived Role with Invalid Condition Expression
**Description:** Attempt to create a derived role with an invalid condition expression.

**Curl Command:**

```bash
curl -X POST http://localhost:3592/orgs/{orgId}/derivedRoles \
-H "Content-Type: application/json" \
-d '{
  "apiVersion": "api.agsiri.dev/v1",
  "derivedRoles": {
    "name": "farm_invalid_role",
    "definitions": [
      {
        "name": "owner",
        "parentRoles": ["user"],
        "condition": {
          "match": {
            "expr": "request.resource.attr.owner ===="
          }
        }
      }
    ]
  }
}'
```

### 2. Resource Policies

#### Scenario 3: Positive - Create a Resource Policy for Farm Listings
**Description:** Define a resource policy that allows users to view and update their farm listings.

**Policy Definition:**

```json
{
  "apiVersion": "api.agsiri.dev/v1",
  "version": "v1",
  "resourcePolicy": {
    "resource": "farm:listing",
    "rules": [
      {
        "actions": ["view", "update"],
        "effect": "EFFECT_ALLOW",
        "roles": ["user"],
        "condition": {
          "match": {
            "expr": "request.resource.attr.owner == request.principal.id"
          }
        }
      }
    ]
  }
}
```

**Curl Command:**

```bash
curl -X POST http://localhost:3592/orgs/{orgId}/policies \
-H "Content-Type: application/json" \
-d '{
  "apiVersion": "api.agsiri.dev/v1",
  "version": "v1",
  "resourcePolicy": {
    "resource": "farm:listing",
    "rules": [
      {
        "actions": ["view", "update"],
        "effect": "EFFECT_ALLOW",
        "roles": ["user"],
        "condition": {
          "match": {
            "expr": "request.resource.attr.owner == request.principal.id"
          }
        }
      }
    ]
  }
}'
```

#### Scenario 4: Negative - Create a Resource Policy Without Required Fields
**Description:** Attempt to create a resource policy without specifying the `resource` field.

**Curl Command:**

```bash
curl -X POST http://localhost:3592/orgs/{orgId}/policies \
-H "Content-Type: application/json" \
-d '{
  "apiVersion": "api.agsiri.dev/v1",
  "version": "v1",
  "resourcePolicy": {
    "rules": [
      {
        "actions": ["view", "update"],
        "effect": "EFFECT_ALLOW",
        "roles": ["user"]
      }
    ]
  }
}'
```

### 3. Principal Policies

#### Scenario 5: Positive - Create a Principal Policy for Compliance Managers
**Description:** Define a principal policy that allows Compliance Managers to view and monitor user roles.

**Policy Definition:**

```json
{
  "apiVersion": "api.agsiri.dev/v1",
  "principalPolicy": {
    "principal": "compliance_manager",
    "version": "v1",
    "rules": [
      {
        "resource": "iam:roles",
        "actions": [
          {
            "action": "view",
            "effect": "EFFECT_ALLOW"
          },
          {
            "action": "monitor",
            "effect": "EFFECT_ALLOW"
          }
        ]
      }
    ]
  }
}
```

**Curl Command:**

```bash
curl -X POST http://localhost:3592/orgs/{orgId}/policies \
-H "Content-Type: application/json" \
-d '{
  "apiVersion": "api.agsiri.dev/v1",
  "principalPolicy": {
    "principal": "compliance_manager",
    "version": "v1",
    "rules": [
      {
        "resource": "iam:roles",
        "actions": [
          {
            "action": "view",
            "effect": "EFFECT_ALLOW"
          },
          {
            "action": "monitor",
            "effect": "EFFECT_ALLOW"
          }
        ]
      }
    ]
  }
}'
```

#### Scenario 6: Negative - Principal Policy with Undefined Actions
**Description:** Attempt to create a principal policy with an undefined action.

**Curl Command:**

```bash
curl -X POST http://localhost:3592/orgs/{orgId}/policies \
-H "Content-Type: application/json" \
-d '{
  "apiVersion": "api.agsiri.dev/v1",
  "principalPolicy": {
    "principal": "compliance_manager",
    "version": "v1",
    "rules": [
      {
        "resource": "iam:roles",
        "actions": [
          {
            "action": "undefined_action",
            "effect": "EFFECT_ALLOW"
          }
        ]
      }
    ]
  }
}'
```

### 4. Exported Variables

#### Scenario 7: Positive - Define Exported Variables for Notification Templates
**Description:** Create exported variables for notification templates used across the organization.

**Policy Definition:**

```json
{
  "apiVersion": "api.agsiri.dev/v1",
  "exportVariables": {
    "name": "notification_templates",
    "definitions": {
      "welcomeTemplate": "Welcome, {{user.name}}!",
      "reminderTemplate": "Don't forget to check your updates, {{user.name}}!"
    }
  }
}
```

**Curl Command:**

```bash
curl -X POST http://localhost:3592/orgs/{orgId}/policies \
-H "Content-Type: application/json" \
-d '{
  "apiVersion": "api.agsiri.dev/v1",
  "exportVariables": {
    "name": "notification_templates",
    "definitions": {
      "welcomeTemplate": "Welcome, {{user.name}}!",
      "reminderTemplate": "Don'\''t forget to check your updates, {{user.name}}!"
    }
  }
}'
```

#### Scenario 8: Negative - Exported Variables with Missing Name
**Description:** Attempt to define exported variables without specifying the `name` field.

**Curl Command:**

```bash
curl -X POST http://localhost:3592/orgs/{orgId}/policies \
-H "Content-Type: application/json" \
-d '{
  "apiVersion": "api.agsiri.dev/v1",
  "exportVariables": {
    "definitions": {
      "welcomeTemplate": "Welcome, {{user.name}}!",
      "reminderTemplate": "Don'\''t forget to check your updates, {{user.name}}!"
    }
  }
}'
```

### 5. Combined Scenario

#### Scenario 9: Positive - Create a Complex Policy with Derived Roles, Resource Policies, and Exported Variables
**Description:** Combine all policy types to define a policy that includes derived roles, resource policies, and exported variables.

**Policy Definition:**

```json
{
  "apiVersion": "api.agsiri.dev/v1",
  "version": "v1",
  "derivedRoles": {
    "name": "complex_role",
    "definitions": [
      {
        "name": "dataManager",
        "parentRoles": ["user"],
        "condition": {
          "match": {
            "expr": "request.resource.attr.manager == request.principal.id"
          }
        }
      }
    ]
  },
  "exportVariables": {
    "name": "resource_labels",
    "definitions": {
      "envLabel": "{{resource.env}}",
      "ownerLabel": "{{resource.owner}}"
    }
  },
  "resourcePolicy": {
    "resource": "data:repository",
    "rules": [
      {
        "actions": ["create", "delete"],
        "effect": "EFFECT_ALLOW",
        "derivedRoles": ["dataManager"]
      }
    ]
  }
}
```

**Curl Command:**

```bash
curl -X POST http://localhost:3592/orgs/{orgId}/policies \
-H "Content-Type: application/json" \
-d '{
  "apiVersion": "api.agsiri.dev/v1",
  "version

": "v1",
  "derivedRoles": {
    "name": "complex_role",
    "definitions": [
      {
        "name": "dataManager",
        "parentRoles": ["user"],
        "condition": {
          "match": {
            "expr": "request.resource.attr.manager == request.principal.id"
          }
        }
      }
    ]
  },
  "exportVariables": {
    "name": "resource_labels",
    "definitions": {
      "envLabel": "{{resource.env}}",
      "ownerLabel": "{{resource.owner}}"
    }
  },
  "resourcePolicy": {
    "resource": "data:repository",
    "rules": [
      {
        "actions": ["create", "delete"],
        "effect": "EFFECT_ALLOW",
        "derivedRoles": ["dataManager"]
      }
    ]
  }
}'
```

#### Scenario 10: Negative - Complex Policy with Conflicting Rules
**Description:** Attempt to create a policy that includes conflicting rules for the same resource.

**Curl Command:**

```bash
curl -X POST http://localhost:3592/orgs/{orgId}/policies \
-H "Content-Type: application/json" \
-d '{
  "apiVersion": "api.agsiri.dev/v1",
  "version": "v1",
  "resourcePolicy": {
    "resource": "data:repository",
    "rules": [
      {
        "actions": ["create"],
        "effect": "EFFECT_ALLOW",
        "roles": ["user"]
      },
      {
        "actions": ["create"],
        "effect": "EFFECT_DENY",
        "roles": ["user"]
      }
    ]
  }
}'
```

---

These scenarios and corresponding `curl` commands can be used to test the various functionalities of the Agsiri Smart Policy Engine across derived roles, resource policies, principal policies, and exported variables.
