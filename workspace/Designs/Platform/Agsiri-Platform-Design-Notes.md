# Detailed Design Specifications for Agsiri Platform Draft v1.0.8


# 1. Overview

This document outlines the detailed design specifications for the Agsiri platform implemented as a set of microservices using Node.js. The system will run in a Dockerized environment with configuration management, exception and error handling, internationalization (i18n), logging, monitoring, and secure communication among services.


# 2. Architecture


## 2.1. Microservices Overview:



* **User Service:** Manages user accounts, roles, KYC data, beneficiaries, and accounts.
* **Listing Service:** Handles creation, modification, retrieval, and deletion of listings.
* **Farm Service:** Manages farm data, including due diligence information.
* **Offering Service:** Manages offerings, expected returns, and offering details.
* **Subscription Service:** Manages investor subscriptions and allocations.
* **Portfolio Service:** Manages investor portfolios.
* **Data Room Service:** Handles secure document storage and access control.
* **Notification Service:** Manages notifications for various events.
* **Campaign Service:** Manages marketing campaigns and newsletters.
* **Trading Service:** Manages buying and selling of shares.
* **Chat Service:** Provides real-time communication with support.


## 2.2. Communication:



* Services will communicate using RESTful APIs over HTTPS.
* Authentication and authorization will be managed using JWT tokens.
* Secure communication will be enforced with TLS.


## 2.3. Configuration Management:



* Configuration data will be stored in environment variables managed by Docker Compose and Kubernetes ConfigMaps.


## 2.4. Exception and Error Handling:



* Centralized error handling middleware in each service.
* Detailed error logs with stack traces for developers.
* User-friendly error messages for clients.


## 2.5. Logging:



* Centralized logging using Winston and Morgan.
* Logs will be shipped to a logging service like ELK (Elasticsearch, Logstash, Kibana) or AWS CloudWatch.


## 2.6. Monitoring:



* Health checks and metrics collection using Prometheus and Grafana.
* Service-level monitoring and alerts.


## 2.7. Internationalization (i18n):



* i18n support using i18next for translating user-facing messages and content.


# 3. Microservices Design


## 3.1. User Service:



* **Endpoints:**
    * `POST /users`: Create a new user.
    * `PUT /users/:userId`: Modify an existing user.
    * `DELETE /users/:userId`: Delete a user.
    * `PUT /users/:userId/kyc`: Update KYC data.
    * `PUT /users/:userId/beneficiaries`: Update beneficiaries.
    * `PUT /users/:userId/accounts`: Update accounts.
* **Database:** MongoDB
* **Schema:**

    ```
    {
      "user_id": "string",
      "first_name": "string",
      "last_name": "string",
      "date_of_birth": "string",
      "email_address": "string",
      "phone_number": "string",
      "address": {
        "house_number": "string",
        "street": "string",
        "apartment": "string",
        "city": "string",
        "state": "string",
        "zip": "string"
      },
      "user_role": "INVESTOR|FARM_SME|FARM_MANAGER|ANALYST|ADMIN",
      "investor": {
        "accounts": [ {} ],
        "beneficiaries": [ {
          "first_name": "string",
          "last_name": "string",
          "relationship": "string",
          "type": "INDIVIDUAL|TRUST",
          "percentage": "number"
        } ]
      }
    }

    ```



## 3.2. Listing Service:



* **Endpoints:**
    * `POST /listings`: Create a new listing.
    * `PUT /listings/:listingId`: Modify an existing listing.
    * `GET /listings`: Get all listings.
    * `GET /listings/:listingId`: Get a particular listing.
    * `DELETE /listings/:listingId`: Delete a listing.
* **Database:** MongoDB
* **Schema:** (Refer to the concept note for listing schema)


## 3.3. Farm Service:



* **Endpoints:**
    * `POST /farms`: Create a new farm.
    * `PUT /farms/:farmId`: Modify an existing farm.
    * `GET /farms`: Get all farms.
    * `GET /farms/:farmId`: Get a particular farm.
    * `DELETE /farms/:farmId`: Delete a farm.
    * `PUT /farms/:farmId/dd/soil`: Update soil information.
    * `PUT /farms/:farmId/dd/financial`: Update financial information.
    * `PUT /farms/:farmId/dd/crop`: Update crop information.
    * `PUT /farms/:farmId/dd/other`: Update other due diligence information.
* **Database:** MongoDB
* **Schema:** (Refer to the concept note for farm schema)


## 3.4. Offering Service:



* **Endpoints:**
    * `POST /offerings`: Create a new offering.
    * `PUT /offerings/:offeringId`: Modify an existing offering.
    * `GET /offerings`: Get all offerings.
    * `GET /offerings/:offeringId`: Get a particular offering.
    * `PUT /offerings/:offeringId/expected_returns`: Update expected returns.
    * `PUT /offerings/:offeringId/details`: Update offering details.
    * `PUT /offerings/:offeringId/documents`: Update offering documents.
* **Database:** MongoDB
* **Schema:** (Refer to the concept note for offering schema)


## 3.5. Subscription Service:



* **Endpoints:**
    * `PUT /subscriptions/:offeringId/investor/:investorId`: Create/update subscriptions.
    * `GET /subscriptions/:offeringId`: List subscriptions for an offering.
    * `GET /subscriptions/investor/:userId`: List subscriptions for an investor.
    * `DELETE /subscriptions/:offeringId/investor/:userId`: Delete a subscription.
    * `PUT /subscriptions/:offeringId/investor/:userId/allocations`: Create/update allocations.
    * `DELETE /subscriptions/:offeringId/investor/:userId/allocations`: Delete an allocation.
* **Database:** MongoDB
* **Schema:** (Refer to the concept note for subscription schema)


## 3.6. Portfolio Service:



* **Endpoints:**
    * `PUT /portfolios/:investorId/offering/:offeringId`: Create/update portfolios.
    * `GET /portfolios/:investorId`: Get active portfolios for an investor.
    * `GET /portfolios/:investorId/all`: Get all portfolios for an investor.
* **Database:** MongoDB
* **Schema:** (Refer to the concept note for portfolio schema)


## 3.7. Data Room Service:



* **Endpoints:**
    * `POST /datarooms`: Create a new data room.
    * `PUT /datarooms/:dataroomId`: Update a data room.
    * `DELETE /datarooms/:dataroomId`: Delete a data room.
    * `GET /datarooms/:dataroomId`: Get a particular data room.
    * `GET /datarooms`: Get list of data rooms.
    * `POST /datarooms/:dataroomId/permissions`: Create a new data room permission.
    * `PUT /datarooms/:dataroomId/permissions/:permissionId`: Update a data room permission.
    * `DELETE /datarooms/:dataroomId/permissions/:permissionId`: Delete a data room permission.
    * `POST /datarooms/:dataroomId/user/:userId/checkpermission`: Check if user has permissions for the data room.
    * `POST /cabinets`: Create a new cabinet.
    * `PUT /cabinets/:cabinetId`: Update a cabinet.
    * `DELETE /cabinets/:cabinetId`: Delete a cabinet.
    * `GET /cabinets/:cabinetId`: Get a particular cabinet.
    * `GET /cabinets`: Get list of cabinets.
    * `POST /cabinets/:cabinetId/permissions`: Create a new cabinet permission.
    * `PUT /cabinets/:cabinetId/permissions/:permissionId`: Update a cabinet permission.
    * `DELETE /cabinets/:cabinetId/permissions/:permissionId`: Delete a cabinet permission.
    * `POST /cabinets/:cabinetId/files`: Create a new file in a cabinet.
    * `PUT /cabinets/:cabinetId/files/:fileId`: Update a file in a cabinet.
    * `DELETE /cabinets/:cabinetId/files/:fileId`: Delete a file in a cabinet.
    * `GET /cabinets/:cabinetId/files/:fileId`: Get a particular file in a cabinet.
    * `GET /cabinets/:cabinetId/files`: Get list of files in the cabinet.
    * `POST /cabinets/:cabinetId/files/:fileId/permissions`: Create a new permission for a file in the cabinet.
    * `PUT /cabinets/:cabinetId/files/:fileId/permissions/:permissionId`: Update a file permission in a cabinet.
    * `DELETE /cabinets/:cabinetId/files/:fileId/permissions/:permissionId`: Delete a file permission.
    * `POST /cabinets/:cabinetId/files/:fileId/user/:userId/checkpermission`: Check if user has permissions for the file in the cabinet.
* **Database:** MongoDB and S3 for storage
* **Schema:** (Refer to the concept note for data room and cabinet schema)


## 3.8. Notification Service:



* **Endpoints:**
    * `POST /notifications`: Create a new notification.
    * `GET /notifications/user/:userId`: Get notifications for a user.
    * `PUT /notifications/:notificationId`: Update a notification.
    * `DELETE /notifications/:notificationId`: Delete a notification.
* **Database:** MongoDB


## 3.9. Campaign Service:



* **Endpoints:**
    * `POST /campaigns`: Create a new campaign.
    * `PUT /campaigns/:campaignId`: Update a campaign.
    * `DELETE /campaigns/:campaignId`: Delete a campaign.
    * `GET /campaigns`: Get list of campaigns.
    * `GET /campaigns/:campaignId`: Get a particular campaign.
* **Database:** MongoDB
* **Schema:** (Refer to the concept note for campaign schema)


## 3.10. Trading Service:



* **Endpoints:**
    * `POST /trades`: Create a new trade.
    * `PUT /trades/:tradeId`: Update a trade.
    * `DELETE /trades/:tradeId`: Delete a trade.
    * `GET /trades`: Get list of trades.
    * `GET /trades/:tradeId`: Get a particular trade.
* **Database:** MongoDB


## 3.11. Chat Service:



* **Endpoints:**
    * `POST /chats`: Create a new chat session.
    * `PUT /chats/:chatId`: Update a chat session.
    * `DELETE /chats/:chatId`: Delete a chat session.
    * `GET /chats`: Get list of chat sessions.
    * `GET /chats/:chatId`: Get a particular chat session.
* **Database:** MongoDB and WebSocket for real-time communication.


# 4. Deployment and Configuration


## 4.1. Dockerization:



* Each service will have its own Dockerfile.
* Docker Compose for local development environment.
* Kubernetes for production deployment.


## 4.2. Configuration Management:



* Environment variables managed by Docker Compose and Kubernetes ConfigMaps.
* Secrets managed using Kubernetes Secrets.


# 5. Exception and Error Handling


## 5.1. Error Handling Middleware:



* Centralized error handling in each service using middleware.
* Differentiate between client errors (4xx) and server errors (5xx).


## 5.2. Error Logging:



* Detailed error logs with stack traces using Winston.
* Logs shipped to ELK or AWS CloudWatch.


# 6. Logging


## 6.1. Logging Middleware:



* Use Morgan for HTTP request logging.
* Use Winston for application-level logging.
* Centralized logging setup with log rotation and shipping to ELK or AWS CloudWatch.


# 7. Monitoring


## 7.1. Health Checks:



* Endpoint `/health` in each service for health checks.
* Kubernetes liveness and readiness probes.


## 7.2. Metrics Collection:



* Prometheus for metrics collection.
* Grafana for metrics visualization.


## 7.3. Alerts:



* Alertmanager integrated with Prometheus for alerting.


# 8. Internationalization (i18n)


## 8.1. i18next Integration:



* Middleware for handling i18n in each service.
* Language files for different locales.
* API endpoints to get and set the preferred language of users.


# 9. Secure Communication


## 9.1. HTTPS:



* All inter-service communication over HTTPS.
* TLS certificates managed using Let's Encrypt and cert-manager in Kubernetes.


## 9.2. Authentication and Authorization:



* JWT tokens for authentication.
* Role-based access control for authorization.


# Conclusion

This detailed design specification outlines the architecture, microservices, deployment, configuration management, exception handling, logging, monitoring, i18n, and secure communication for the Agsiri platform. This approach ensures a robust, scalable, and secure system suitable for production environments.
