## Smart Policy Engine - Message Formats and Sample Payload (Positve/Negative)
The valid payloads for policy creation in the Agsiri Smart Policy Engine vary depending on the policy type. Below are examples of valid (positive) and invalid (negative) payloads for each of the four policy types: Derived Roles, Resource Policies, Principal Policies, and Exported Variables.

### 1. **Derived Roles Policy**

#### Positive Example:
```json
{
  "apiVersion": "api.agsiri.dev/v1",
  "version": "v1",
  "derivedRoles": {
    "name": "project_manager_roles",
    "definitions": [
      {
        "name": "project_owner",
        "parentRoles": ["manager"],
        "condition": {
          "match": {
            "expr": "request.resource.attr.owner == request.principal.id"
          }
        }
      },
      {
        "name": "project_reviewer",
        "parentRoles": ["manager"],
        "condition": {
          "match": {
            "expr": "request.resource.attr.reviewer == request.principal.id"
          }
        }
      }
    ]
  }
}
```

#### Negative Example:
```json
{
  "apiVersion": "api.agsiri.dev/v1",
  "version": "v1",
  "derivedRoles": {
    "name": "invalid_roles",
    "definitions": [
      {
        "name": "",
        "parentRoles": ["manager"],
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
*Invalid because the `name` field is empty.*

### 2. **Resource Policies**

#### Positive Example:
```json
{
  "apiVersion": "api.agsiri.dev/v1",
  "version": "v1",
  "resourcePolicy": {
    "resource": "farm:object",
    "rules": [
      {
        "actions": ["view", "update"],
        "effect": "EFFECT_ALLOW",
        "roles": ["user"]
      },
      {
        "actions": ["delete"],
        "effect": "EFFECT_DENY",
        "roles": ["user"]
      }
    ],
    "schemas": {
      "resourceSchema": {
        "ref": "agsiri:///farm_object.json"
      }
    }
  }
}
```

#### Negative Example:
```json
{
  "apiVersion": "api.agsiri.dev/v1",
  "version": "v1",
  "resourcePolicy": {
    "resource": "farm:object",
    "rules": [
      {
        "actions": ["view", "update"],
        "effect": "ALLOW",  // Invalid value, should be "EFFECT_ALLOW"
        "roles": ["user"]
      }
    ],
    "schemas": {
      "resourceSchema": {
        "ref": "agsiri:///farm_object.json"
      }
    }
  }
}
```
*Invalid because the `effect` field is incorrect (should be "EFFECT_ALLOW").*

### 3. **Principal Policies**

#### Positive Example:
```json
{
  "apiVersion": "api.agsiri.dev/v1",
  "version": "v1",
  "principalPolicy": {
    "principal": "user",
    "rules": [
      {
        "resource": "farm:object",
        "actions": [
          {
            "action": "view",
            "effect": "EFFECT_ALLOW"
          }
        ]
      },
      {
        "resource": "farm:object",
        "actions": [
          {
            "action": "delete",
            "effect": "EFFECT_DENY"
          }
        ]
      }
    ]
  }
}
```

#### Negative Example:
```json
{
  "apiVersion": "api.agsiri.dev/v1",
  "version": "v1",
  "principalPolicy": {
    "principal": "user",
    "rules": [
      {
        "resource": "",
        "actions": [
          {
            "action": "view",
            "effect": "EFFECT_ALLOW"
          }
        ]
      }
    ]
  }
}
```
*Invalid because the `resource` field is empty.*

### 4. **Exported Variables**

#### Positive Example:
```json
{
  "apiVersion": "api.agsiri.dev/v1",
  "version": "v1",
  "exportVariables": {
    "name": "common_variables",
    "definitions": {
      "environment": "production",
      "project": "AgsiriPlatform"
    }
  }
}
```

#### Negative Example:
```json
{
  "apiVersion": "api.agsiri.dev/v1",
  "version": "v1",
  "exportVariables": {
    "name": "",
    "definitions": {
      "environment": "production",
      "project": 1234  // Invalid type, should be a string
    }
  }
}
```
*Invalid because the `name` field is empty and the `project` field is not a string.*

### Summary

Each of the policy types has specific requirements for valid payloads. The examples above demonstrate correct and incorrect configurations, focusing on key aspects such as required fields, correct data types, and valid values. When creating these policies, ensuring that each field adheres to the expected format is crucial for the proper functioning of the Agsiri Smart Policy Engine.
