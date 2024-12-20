## Technical Note on GoBPEL Project

### Overview

GoBPEL is a gRPC-based implementation of a BPEL (Business Process Execution Language) service in Go. The project leverages MongoDB for persistent storage and Docker for containerization. The service provides APIs for creating, retrieving, updating, deleting, and listing BPEL processes.

### Key Components

1. **gRPC Service**: Defines the BPELProcessService with methods for handling BPEL processes.
2. **Protobuf**: Used for defining the gRPC service and message types.
3. **MongoDB**: Used for persistent storage of BPEL processes.
4. **Docker**: Used for containerizing the application for consistent deployment.

### Protobuf Definitions

The Protobuf definitions are located in the `api/bpel.proto` file. This file defines the `BPELProcessService` service and the message types used by the service.

#### Example:

```protobuf
syntax = "proto3";

package bpel;

import "google/protobuf/any.proto";
import "google/protobuf/empty.proto";

option go_package = "gobpel/api;api";

// Process definition
message Process {
    string name = 1;
    string targetNamespace = 2;
    string queryLanguage = 3;
    string expressionLanguage = 4;
    bool suppressJoinFailure = 5;
    bool exitOnStandardFault = 6;
    Extensions extensions = 7;
    repeated Import imports = 8;
    PartnerLinks partnerLinks = 9;
    MessageExchanges messageExchanges = 10;
    Variables variables = 11;
    CorrelationSets correlationSets = 12;
    FaultHandlers faultHandlers = 13;
    EventHandlers eventHandlers = 14;
    Activity activity = 15;
}

// Additional message types and service definition

service BPELProcessService {
    rpc CreateProcess(Process) returns (Process);
    rpc GetProcess(GetProcessRequest) returns (Process);
    rpc UpdateProcess(Process) returns (Process);
    rpc DeleteProcess(GetProcessRequest) returns (google.protobuf.Empty);
    rpc GetAllProcesses(google.protobuf.Empty) returns (GetAllProcessesResponse);
}

message GetProcessRequest {
    string processId = 1;
}

message GetAllProcessesResponse {
    repeated Process processes = 1;
}
```

### Server Implementation

The gRPC server is implemented in `pkg/bpel/processor.go`. This file contains the methods for creating, retrieving, updating, deleting, and listing BPEL processes.

#### Example:

```go
package bpel

import (
    "context"

    "gobpel/api"
    "gobpel/pkg/db"
    "google.golang.org/protobuf/types/known/emptypb"
)

type Server struct {
    api.UnimplementedBPELProcessServiceServer
}

func (s *Server) CreateProcess(ctx context.Context, req *api.Process) (*api.Process, error) {
    return db.CreateProcess(req)
}

func (s *Server) GetProcess(ctx context.Context, req *api.GetProcessRequest) (*api.Process, error) {
    return db.GetProcess(req.ProcessId)
}

func (s *Server) UpdateProcess(ctx context.Context, req *api.Process) (*api.Process, error) {
    return db.UpdateProcess(req)
}

func (s *Server) DeleteProcess(ctx context.Context, req *api.GetProcessRequest) (*emptypb.Empty, error) {
    _, err := db.DeleteProcess(req.ProcessId)
    if err != nil {
        return nil, err
    }
    return &emptypb.Empty{}, nil
}

func (s *Server) GetAllProcesses(ctx context.Context, req *emptypb.Empty) (*api.GetAllProcessesResponse, error) {
    processes, err := db.GetAllProcesses()
    if err != nil {
        return nil, err
    }
    return &api.GetAllProcessesResponse{Processes: processes}, nil
}
```

### Database Interaction

The database interaction is handled in `pkg/db/mongodb.go`. This file contains functions to interact with MongoDB for CRUD operations.

#### Example:

```go
package db

import (
    "context"
    "errors"

    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
    "gobpel/api"
)

var client *mongo.Client

// Initialize the MongoDB client
func InitMongoDB(uri string) error {
    var err error
    client, err = mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
    if err != nil {
        return err
    }
    return client.Ping(context.TODO(), nil)
}

func CreateProcess(process *api.Process) (*api.Process, error) {
    collection := client.Database("yourdatabase").Collection("processes")
    _, err := collection.InsertOne(context.Background(), process)
    if err != nil {
        return nil, err
    }
    return process, nil
}

func GetProcess(processId string) (*api.Process, error) {
    collection := client.Database("yourdatabase").Collection("processes")
    filter := bson.M{"name": processId}  // Assuming "name" is the unique identifier
    var process api.Process
    err := collection.FindOne(context.Background(), filter).Decode(&process)
    if err != nil {
        if err == mongo.ErrNoDocuments {
            return nil, errors.New("no documents found")
        }
        return nil, err
    }
    return &process, nil
}

func UpdateProcess(process *api.Process) (*api.Process, error) {
    collection := client.Database("yourdatabase").Collection("processes")
    filter := bson.M{"name": process.Name}  // Assuming "name" is the unique identifier
    update := bson.M{"$set": process}
    _, err := collection.UpdateOne(context.Background(), filter, update)
    if err != nil {
        return nil, err
    }
    return process, nil
}

func DeleteProcess(processId string) (bool, error) {
    collection := client.Database("yourdatabase").Collection("processes")
    filter := bson.M{"name": processId}  // Assuming "name" is the unique identifier
    result, err := collection.DeleteOne(context.Background(), filter)
    if err != nil {
        return false, err
    }
    if result.DeletedCount == 0 {
        return false, errors.New("no documents deleted")
    }
    return true, nil
}

func GetAllProcesses() ([]*api.Process, error) {
    collection := client.Database("yourdatabase").Collection("processes")
    cursor, err := collection.Find(context.Background(), bson.M{})
    if err != nil {
        return nil, err
    }
    defer cursor.Close(context.Background())

    var processes []*api.Process
    for cursor.Next(context.Background()) {
        var process api.Process
        if err := cursor.Decode(&process); err != nil {
            return nil, err
        }
        processes = append(processes, &process)
    }
    if err := cursor.Err(); err != nil {
        return nil, err
    }
    return processes, nil
}
```

### Docker Integration

The Dockerfile sets up the environment, installs dependencies, generates protobuf code, and builds the Go application.

#### Example:

```dockerfile
# Start from the official Golang image
FROM golang:1.20-alpine as builder

# Install dependencies
RUN apk add --no-cache git protobuf protobuf-dev build-base

# Install protoc-gen-go and protoc-gen-go-grpc
RUN go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.28
RUN go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.2

# Set the Current Working Directory inside the container
WORKDIR /app

# Copy go.mod and go.sum files
COPY go.mod go.sum ./

# Download all dependencies. Dependencies will be cached if the go.mod and go.sum files are not changed
RUN go mod download

# Copy the source from the current directory to the Working Directory inside the container
COPY . .

# Generate the protobuf code
RUN protoc --go_out=. --go-grpc_out=. api/bpel.proto

# Build the Go app
RUN go build -o /gobpel cmd/server/main.go

# Start a new stage from scratch
FROM alpine:latest

# Copy the Pre-built binary file from the previous stage
COPY --from=builder /gobpel /gobpel
COPY .env .env

# Expose port 50051 to the outside world
EXPOSE 50051

# Command to run the executable
CMD ["/gobpel"]
```

### Docker Compose

The `docker-compose.yml` file sets up the application and MongoDB services.

#### Example:

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "50051:50051"
    environment:
      - MONGO_URI=mongodb://mongo:27017
    depends_on:
      - mongo
  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
```

### Testing with `grpcurl`

You can test the gRPC endpoints using `grpcurl`.

#### Example Commands:

1. **Create a Process:**

   ```sh
   grpcurl -plaintext -d '{
     "name": "testProcess",
     "targetNamespace": "http://example.com",
     "queryLanguage": "XPath",
     "expressionLanguage": "XPath",
     "suppressJoinFailure": false,
     "exitOnStandardFault": false
   }' localhost:50051 bpel.BPELProcessService/CreateProcess
   ```

2. **Get the Created Process:**

  

 ```sh
   grpcurl -plaintext -d '{
     "processId": "testProcess"
   }' localhost:50051 bpel.BPELProcessService/GetProcess
   ```

3. **Update the Process:**

   ```sh
   grpcurl -plaintext -d '{
     "name": "testProcess",
     "targetNamespace": "http://example.com",
     "queryLanguage": "XPath",
     "expressionLanguage": "XPath",
     "suppressJoinFailure": false,
     "exitOnStandardFault": false
   }' localhost:50051 bpel.BPELProcessService/UpdateProcess
   ```

4. **Delete the Process:**

   ```sh
   grpcurl -plaintext -d '{
     "processId": "testProcess"
   }' localhost:50051 bpel.BPELProcessService/DeleteProcess
   ```

5. **Get All Processes:**

   ```sh
   grpcurl -plaintext localhost:50051 bpel.BPELProcessService/GetAllProcesses
   ```

### Conclusion

GoBPEL is a robust implementation of a BPEL service in Go, leveraging gRPC for communication, MongoDB for persistent storage, and Docker for containerization. This project provides a scalable and maintainable solution for managing BPEL processes.
