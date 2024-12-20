# AI/ML Pipeline Orchestration using BPEL - Step-by-Step Guide
Surendra Reddy <sureddy@coretical.com>

## Step 1: Define the ML Pipeline Workflow

1. **Identify the Steps in the ML Pipeline:**
   - **Data Preprocessing**
   - **Model Training**
   - **Model Evaluation**
   - **Model Deployment**
   - **Logging Events**

2. **Create a BPEL Workflow Definition:**
   The BPEL workflow definition for the ML pipeline will include these steps in a sequence. Here's an example BPEL definition:

```xml
<process name="MLPipeline" targetNamespace="http://example.com/mlpipeline" xmlns="http://docs.oasis-open.org/wsbpel/2.0/process/executable" xmlns:tns="http://example.com/mlpipeline">
    <partnerLinks>
        <partnerLink name="DataService" partnerLinkType="tns:DataServiceLinkType" myRole="MLPipelineRole" partnerRole="DataServiceRole"/>
        <partnerLink name="TrainingService" partnerLinkType="tns:TrainingServiceLinkType" myRole="MLPipelineRole" partnerRole="TrainingServiceRole"/>
        <partnerLink name="EvaluationService" partnerLinkType="tns:EvaluationServiceLinkType" myRole="MLPipelineRole" partnerRole="EvaluationServiceRole"/>
        <partnerLink name="DeploymentService" partnerLinkType="tns:DeploymentServiceLinkType" myRole="MLPipelineRole" partnerRole="DeploymentServiceRole"/>
        <partnerLink name="LogService" partnerLinkType="tns:LogServiceLinkType" myRole="MLPipelineRole" partnerRole="LogServiceRole"/>
    </partnerLinks>
    <sequence>
        <!-- Log start of process -->
        <invoke partnerLink="LogService" operation="logEvent" inputVariable="startEvent"/>
        <!-- Data Preprocessing -->
        <invoke partnerLink="DataService" operation="preprocessData" inputVariable="dataInput" outputVariable="preprocessedData"/>
        <!-- Model Training -->
        <invoke partnerLink="TrainingService" operation="trainModel" inputVariable="preprocessedData" outputVariable="trainedModel"/>
        <!-- Model Evaluation -->
        <invoke partnerLink="EvaluationService" operation="evaluateModel" inputVariable="trainedModel" outputVariable="evaluationMetrics"/>
        <!-- Model Deployment -->
        <invoke partnerLink="DeploymentService" operation="deployModel" inputVariable="trainedModel" outputVariable="deploymentStatus"/>
        <!-- Log end of process -->
        <invoke partnerLink="LogService" operation="logEvent" inputVariable="endEvent"/>
        <!-- Final Response -->
        <reply partnerLink="Client" operation="MLPipelineResponse" variable="deploymentStatus"/>
    </sequence>
    <faultHandlers>
        <catchAll>
            <invoke partnerLink="LogService" operation="logEvent" inputVariable="errorEvent"/>
        </catchAll>
    </faultHandlers>
    <compensationHandler>
        <!-- Compensation activities, if needed -->
    </compensationHandler>
</process>
```

## Step 2: Implement Microservices

1. **Data Preprocessing Service:**

```go
package main

import (
    "encoding/json"
    "net/http"
)

type PreprocessRequest struct {
    DataInput string `json:"dataInput"`
}

type PreprocessResponse struct {
    PreprocessedData string `json:"preprocessedData"`
}

func preprocessData(w http.ResponseWriter, r *http.Request) {
    var req PreprocessRequest
    json.NewDecoder(r.Body).Decode(&req)
    // Perform data preprocessing
    preprocessedData := req.DataInput + "_preprocessed"
    resp := PreprocessResponse{PreprocessedData: preprocessedData}
    json.NewEncoder(w).Encode(resp)
}

func main() {
    http.HandleFunc("/preprocessData", preprocessData)
    http.ListenAndServe(":8081", nil)
}
```

2. **Model Training Service:**

```go
package main

import (
    "encoding/json"
    "net/http"
)

type TrainRequest struct {
    PreprocessedData string `json:"preprocessedData"`
}

type TrainResponse struct {
    TrainedModel string `json:"trainedModel"`
}

func trainModel(w http.ResponseWriter, r *http.Request) {
    var req TrainRequest
    json.NewDecoder(r.Body).Decode(&req)
    // Perform model training
    trainedModel := req.PreprocessedData + "_trained"
    resp := TrainResponse{TrainedModel: trainedModel}
    json.NewEncoder(w).Encode(resp)
}

func main() {
    http.HandleFunc("/trainModel", trainModel)
    http.ListenAndServe(":8082", nil)
}
```

3. **Model Evaluation Service:**

```go
package main

import (
    "encoding/json"
    "net/http"
)

type EvaluateRequest struct {
    TrainedModel string `json:"trainedModel"`
}

type EvaluateResponse struct {
    EvaluationMetrics string `json:"evaluationMetrics"`
}

func evaluateModel(w http.ResponseWriter, r *http.Request) {
    var req EvaluateRequest
    json.NewDecoder(r.Body).Decode(&req)
    // Perform model evaluation
    evaluationMetrics := req.TrainedModel + "_evaluated"
    resp := EvaluateResponse{EvaluationMetrics: evaluationMetrics}
    json.NewEncoder(w).Encode(resp)
}

func main() {
    http.HandleFunc("/evaluateModel", evaluateModel)
    http.ListenAndServe(":8083", nil)
}
```

4. **Model Deployment Service:**

```go
package main

import (
    "encoding/json"
    "net/http"
)

type DeployRequest struct {
    TrainedModel string `json:"trainedModel"`
}

type DeployResponse struct {
    DeploymentStatus string `json:"deploymentStatus"`
}

func deployModel(w http.ResponseWriter, r *http.Request) {
    var req DeployRequest
    json.NewDecoder(r.Body).Decode(&req)
    // Perform model deployment
    deploymentStatus := req.TrainedModel + "_deployed"
    resp := DeployResponse{DeploymentStatus: deploymentStatus}
    json.NewEncoder(w).Encode(resp)
}

func main() {
    http.HandleFunc("/deployModel", deployModel)
    http.ListenAndServe(":8084", nil)
}
```

5. **Logging Service:**

```go
package main

import (
    "encoding/json"
    "net/http"
    "log"
)

type LogEventRequest struct {
    Event string `json:"event"`
}

func logEvent(w http.ResponseWriter, r *http.Request) {
    var req LogEventRequest
    json.NewDecoder(r.Body).Decode(&req)
    // Log the event
    log.Println(req.Event)
    w.WriteHeader(http.StatusOK)
}

func main() {
    http.HandleFunc("/logEvent", logEvent)
    http.ListenAndServe(":8085", nil)
}
```

#### Step 3: Create Dockerfiles for Each Service

Create a Dockerfile for each service. For example, the Data Preprocessing Service:

```Dockerfile
# Dockerfile for Data Preprocessing Service

FROM golang:1.20 as builder
WORKDIR /app
COPY . .
RUN go build -o dataservice

FROM ubuntu:22.04
COPY --from=builder /app/dataservice /dataservice
EXPOSE 8081
CMD ["/dataservice"]
```

Repeat similar steps for the other services.

## Step 4: Update docker-compose.yml

Add services to your `docker-compose.yml`:

```yaml
version: '3.7'

services:
  mongodb:
    image: mongo:latest
    container_name: mongodb
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

  gobpel-app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "50051:50051"
    depends_on:
      - mongodb
    environment:
      MONGO_URI: "mongodb://mongodb:27017"

  dataservice:
    build:
      context: ./pkg/webservice/dataservice
      dockerfile: Dockerfile
    ports:
      - "8081:8081"

  preprocessingservice:
    build:
      context: ./pkg/webservice/preprocessingservice
      dockerfile: Dockerfile
    ports:
      - "8082:8082"

  trainingservice:
    build:
      context: ./pkg/webservice/trainingservice
      dockerfile: Dockerfile
    ports:
      - "8083:8083"

  evaluationservice:
    build:
      context: ./pkg/webservice/evaluationservice
      dockerfile: Dockerfile
    ports:
      - "8084:8084"

  deploymentservice:
    build:
      context: ./pkg/webservice/deploymentservice
      dockerfile: Dockerfile
    ports:
      - "8085:8085"

  logservice:
    build:
      context: ./pkg/webservice/logservice
      dockerfile: Dockerfile
    ports:
      - "8086:8086"

volumes:
  mongo-data:
```

## Step 5: Build and Start the Services

Run the following command to build and start all services defined in your `docker-compose.yml`:

```sh
docker-compose up --build
```

## Step 6: Create the ML Pipeline Process

Use `grpcurl` to create a process with the BPEL definition:

```sh
grpcurl -plaintext -d '{
  "name": "MLPipeline",
  "bpelDefinition": "<process name=\"MLPipeline\" targetNamespace=\"http://example.com/mlpipeline\" xmlns=\"http://docs.oasis-open.org/wsbpel/2.0/process/executable\" xmlns:tns=\"http://example.com/mlpipeline\"><partnerLinks><partnerLink name=\"DataService\" partnerLinkType

=\"tns:DataServiceLinkType\" myRole=\"MLPipelineRole\" partnerRole=\"DataServiceRole\"/><partnerLink name=\"TrainingService\" partnerLinkType=\"tns:TrainingServiceLinkType\" myRole=\"MLPipelineRole\" partnerRole=\"TrainingServiceRole\"/><partnerLink name=\"EvaluationService\" partnerLinkType=\"tns:EvaluationServiceLinkType\" myRole=\"MLPipelineRole\" partnerRole=\"EvaluationServiceRole\"/><partnerLink name=\"DeploymentService\" partnerLinkType=\"tns:DeploymentServiceLinkType\" myRole=\"MLPipelineRole\" partnerRole=\"DeploymentServiceRole\"/><partnerLink name=\"LogService\" partnerLinkType=\"tns:LogServiceLinkType\" myRole=\"MLPipelineRole\" partnerRole=\"LogServiceRole\"/></partnerLinks><sequence><!-- Log start of process --><invoke partnerLink=\"LogService\" operation=\"logEvent\" inputVariable=\"startEvent\"/><!-- Data Preprocessing --><invoke partnerLink=\"DataService\" operation=\"preprocessData\" inputVariable=\"dataInput\" outputVariable=\"preprocessedData\"/><!-- Model Training --><invoke partnerLink=\"TrainingService\" operation=\"trainModel\" inputVariable=\"preprocessedData\" outputVariable=\"trainedModel\"/><!-- Model Evaluation --><invoke partnerLink=\"EvaluationService\" operation=\"evaluateModel\" inputVariable=\"trainedModel\" outputVariable=\"evaluationMetrics\"/><!-- Model Deployment --><invoke partnerLink=\"DeploymentService\" operation=\"deployModel\" inputVariable=\"trainedModel\" outputVariable=\"deploymentStatus\"/><!-- Log end of process --><invoke partnerLink=\"LogService\" operation=\"logEvent\" inputVariable=\"endEvent\"/><!-- Final Response --><reply partnerLink=\"Client\" operation=\"MLPipelineResponse\" variable=\"deploymentStatus\"/></sequence><faultHandlers><catchAll><invoke partnerLink=\"LogService\" operation=\"logEvent\" inputVariable=\"errorEvent\"/></catchAll></faultHandlers><compensationHandler><!-- Compensation activities, if needed --></compensationHandler></process>"
}' localhost:50051 bpel.BPELProcessService/CreateProcess
```

## Step 7: Execute the ML Pipeline Process

Execute the process using `grpcurl`:

```sh
grpcurl -plaintext -d '{
  "processId": "MLPipeline"
}' localhost:50051 bpel.BPELProcessService/ExecuteProcess
```

## Summary

1. **Define the BPEL Workflow for the ML Pipeline.**
2. **Implement Microservices for each step (Data Preprocessing, Model Training, etc.).**
3. **Create Dockerfiles for each microservice.**
4. **Update `docker-compose.yml` to include all services.**
5. **Build and start all services using `docker-compose up --build`.**
6. **Create the ML Pipeline process using `grpcurl`.**
7. **Execute the ML Pipeline process using `grpcurl`.**

This step-by-step guide ensures that you can define, implement, and orchestrate an ML pipeline using the goBPEL implementation.
