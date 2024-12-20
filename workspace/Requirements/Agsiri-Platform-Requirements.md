# Business Flows and Requirements  for Agsiri Platform Scenarios

## Common Services (Accessible from any screen)

1. **Two-Way Conversational AI Services**
   - **Description:** Provides messaging services to engage with subscribers via omni-channels like chat, email, SMS, WhatsApp, and in-app messaging.
   - **Features:** Real-time chat, automated email responses, SMS alerts, WhatsApp notifications, in-app messaging, and integrated support ticket creation.

2. **Workflow Service**
   - **Description:** Manages the creation and execution of workflows across the platform.
   - **Features:** Workflow definition tools, customizable workflow templates, status tracking, and notifications.

3. **Identity, Access, and Monitoring Service**
   - **Description:** Includes mechanisms for ID and document verification, KYC validation, screening, and ongoing due diligence functions.
   - **Features:** User identification tools, document verification processes, KYC validation workflows, screening protocols, and continuous monitoring.

4. **Event Notification and Actions Service**
   - **Description:** Provides robust mechanisms for system-wide event registry, pub/sub, and actions framework for automation and escalations.
   - **Features:** Event registry, subscription management, automation triggers, and escalation workflows.

5. **Data Room Service**
   - **Description:** Vault for managing the lifecycle of transactional documents, e-signing, mailboxes, and notifications for subscribers.
   - **Features:** Secure document storage, document lifecycle management, electronic signatures, integrated mailboxes, and notification systems.

6. **Campaigning Service**
   - **Description:** Provides intelligent marketing services for launching campaigns for investment opportunities.
   - **Features:** Campaign creation tools, audience segmentation, automated delivery, analytics, and feedback collection.

7. **Alerting and Case Management Services**
   - **Description:** Provides mechanisms to alert any exceptions or violations and escalate them for investigation into cases.
   - **Features:** Exception alerting, case creation, workflow management for investigations, and escalation protocols.

## Business Flows

### Investor Flow

#### Landing Page
- **Provides:** Overview of available investment opportunities, latest news, and personalized recommendations.
- **Features:** Highlighted investments, latest market news, personalized investment recommendations, and user-specific alerts.

#### Portfolio
1. **Summary**
   - **Description:** Displays a brief overview of the investor's total investment, number of properties, and performance metrics.
   - **Features:** Total portfolio value, number of properties invested in, year-to-date (YTD) income, and performance trends.

2. **List of Investments**
   - **Description:** Detailed view of each investment with summaries, descriptions, images, videos, operational metrics, and future plans.
   - **Features:** Individual investment details, historical performance data, multimedia content, and operational updates.

#### Offerings
1. **Current Offerings**
   - **Description:** Detailed descriptions, reasons to invest, images, videos, maps, disclosures, property documents, operational metrics, and plans for development.
   - **Features:** Comprehensive offering details, investment thesis, multimedia content, legal documents, and subscription options.

2. **Subscription**
   - **Description:** Investors can subscribe to shares and view detailed information about each offering.
   - **Features:** Subscription form, share allocation details, investment agreements, and payment processing.


### Farm Onboarding Flow

#### Types of Shares
- **Description:** Descriptions of preferential and ordinary shares, including their benefits and how they convert.
- **Features:** Share type definitions, benefit explanations, and conversion rules.

#### Share Price
- **Description:** Explanation of fixed and variable pricing models, and initial share price determination.
- **Features:** Pricing model details, calculation examples, and pricing scenarios.

#### Number of Shares
- **Description:** Calculation based on farm value and share price, with examples and scenarios.
- **Features:** Share calculation methods, illustrative examples, and scenario analysis.


### Trading Flow

#### Buying and Selling Shares
- **Description:** Process for initiating and completing the sale of shares, including notifications and transaction fees.
- **Features:** Share trading interface, transaction notifications, fee breakdowns, and transaction history.


### Publishing Flow

#### Campaigns and Newsletters
- **Description:** Creating, publishing, and managing content for campaigns and newsletters.
- **Features:** Content creation tools, scheduling options, campaign analytics, and user engagement tracking.


### User Onboarding Flow

**Scenario: User Sign Up**
- **Flow Description:** 
   - Any user can sign up on the platform.
   - Depending on the user profile, the system takes them through different onboarding flows.
   - Examples:
     - **Investor:** 1) Suitability assessment, 2) Investor validation, 3) ID and document verification, 4) KYC checks.
     - **Realtor:** Verification of licenses and terms of use agreement.
   - Without completion of the necessary workflows, users only access public assets and cannot see offers or campaigns.


### Property Listing Flow

**Scenario: Farm Listing**

**Path 1:** 
- **Flow Description:** Platform AI scouts properties matching the Investment Thesis.
- **Steps:**
  1. AI assesses property against criteria.
  2. Successful properties queued for Analyst review.
  3. Analyst conducts due diligence.
  4. Upon approval, property listed on the platform.

**Path 2:**
- **Flow Description:** Analysts work with Realtors to identify and list properties.
- **Steps:**
  1. Realtors submit properties.
  2. Analysts conduct due diligence.
  3. Property listed upon completion of the workflow.


### Investment Offering Flow

**Scenario: Create Offering**
- **Flow Description:** Weekly review of listings by Investment Committee.
- **Steps:**
  1. Committee selects listings for high return potential.
  2. Offer Creation workflow initiated.
  3. Assess offer price, number of shares, per share price, subscription agreement, and private placement memorandum.
  4. Legal document review workflow triggered.
  5. Campaign Launch workflow initiated upon completion.


### Marketing Campaign Flow

**Scenario: Launch Campaign**
- **Flow Description:** Sending marketing campaigns to opted-in users.
- **Steps:**
  1. Campaign creation and scheduling.
  2. Tracking of message delivery and user responses.
  3. Campaign analytics and feedback collection.


### Subscription Flow

**Scenario: Subscription Flow**
- **Flow Description:** Users subscribe in response to campaigns.
- **Steps:**
  1. Subscription workflow execution.
  2. Requirements documentation and funding transaction.
  3. Transaction Closing Scenario triggered upon completion.


### Transaction Closure Flow

**Scenario: Transaction Close**
- **Flow Description:** Completion of legal steps to close the transaction.
- **Steps:**
  1. Document signing.
  2. Execution of legal steps.
  3. Official closing of the transaction.


### Performance Review Flow

**Scenario: Quarterly Analyst Reviews**
- **Flow Description:** Regular performance reviews of fully subscribed assets.
- **Steps:**
  1. Analyst collects performance data.
  2. Quarterly performance report creation.
  3. Notification to all subscribers.

**Scenario: Annual Performance Review**
- **Flow Description:** Annual review of farm performance.
- **Steps:**
  1. System triggers review 30 days before the anniversary.
  2. Analyst collects and compiles data.
  3. Report publication and Income Distribution Workflow initiation.


### Farm Management Flow

**Scenario: Leasing the Farm**
- **Flow Description:** Platform leases farm assets to a management company.
- **Steps:**
  1. Leasing agreement initiation.
  2. Farm Manager oversees farm operations.
  3. Regular updates via Farm Monitoring workflow.


### Income Distribution Flow

**Scenario: Income Distribution**
- **Flow Description:** Distribution of income generated from the asset.
- **Steps:**
  1. Year-end income distribution.
  2. Justification and annual report issuance if no income generated.


### ESG Assessment Flow

**Scenario: ESG Assessment**
- **Flow Description:** Quarterly ESG assessment.
- **Steps:**
  1. ESG Assessment Workflow initiation.
  2. Detailed ESG evaluation.
  3. ESG Corrections workflow for remediation if needed.

**Scenario: Annual ESG Report**
- **Flow Description:** Annual ESG reporting.
- **Steps:**
  1. System triggers assessment 30 days before the anniversary.
  2. ESG performance measurement.
  3. Report creation and publication.


### Compliance and Security Flow

**Scenario: Intelligence Case Investigation**
- **Flow Description:** Handling exceptions and violations.
- **Steps:**
  1. Case Investigation Workflow initiation.
  2. Intelligent tool usage for resolution or escalation.

**Scenario: Secure Data Room**
- **Flow Description:** Secure document and communication storage.
- **Features:** Document encryption, review, approval, signing, and publishing workflows, customizable for various business needs, and integrated Mailboxes and Notifications.

**Scenario: Compliance and Audit**
- **Flow Description:** Regular compliance reviews and audits.
- **Features:** Compliance Dashboard, workflow definition based on business scenarios, and Case Investigation workflows for exceptions.


### Alerting and Case Management Flow

**Scenario: Alerting and Case Management**
- **Flow Description:** Mechanisms to alert any exceptions or violations and escalate them for investigation into cases.
- **Steps:**
  1. Exception detection and alert generation.
  2. Case creation and assignment.
  3. Investigation workflow initiation.
  4. Escalation and resolution.
