# Extending this Research Prototype
if you have any questions, contact sureddy@coretical.com
## Step-by-Step Guide

### Step 1: Update Protobuf Definitions

First, we need to update the Protobuf definition to include the new method.

1. Open the `api/bpel.proto` file.
2. Add the request and response messages for the new method.
3. Add the new RPC method in the `BPELProcessService` service.

#### Example: Adding `GetProcessStatus`

```proto
syntax = "proto3";

package bpel;

import "google/protobuf/any.proto";
import "google/protobuf/empty.proto";

option go_package = "gobpel/api;api";

// Existing messages and service definition...

message GetProcessStatusRequest {
    string processId = 1;
}

message GetProcessStatusResponse {
    string status = 1;
}

service BPELProcessService {
    // Existing RPC methods...
    
    rpc GetProcessStatus(GetProcessStatusRequest) returns (GetProcessStatusResponse);
}
```

### Step 2: Generate Go Code from Protobuf

After updating the Protobuf file, generate the Go code:

1. Ensure you have `protoc` and the Go plugins installed:
   ```sh
   go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
   go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
   ```

2. Run the following command to generate the Go code:
   ```sh
   protoc --go_out=. --go-grpc_out=. api/bpel.proto
   ```

### Step 3: Implement the Server Method

Now, implement the new method in the GoBPEL server.

1. Open the `pkg/bpel/processor.go` file.
2. Add the implementation for the new method.

#### Example: Implementing `GetProcessStatus`

```go
package bpel

import (
    "context"
    "gobpel/api"
    "gobpel/pkg/db"
)

func (s *Server) GetProcessStatus(ctx context.Context, req *api.GetProcessStatusRequest) (*api.GetProcessStatusResponse, error) {
    process, err := db.GetProcess(req.ProcessId)
    if err != nil {
        return nil, err
    }
    return &api.GetProcessStatusResponse{
        Status: "Active", // Assuming "Active" as a placeholder status
    }, nil
}
```

### Step 4: Update Database Functions (if needed)

If the new method requires database operations that are not currently supported, update the database functions accordingly.

1. Open the `pkg/db/mongodb.go` file.
2. Add any necessary functions to support the new method.

### Step 5: Rebuild and Run the Project

Rebuild the Docker image and run the project using Docker Compose:

```sh
docker-compose up --build
```

### Step 6: Test the New Method

Use `grpcurl` to test the new method.

#### Example: Testing `GetProcessStatus`

```sh
grpcurl -plaintext -d '{
  "processId": "testProcess"
}' localhost:50051 bpel.BPELProcessService/GetProcessStatus
```

### Summary

To add a new method to the GoBPEL service, follow these steps:

1. **Update Protobuf Definitions**: Define request and response messages and add the new method to the service definition.
2. **Generate Go Code**: Use `protoc` to generate the Go code from the updated Protobuf file.
3. **Implement Server Method**: Add the new method implementation in the server code.
4. **Update Database Functions**: Add necessary database operations if needed.
5. **Rebuild and Run**: Rebuild the Docker image and run the project.
6. **Test**: Use `grpcurl` to test the new method.

By following these steps, you can successfully add new methods to the GoBPEL service.
