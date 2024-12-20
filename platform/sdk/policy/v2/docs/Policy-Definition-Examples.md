
### 1. Policy to Allow Users to View Their Own Listings

**Description:** Users can view their own farm listings.

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
        "actions": ["view"],
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

### 2. Policy to Allow Farm SMEs to Assess ESG Reports

**Description:** Farm SMEs can assess ESG reports.

```bash
curl -X POST http://localhost:3592/orgs/{orgId}/policies \
-H "Content-Type: application/json" \
-d '{
  "apiVersion": "api.agsiri.dev/v1",
  "version": "v1",
  "resourcePolicy": {
    "resource": "farming:report",
    "rules": [
      {
        "actions": ["assess"],
        "effect": "EFFECT_ALLOW",
        "roles": ["farm_sme"]
      }
    ]
  }
}'
```

### 3. Policy to Deny Deletion of Public Farms by Sellers

**Description:** Sellers cannot delete farms marked as public.

```bash
curl -X POST http://localhost:3592/orgs/{orgId}/policies \
-H "Content-Type: application/json" \
-d '{
  "apiVersion": "api.agsiri.dev/v1",
  "version": "v1",
  "resourcePolicy": {
    "resource": "farm:object",
    "rules": [
      {
        "actions": ["delete"],
        "effect": "EFFECT_DENY",
        "roles": ["seller"],
        "condition": {
          "match": {
            "expr": "request.resource.attr.public == true"
          }
        }
      }
    ]
  }
}'
```

### 4. Policy to Allow Compliance Managers to Monitor Incidents

**Description:** Compliance Managers can monitor incidents within the organization.

```bash
curl -X POST http://localhost:3592/orgs/{orgId}/policies \
-H "Content-Type: application/json" \
-d '{
  "apiVersion": "api.agsiri.dev/v1",
  "version": "v1",
  "principalPolicy": {
    "principal": "compliance_manager",
    "rules": [
      {
        "resource": "incident:object",
        "actions": [
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

### 5. Policy to Export Variables for Custom Labels

**Description:** Export variables for custom labels used in notifications.

```bash
curl -X POST http://localhost:3592/orgs/{orgId}/policies \
-H "Content-Type: application/json" \
-d '{
  "apiVersion": "api.agsiri.dev/v1",
  "exportVariables": {
    "name": "custom_labels",
    "definitions": {
      "priorityLabel": "{{resource.priority}}",
      "statusLabel": "{{resource.status}}"
    }
  }
}'
```

### 6. Policy to Allow Investors to Subscribe to Offerings

**Description:** Investors can subscribe to offerings in the marketplace.

```bash
curl -X POST http://localhost:3592/orgs/{orgId}/policies \
-H "Content-Type: application/json" \
-d '{
  "apiVersion": "api.agsiri.dev/v1",
  "version": "v1",
  "resourcePolicy": {
    "resource": "marketplace:offering",
    "rules": [
      {
        "actions": ["subscribe"],
        "effect": "EFFECT_ALLOW",
        "roles": ["investor"]
      }
    ]
  }
}'
```

### 7. Policy to Allow Executives to View Financial Data

**Description:** Executives can view financial data dashboards.

```bash
curl -X POST http://localhost:3592/orgs/{orgId}/policies \
-H "Content-Type: application/json" \
-d '{
  "apiVersion": "api.agsiri.dev/v1",
  "version": "v1",
  "resourcePolicy": {
    "resource": "dashboard:financial",
    "rules": [
      {
        "actions": ["view"],
        "effect": "EFFECT_ALLOW",
        "roles": ["executive"]
      }
    ]
  }
}'
```

### 8. Policy to Deny Farm Managers from Sharing Restricted Data Rooms

**Description:** Farm Managers cannot share data rooms with a restricted access level.

```bash
curl -X POST http://localhost:3592/orgs/{orgId}/policies \
-H "Content-Type: application/json" \
-d '{
  "apiVersion": "api.agsiri.dev/v1",
  "version": "v1",
  "resourcePolicy": {
    "resource": "dataroom:object",
    "rules": [
      {
        "actions": ["share"],
        "effect": "EFFECT_DENY",
        "roles": ["farm_manager"],
        "condition": {
          "match": {
            "expr": "request.resource.attr.accessLevel == \"restricted\""
          }
        }
      }
    ]
  }
}'
```

### 9. Policy to Allow Campaign Managers to Create and Update Campaigns

**Description:** Campaign Managers can create and update marketing campaigns.

```bash
curl -X POST http://localhost:3592/orgs/{orgId}/policies \
-H "Content-Type: application/json" \
-d '{
  "apiVersion": "api.agsiri.dev/v1",
  "version": "v1",
  "resourcePolicy": {
    "resource": "campaign:object",
    "rules": [
      {
        "actions": ["create", "update"],
        "effect": "EFFECT_ALLOW",
        "roles": ["campaign_manager"]
      }
    ]
  }
}'
```

### 10. Policy to Allow Farm SMEs to View ESG Assessments

**Description:** Farm SMEs can view ESG assessments.

```bash
curl -X POST http://localhost:3592/orgs/{orgId}/policies \
-H "Content-Type: application/json" \
-d '{
  "apiVersion": "api.agsiri.dev/v1",
  "version": "v1",
  "resourcePolicy": {
    "resource": "farming:assessment",
    "rules": [
      {
        "actions": ["view"],
        "effect": "EFFECT_ALLOW",
        "roles": ["farm_sme"]
      }
    ]
  }
}'
```

---
