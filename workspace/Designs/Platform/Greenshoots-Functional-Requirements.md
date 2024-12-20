# Detailed Functional Specifications for Agsiri Platform ( Project: Greenshoots)

## 1. User Roles and Access Control

### 1.1. User Roles:
- Administrator
- Investor
- Farm SME (Subject Matter Expert)
- Farm Manager
- Analyst

### 1.2. Access Control:
- Role-based access control (RBAC) to ensure users can only access functionalities pertinent to their roles.
- Administrators have full access to all functionalities.
- Investors have access to portfolio, offerings, and trading functionalities.
- Farm SMEs can review and approve farm data and provide due diligence reports.
- Farm Managers can update operational metrics and manage farm documents.
- Analysts can access detailed investment data and generate analytical reports.

## 2. Common Services (Accessible from Any Screen)
### 2.1. Resources:
- Access to documents, guides, and tutorials relevant to each role.
- Functionality to upload, update, and categorize resources.
### 2.2. About:
- Information about Agsiri, including mission, vision, contact information, and company background.
- Editable by administrators.
### 2.3. Chat:
- Integrated chat feature for real-time communication with support.
- Chat logs saved for future reference.

## 3. Investor Flow
### 3.1. Landing Page:
- Overview of available investment opportunities.
- Latest news and personalized recommendations based on investment history.
### 3.2. Portfolio:
- Summary: Total investment, number of properties, income (YTD), yield (YTD), total income, and total yield.
- List of Investments: Detailed view including summaries, descriptions, images, videos, operational metrics, and future plans.
- Option to view previous investments.
- Option to sell shares of properties.
### 3.3. Offerings:
- Current Offerings: Descriptions, reasons to invest, images, videos, maps, disclosures, property documents, operational metrics, and development plans.
- Subscription: Ability to subscribe to shares, view detailed information, and manage subscriptions.

## 4. Farm Onboarding Flow
### 4.1. Types of Shares:
- Preferential Shares: Allocated to founding members with preferential treatment (e.g., voting rights).
- Ordinary Shares: Issued to later investors, with preferential shares converting to ordinary shares upon sale.
### 4.2. Share Price:
- Option to set initial share price as either fixed or variable ($500 or $1000 per share).
### 4.3. Number of Shares:
- Computation based on farm value and share price.
- Example: Farm value of $350,750 and share price of $1000 results in 350.75 shares.
- Campaign detailing farm information sent to potential investors.

## 5. Trading Flow
### 5.1. Buying and Selling Shares:
- Investors can sell shares after the initial holding period.
- System determines share price; no option for ask price or limit.
- Sale process generates a campaign sent to all customers.
- Transactions handled on a first-come, first-serve basis.
- Transaction fees apply (e.g., 1% of transaction cost for both buyer and seller).

## 6. Publishing Flow
### 6.1. Campaigns and Newsletters:
- Create, publish, and manage campaigns and newsletters.
- Real-time or periodic publication options.

## 7. Subscription Flow
### 7.1. Offering Creation and Subscription:
- Campaign sent to all/interested investors once an offering is created.
- Investors subscribe to offerings by specifying the number of shares.
- Shares allocated on a first-come, first-serve basis at the end of the offering period.
- Legal and other documents sent to allocated investors.
- Signed documents become part of the investor’s portfolio.
## 8. Agsiri Platform Design
### 8.1. Data Model:
Use AWS DocumentDB for semi-structured, hierarchical data.
S3 for storing images, videos, and maps with DocumentDB references.

### 8.2. Document Types:
- Listing: Stores data from external sources (e.g., mls database).
- Farm: Enhanced data including soil types and due diligence findings.
- Offering: Details shares available for investment post-due diligence.
- Subscription: Records of investor subscriptions to offerings.
- Campaign: Information about marketing campaigns for offerings.
- Notification: Manages notifications for various events.

### 8.3. APIs:
RESTful APIs for managing listings, farms, offerings, subscriptions, user data, and data rooms.

## 9. Detailed API Specifications

### 9.1. Listing Service:
- Create, modify, retrieve, and delete listings.
- Integration with external data sources.

### 9.2. Farm Service:
- Create, modify, retrieve, and delete farm data.
- Update due diligence information (soil, financial, crop).

### 9.3. Offering Service:
- Create, modify, retrieve, and delete offerings.
- Update expected returns and offering details.

### 9.4. Subscription Service:
- Manage subscriptions and allocations.
- Retrieve subscriptions by offering or investor.

### 9.5. User Service:
- Manage user accounts, KYC data, beneficiaries, and accounts.

### 9.6. Portfolio Service:
- Manage portfolios and retrieve active/closed portfolios for investors.

### 9.7. Data Room Service:
- Secure storage and access control for documents.
- Fine-grained permissions for cabinets and files.

## 10. Data Room and Document Management
### 10.1. Data Room:
- Secure way to store and organize documents.
- Hierarchical structure with data rooms, cabinets, and files.
- Encryption and access control with extensive logging and audit tracking.

### 10.2. Cabinet:
- Container for files with permissions (view, read, write, create).
- Integration with Docusign for document e-signing.

### 10.3. File Management:
- Create, modify, retrieve, and delete files within cabinets.
- Fine-grained permissions for each file.

## Conclusion
These detailed functional specifications provide a comprehensive guide for the development and implementation of the Agsiri platform, ensuring it meets the needs of all user roles and provides a seamless, secure, and efficient user experience.
