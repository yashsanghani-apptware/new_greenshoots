# Agsiri Smart Policy Engine Developer Guide

## Introduction

The Agsiri Smart Policy Engine is a robust framework designed to enforce fine-grained access control across various services and resources within the Agsiri ecosystem. This guide is intended for developers who need to implement and manage policies using the Agsiri Smart Policy Engine. The guide covers the four primary policy types—Derived Roles, Resource Policies, Principal Policies, and Exported Variables—and illustrates their application through detailed scenarios aligned with the Agsiri Policy Matrix.

## Overview of Policy Types

The Agsiri Smart Policy Engine leverages four distinct types of policies:

1. **Derived Roles**: Context-aware roles that are dynamically assigned based on runtime conditions.
2. **Resource Policies**: Define permissions for specific resources based on roles and conditions.
3. **Principal Policies**: Override default permissions for individual users, allowing for granular control.
4. **Exported Variables**: Reusable conditions that can be imported across multiple policies to reduce redundancy and ensure consistency.

These policy types work together to create a flexible and powerful access control system, enabling precise control over who can do what, when, and under what circumstances.

## Policy Matrix for Agsiri Services and Roles

The Policy Matrix is a crucial reference for understanding how different roles interact with various services and resources within the Agsiri ecosystem. It maps the permissions across roles and services, providing a clear view of what each role is allowed to do. Below is a high-level summary of the roles and services:

### **Roles**:
- **Administrator**: Full access across the system.
- **Compliance Manager**: Oversees regulatory compliance.
- **Seller**: Manages property listings.
- **Buyer**: Views and assesses property listings.
- **Farm SME**: Conducts farm assessments.
- **Farm Manager**: Manages farm operations.
- **Investor**: Manages investments and subscriptions.
- **Campaign Manager**: Manages marketing campaigns.
- **Executive**: Accesses financial data and dashboards.

### **Services and Resources**:
- **IAM and Policy Service**: Users, Roles, Policies.
- **Agsiri Marketplace Service**: Farms, Listings, Offerings, Campaigns, Subscriptions.
- **Farming Service**: ESG Assessments, Reports.
- **Notification and Actions Service**: Notifications, Actions, Events.
- **Trading Service**: Trades.
- **Workflow Service**: Workflows, Tasks, Functions.
- **Incident and Case Management Service**: Incidents, Cases.
- **Data Room Service**: Data Rooms, Cabinets, Files, Mailboxes, Personalized Notifications.

## Example ARIs for All Services and Resources

To interact with resources, each resource is identified using an Agsiri Resource Identifier (ARI). Below are examples of ARIs for various services:

- **IAM and Policy Service**:
  - Users: `ari:agsiri:iam:us:123456789012:user/JohnDoe`
  - Roles: `ari:agsiri:iam:us:123456789012:role/AdminRole`
  - Policies: `ari:agsiri:iam:us:123456789012:policy/Policy123`

- **Agsiri Marketplace Service**:
  - Farms: `ari:agsiri:marketplace:us:123456789012:farm/Farm123`
  - Listings: `ari:agsiri:marketplace:us:123456789012:listing/FarmListing123`
  - Offerings: `ari:agsiri:marketplace:us:123456789012:offering/Offering123`
  - Campaigns: `ari:agsiri:marketplace:us:123456789012:campaign/Campaign123`
  - Subscriptions: `ari:agsiri:marketplace:us:123456789012:subscription/Subscription123`

- **Farming Service**:
  - ESG Assessments: `ari:agsiri:farming:us:123456789012:assessment/Assessment123`
  - Reports: `ari:agsiri:farming:us:123456789012:report/Report123`

- **Notification and Actions Service**:
  - Notifications: `ari:agsiri:notifications:us:123456789012:notification/Notification123`
  - Actions: `ari:agsiri:notifications:us:123456789012:action/Action123`
  - Events: `ari:agsiri:notifications:us:123456789012:event/Event123`

- **Trading Service**:
  - Trades: `ari:agsiri:trading:us:123456789012:trade/Trade123`

- **Workflow Service**:
  - Workflows: `ari:agsiri:workflow:us:123456789012:workflow/Workflow123`
  - Tasks: `ari:agsiri:workflow:us:123456789012:task/Task123`
  - Functions: `ari:agsiri:workflow:us:123456789012:function/Function123`

- **Incident and Case Management Service**:
  - Incidents: `ari:agsiri:incidents:us:123456789012:incident/Incident123`
  - Cases: `ari:agsiri:incidents:us:123456789012:case/Case123`

- **Data Room Service**:
  - Data Rooms: `ari:agsiri:dataroom:us:123456789012:dataroom/DataRoom123`
  - Cabinets: `ari:agsiri:dataroom:us:123456789012:cabinet/Cabinet123`
  - Files: `ari:agsiri:dataroom:us:123456789012:file/File123`
  - Mailboxes: `ari:agsiri:dataroom:us:123456789012:mailbox/Mailbox123`
  - Personalized Notifications: `ari:agsiri:dataroom:us:123456789012:notification/Notification123`

## Detailed Explanation of Policy Types

### 1. **Derived Roles**

Derived roles allow you to augment traditional roles with contextual information, enabling dynamic role assignment at runtime. These roles are crucial for enforcing policies that adapt to the user's context, such as their location, certification status, or other attributes.

#### **Scenario: Farm Management and Compliance**

In the Agsiri Marketplace Service, a Farm SME must conduct farm assessments, but their permissions are contextually limited based on the farm's location and the SME's certifications.

**Derived Role Definition**:
```yaml
derivedRoles:
  name: farm_sme_roles
  definitions:
    - name: farm_assessor
      parentRoles: ["Farm SME"]
      condition:
        match:
          expr: request.resource.attr.location == "California" && P.attr.certifiedAssessor == true
```

**Explanation**:
- **Role Name**: `farm_assessor` is a derived role based on the `Farm SME` role.
- **Condition**: This role is only active if the farm is in California and the SME is certified.

This role ensures that only certified assessors can perform assessments in specific regions, maintaining compliance and security.

### 2. **Resource Policies**

Resource policies define the permissions for specific resources. These policies include rules that specify which actions are allowed or denied based on roles, derived roles, and conditions.

#### **Scenario: Controlled Access to Data Rooms**

Different users (e.g., Investors, Executives, Farm Managers) need varying levels of access to sensitive data rooms within the Data Room Service.

**Resource Policy Definition**:
```yaml
resourcePolicy:
  resource: "dataroom:DataRoom123"
  version: "v1"
  rules:
    - actions: ["view", "download"]
      effect: EFFECT_ALLOW
      roles: ["Investor", "Executive"]
      condition:
        match:
          expr: R.attr.sensitivityLevel == "confidential" && P.attr.clearanceLevel >= 3
    - actions: ["upload", "delete"]
      effect: EFFECT_DENY
      roles: ["Investor", "Executive"]
```

**Explanation**:
- **Allowed Actions**: Viewing and downloading are permitted for `Investor` and `Executive` roles if the data room's sensitivity level is `confidential` and the user's clearance level is 3 or higher.
- **Denied Actions**: Uploading and deleting files are denied to ensure data integrity.

This policy ensures that sensitive data rooms are accessed only by authorized personnel and that data integrity is preserved.

### 3. **Principal Policies**

Principal policies allow you to override default permissions for specific users, providing granular control over individual access rights.

#### **Scenario: Executive Dashboard Access**

An executive should have access to a high-level dashboard that aggregates data across the organization, but this access should be restricted based on specific criteria, such as geographic location or time of access.

**Principal Policy Definition**:
```yaml
principalPolicy:
  principal: "exec_jane_doe"
  version: "v1"
  rules:
    - resource: "dashboard:financial"
      actions:
        - action: "view"
          effect: EFFECT_ALLOW
          condition:
            match:
              expr: now().getDayOfWeek() != 0 && P.attr.geography == "EMEA"
```

**Explanation**:
- **Condition**: The executive can view the financial dashboard only on weekdays and when accessing it from the EMEA region.

Principal policies are vital for setting restrictions based on time, location, or specific user attributes, enhancing security.

### 4. **Exported Variables**

Exported variables enable reusable conditions across multiple policies, reducing redundancy and ensuring consistency. These variables can be imported into resource, principal, or derived roles policies.

#### **Scenario: Consistent Compliance Checks**

In Agsiri, compliance checks often need to be applied consistently across different services, such as ESG assessments and trading activities.

**Exported Variables Definition**:


```yaml
exportVariables:
  name: compliance_checks
  definitions:
    is_in_compliance: request.resource.attr.complianceStatus == "compliant"
    high_risk_activity: P.attr.riskLevel >= 4
```

**Explanation**:
- **Variable `is_in_compliance`**: Checks if the resource's compliance status is marked as compliant.
- **Variable `high_risk_activity`**: Flags activities as high risk if the user's risk level is 4 or higher.

These variables can be imported into multiple policies to ensure consistent enforcement of compliance checks.

## Policy Scenarios Based on the Agsiri Policy Matrix

### **Scenario 1: Incident Management by Compliance Managers**

Compliance Managers need to view and monitor incidents across the organization but do not have full control over incident management.

**Resource Policy Example**:
```yaml
resourcePolicy:
  resource: "incident:Incident123"
  version: "v1"
  rules:
    - actions: ["view", "monitor"]
      effect: EFFECT_ALLOW
      roles: ["Compliance Manager"]
      condition:
        match:
          expr: P.attr.department == R.attr.responsibleDepartment
```

**Explanation**:
- **Condition**: Compliance Managers can only view or monitor incidents within their department's responsibility.

### **Scenario 2: Farm SME Assessing Farms**

Farm SMEs need access to assess farms, but this access should be restricted to certified SMEs in specific regions.

**Derived Role Example**:
```yaml
derivedRoles:
  name: farm_sme_roles
  definitions:
    - name: certified_farm_assessor
      parentRoles: ["Farm SME"]
      condition:
        match:
          expr: P.attr.certifications.exists(c, c == "FarmAssessor") && R.attr.region == "Southwest"
```

**Explanation**:
- **Condition**: The role is activated only if the SME has the necessary certification and the farm is in the Southwest region.

### **Scenario 3: Investor Access to Offerings**

Investors need to subscribe to offerings but should not be able to create or delete them.

**Resource Policy Example**:
```yaml
resourcePolicy:
  resource: "offering:Offering123"
  version: "v1"
  rules:
    - actions: ["subscribe"]
      effect: EFFECT_ALLOW
      roles: ["Investor"]
    - actions: ["create", "delete"]
      effect: EFFECT_DENY
      roles: ["Investor"]
```

**Explanation**:
- **Allowed Actions**: Investors can subscribe to offerings.
- **Denied Actions**: Investors cannot create or delete offerings, ensuring the integrity of the investment process.

### **Scenario 4: Executive Access to Financial Dashboards**

Executives require access to financial dashboards but only within specific time frames and regions.

**Principal Policy Example**:
```yaml
principalPolicy:
  principal: "exec_jane_doe"
  version: "v1"
  rules:
    - resource: "dashboard:financial"
      actions:
        - action: "view"
          effect: EFFECT_ALLOW
          condition:
            match:
              expr: now().getHours() >= 9 && now().getHours() <= 17 && P.attr.geography == "NorthAmerica"
```

**Explanation**:
- **Condition**: The executive can view the financial dashboard only during business hours in the North American region.

---

## Conclusion

The Agsiri Smart Policy Engine provides a versatile and powerful framework for managing access control across a wide range of services and resources. By leveraging the four key policy types—Derived Roles, Resource Policies, Principal Policies, and Exported Variables—you can create dynamic, context-aware policies that align with the needs of your organization. The detailed scenarios and examples provided in this guide illustrate how these policies can be implemented to enforce the complex access control rules outlined in the Agsiri Policy Matrix, ensuring that the right users have the right access at the right time.
