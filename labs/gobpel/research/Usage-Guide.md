# GoBPEL Usage Manual

This manual provides a comprehensive guide on how to use the GoBPEL service through `grpcurl` commands. Each command's purpose, syntax, and expected results are explained in detail.

## Prerequisites

- Ensure Docker is installed and running on your machine.
- Start the GoBPEL and mock servers using Docker Compose:
  ```sh
  docker-compose up --build
  ```

## Commands

### 1. Create Process

#### Purpose

Creates a new BPEL process with the specified details.

#### Command

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

#### Expected Results

The server should return the created process with all the specified details.

### 2. Get Process

#### Purpose

Retrieves the details of an existing BPEL process by its ID.

#### Command

```sh
grpcurl -plaintext -d '{
  "processId": "testProcess"
}' localhost:50051 bpel.BPELProcessService/GetProcess
```

#### Expected Results

The server should return the details of the specified process.

### 3. Update Process

#### Purpose

Updates an existing BPEL process with new details.

#### Command

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

#### Expected Results

The server should return the updated process with the new details.

### 4. Delete Process

#### Purpose

Deletes an existing BPEL process by its ID.

#### Command

```sh
grpcurl -plaintext -d '{
  "processId": "testProcess"
}' localhost:50051 bpel.BPELProcessService/DeleteProcess
```

#### Expected Results

The server should return an empty response, indicating successful deletion.

### 5. Delete All Processes

#### Purpose

Deletes all BPEL processes in the system.

#### Command

```sh
grpcurl -plaintext -d '{}' localhost:50051 bpel.BPELProcessService/DeleteAllProcesses
```

#### Expected Results

The server should return an empty response, indicating successful deletion of all processes.

### 6. Get All Processes

#### Purpose

Retrieves a list of all BPEL processes.

#### Command

```sh
grpcurl -plaintext -d '{}' localhost:50051 bpel.BPELProcessService/GetAllProcesses
```

#### Expected Results

The server should return a list of all processes in the system.

### 7. Execute Process

#### Purpose

Simulates the execution of a specified BPEL process and retrieves its status.

#### Command

```sh
grpcurl -plaintext -d '{
  "processId": "testProcess"
}' localhost:50051 bpel.BPELProcessService/ExecuteProcess
```

#### Expected Results

The server should return the status of the execution and a list of all processes.

### 8. Publish

#### Purpose

Forces the server to post the results of a specified method to a given results server.

#### Command

```sh
grpcurl -plaintext -d '{
  "resultsServer": "http://mockserver:8080/results",
  "runMethod": "GetAllProcesses"
}' localhost:50051 bpel.BPELProcessService/Publish
```

#### Expected Results

The server should send the results of the specified method to the given results server URL.

### 9. Subscribe

#### Purpose

Subscribes to a specified event type, allowing notifications to be sent to a given URL when the event occurs.

#### Command

```sh
grpcurl -plaintext -d '{
  "eventType": "processExecuted",
  "notifyURL": "http://mockserver:8080/notify"
}' localhost:50051 bpel.BPELProcessService/Subscribe
```

#### Expected Results

The server should add the specified URL to the list of subscribers for the specified event type. Notifications will be sent to the URL when the event occurs.

## Notes

- Ensure the GoBPEL server is running and accessible at `localhost:50051`.
- The mock server should be running and accessible at `http://mockserver:8080`.
- Replace `testProcess` with the actual process ID you want to use for the commands.
- Adjust the server URLs and port numbers based on your specific setup and network configurations.
