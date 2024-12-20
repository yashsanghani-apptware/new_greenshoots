### Roles for Agsiri Application

1. **Administrator**
   - Full access to manage users, roles, policies, and all resources.

2. **Compliance Manager**
   - Oversees regulatory compliance and access control, primarily monitoring and viewing resources.

3. **Seller**
   - Manages property listings, including creating, updating, and viewing farms and listings.

4. **Buyer**
   - Views and assesses property listings, subscribing to offerings in the marketplace.

5. **Farm SME (Subject Matter Expert)**
   - Conducts farm assessments and due diligence, primarily focused on ESG assessments and reports.

6. **Farm Manager**
   - Manages daily farm operations, including managing data rooms, cabinets, and files.

7. **Investor**
   - Subscribes to offerings and manages portfolios, executes trades in the trading service.

8. **Campaign Manager**
   - Designs and launches marketing campaigns, manages the lifecycle of campaigns.

9. **Executive**
   - Reviews financial data and dashboards, primarily focused on viewing reports and notifications.

10. **Incident Manager**
    - Manages incidents and cases within the incident and case management service.

---

### 10 Resource Policies for Agsiri Application

#### 1. **Resource Policy for Administrator to Manage Users**

```yaml
apiVersion: api.agsiri.dev/v1
version: v1
resourcePolicy:
  resource: "iam:user"
  rules:
    - actions: ["create", "view", "update", "delete"]
      effect: "EFFECT_ALLOW"
      roles: ["administrator"]
```

#### 2. **Resource Policy for Compliance Manager to View Incidents**

```yaml
apiVersion: api.agsiri.dev/v1
version: v1
resourcePolicy:
  resource: "incident:object"
  rules:
    - actions: ["view", "monitor"]
      effect: "EFFECT_ALLOW"
      roles: ["compliance_manager"]
```

#### 3. **Resource Policy for Seller to Manage Farm Listings**

```yaml
apiVersion: api.agsiri.dev/v1
version: v1
resourcePolicy:
  resource: "marketplace:listing"
  rules:
    - actions: ["create", "update", "view"]
      effect: "EFFECT_ALLOW"
      roles: ["seller"]
```

#### 4. **Resource Policy for Buyer to View and Subscribe to Offerings**

```yaml
apiVersion: api.agsiri.dev/v1
version: v1
resourcePolicy:
  resource: "marketplace:offering"
  rules:
    - actions: ["view", "subscribe"]
      effect: "EFFECT_ALLOW"
      roles: ["buyer"]
```

#### 5. **Resource Policy for Farm SME to Conduct ESG Assessments**

```yaml
apiVersion: api.agsiri.dev/v1
version: v1
resourcePolicy:
  resource: "farming:assessment"
  rules:
    - actions: ["view", "assess"]
      effect: "EFFECT_ALLOW"
      roles: ["farm_sme"]
```

#### 6. **Resource Policy for Farm Manager to Manage Data Rooms**

```yaml
apiVersion: api.agsiri.dev/v1
version: v1
resourcePolicy:
  resource: "dataroom:object"
  rules:
    - actions: ["create", "view", "update", "delete"]
      effect: "EFFECT_ALLOW"
      roles: ["farm_manager"]
```

#### 7. **Resource Policy for Investor to Execute Trades**

```yaml
apiVersion: api.agsiri.dev/v1
version: v1
resourcePolicy:
  resource: "trading:trade"
  rules:
    - actions: ["execute", "view"]
      effect: "EFFECT_ALLOW"
      roles: ["investor"]
```

#### 8. **Resource Policy for Campaign Manager to Manage Campaigns**

```yaml
apiVersion: api.agsiri.dev/v1
version: v1
resourcePolicy:
  resource: "marketplace:campaign"
  rules:
    - actions: ["create", "update", "view"]
      effect: "EFFECT_ALLOW"
      roles: ["campaign_manager"]
```

#### 9. **Resource Policy for Executive to View Financial Dashboards**

```yaml
apiVersion: api.agsiri.dev/v1
version: v1
resourcePolicy:
  resource: "dashboard:financial"
  rules:
    - actions: ["view"]
      effect: "EFFECT_ALLOW"
      roles: ["executive"]
```

#### 10. **Resource Policy for Incident Manager to Manage Cases**

```yaml
apiVersion: api.agsiri.dev/v1
version: v1
resourcePolicy:
  resource: "incident:case"
  rules:
    - actions: ["create", "view", "update", "delete", "manage"]
      effect: "EFFECT_ALLOW"
      roles: ["incident_manager"]
```

---

These roles and policies are designed to provide specific access controls for different user groups within the Agsiri application. The roles dictate the access levels, while the resource policies enforce what actions each role can perform on the respective resources. These policies can be easily implemented using the Agsiri Smart Policy Engine to ensure secure and efficient access control.
