# Detailed Design Specifications for Rule Definition and Execution Service (RDES)

## Overview
Introduction to Generative Decisioning Service
At the core of the Agsiri Rules Service lies a sophisticated rule-based system empowered by the Rete algorithm. This system is structured to automate and streamline decision-making processes through a series of components that interact seamlessly to deliver efficient outcomes. The primary components of this rule-based system include:

- Rule-base: This repository houses the business policies and knowledge articulated through IF/THEN statements and Decision Tables. It forms the foundation upon which decisions are constructed, encapsulating the business logic that guides the system.

- Working Memory: This component serves as the active data store within the system, containing all the information that has been input or generated during the operational cycle. In the Agsiri Rules framework, facts are introduced into the system using assert calls, populating the working memory.

- Decisioning Engine: Also known as the Rules Engine, this is where the action takes place. It processes the rules and performs pattern-matching to identify which rules are applicable based on the current set of facts. This pattern-matching determines the subsequent course of action for each cycle of operation.

The Agsiri Rules Service operates as a data-driven, forward chaining rule-based system. The progression of operations is dictated by the facts at hand, which determine the activation of relevant rules. Upon activation, a rule can introduce new facts into the system. These new facts are then processed in subsequent cycles, perpetuating a decisioning cycle. This cycle continues until a definitive conclusion is reached, or the process is intentionally halted or reset. This iterative process, where facts initiate rule activations and the firing of rules generates further facts, thereby potentially activating more rules, epitomizes the dynamic nature of decisioning cycles within the system.

The Rule Definition and Execution Service (RDES) serves as the decision-making engine on the Agsiri Platform. It automates the enforcement and integration of business logic, ensuring a seamless connection with external systems and workflows. This document provides the detailed design specifications for implementing the RDES using modern technologies such as Node.js for runtime environment, RabbitMQ for messaging and queuing, and MongoDB for data storage. These technologies were chosen to leverage their respective strengths in handling asynchronous data flows, robust messaging capabilities, and flexible data storage solutions, thus supporting the complex needs of generative decisioning within the Agsiri framework.

## Architecture
The architecture of the RDES consists of the following components:

- Rule Management API: RESTful API for creating, updating, and managing rules, rulesets, dictionaries, facts, and decision functions.
- Rule Execution Engine: Component responsible for executing rules against facts and triggering actions.
- Messaging System: RabbitMQ for handling notifications, workflow invocations, and inter-service communication.
- Database: MongoDB for storing rules, rulesets, dictionaries, facts, and execution logs.
- Notification System: Component for notifying external services and invoking workflows.
- Case Management Integration: Component for creating case records in the Case Management Service.

## Detailed Design

### Rule Management API
The Rule Management API provides endpoints for creating, updating, and managing rules, rulesets, dictionaries, facts, and decision functions.

Endpoints:

POST /rules: Create a new rule

PUT /rules/
: Update an existing rule

GET /rules/
: Get rule details

DELETE /rules/
: Delete a rule

POST /rulesets: Create a new ruleset

PUT /rulesets/
: Update an existing ruleset

GET /rulesets/
: Get ruleset details

DELETE /rulesets/
: Delete a ruleset

POST /dictionaries: Create a new dictionary

PUT /dictionaries/
: Update an existing dictionary

GET /dictionaries/
: Get dictionary details

DELETE /dictionaries/
: Delete a dictionary

POST /facts: Create a new fact

PUT /facts/
: Update an existing fact

GET /facts/
: Get fact details

DELETE /facts/
: Delete a fact

POST /decision-functions: Create a new decision function

PUT /decision-functions/
: Update an existing decision function

GET /decision-functions/
: Get decision function details

DELETE /decision-functions/
: Delete a decision function

Request and Response Formats:

JSON format for requests and responses.
Validate request payloads using JSON schemas.
Use consistent response structures with status codes and messages.
Error Handling:

Return appropriate HTTP status codes (e.g., 400 for bad requests, 404 for not found, 500 for server errors).
Log errors with detailed information for debugging.

### Rule Execution Engine
The Rule Execution Engine evaluates rules against facts and triggers actions.

Components:

- Rule Evaluator: Evaluates rule conditions against facts using a rule-based inference engine.
- Action Executor: Executes actions defined in the rules, including notifications, workflow invocations, and case record creation.
- Fact Manager: Manages facts in the working memory during rule evaluation.

### Execution Flow:

Retrieve the ruleset and facts from MongoDB.
Evaluate rule conditions using the Rule Evaluator.
If conditions are met, execute actions using the Action Executor.
Store execution logs and results in MongoDB.

## Messaging System
RabbitMQ is used for handling notifications, workflow invocations, and inter-service communication.

Queues:

- NotificationQueue: Queue for handling notifications to external services.
- WorkflowQueue: Queue for invoking workflows.
- CaseQueue: Queue for creating case records in the Case Management Service.

### Message Format:

JSON format for messages.
Include metadata (e.g., message type, timestamp, correlation ID).
Error Handling:

Implement retry mechanisms for message processing.
Log errors and dead-letter undeliverable messages.

### Database
MongoDB is used for storing rules, rulesets, dictionaries, facts, and execution logs.

Collections:

- rules: Stores rule definitions.
- rulesets: Stores ruleset definitions.
- dictionaries: Stores dictionary definitions.
- facts: Stores facts.
- decision_functions: Stores decision function definitions.
- execution_logs: Stores execution logs and results.

## Schema Design:

Rule Schema:

 ```
{
  "ruleId": "string",
  "name": "string",
  "description": "string",
  "conditions": "array",
  "actions": "array",
  "created_at": "date",
  "updated_at": "date"
}
```
Ruleset Schema:

 ```
{
  "rulesetId": "string",
  "name": "string",
  "description": "string",
  "rules": "array",
  "created_at": "date",
  "updated_at": "date"
}
```
Dictionary Schema:

 ```
{
  "dictionaryId": "string",
  "name": "string",
  "description": "string",
  "rulesets": "array",
  "created_at": "date",
  "updated_at": "date"
}
```
Fact Schema:

 ```
{
  "factId": "string",
  "name": "string",
  "type": "string",
  "value": "mixed",
  "created_at": "date",
  "updated_at": "date"
}
```
Decision Function Schema:

 ```
{
  "functionId": "string",
  "name": "string",
  "description": "string",
  "inputFacts": "array",
  "rulesets": "array",
  "outputFacts": "array",
  "created_at": "date",
  "updated_at": "date"
}
```
Execution Log Schema:

``` 
{
  "logId": "string",
  "rulesetId": "string",
  "facts": "array",
  "result": "object",
  "timestamp": "date"
}
```
## Notification System
The Notification System handles notifications to external services and workflow invocations.

Components:

- Notifier: Sends HTTP requests to external services based on rule actions.
- Workflow Invoker: Invokes workflows using specified workflow IDs and parameters.

Notification Flow:

- Receive notification message from RabbitMQ.
- Extract endpoint URL and payload from the message.
- Send HTTP request to the external service.
- Log the notification result.

## Case Management Integration
The Case Management Integration component creates case records in the Case Management Service based on rule actions.

Components:

Case Creator: Sends HTTP requests to the Case Management Service to create case records.
Case Creation Flow:

- Receive case creation message from RabbitMQ.
- Extract case details from the message.
- Send HTTP request to the Case Management Service.
- Log the case creation result.

## Technology Stack
- Node.js: Server-side runtime environment.
- Express.js: Web framework for building the Rule Management API.
- RabbitMQ: Messaging/queuing system for notifications and inter-service communication.
- MongoDB: NoSQL database for storing rules, rulesets, dictionaries, facts, and execution logs.
- Mongoose: ODM (Object Data Modeling) library for MongoDB and Node.js.
- Axios: HTTP client for sending requests to external services and workflows.

## Security and Authentication
- Implement JWT (JSON Web Tokens) for authenticating API requests.
- Use HTTPS for secure communication between services.
- Validate and sanitize input data to prevent injection attacks.

## Logging and Monitoring
- Use Winston for logging errors, warnings, and informational messages.
- Implement centralized logging using services like ELK Stack (Elasticsearch, Logstash, Kibana).
- Monitor system health and performance using tools like Prometheus and Grafana.

## Deployment and Scalability
Use Docker for containerizing the application.
Use Kubernetes for orchestrating and managing containerized applications.
Implement horizontal scaling for the Rule Execution Engine and Notification System based on workload.

## Conclusion
The detailed design specifications for the Rule Definition and Execution Service (RDES) provide a comprehensive blueprint for implementing a robust, scalable, and flexible decision-making engine for the Agsiri Platform. By leveraging Node.js, RabbitMQ, and MongoDB, the RDES ensures seamless integration with external systems, automated decision-making, and dynamic rule management, enabling the Agsiri Platform to adapt to evolving business requirements in real-time.
