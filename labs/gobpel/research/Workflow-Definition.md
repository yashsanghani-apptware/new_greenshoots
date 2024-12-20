# Workflow Definition

A workflow is defined as a series of steps that can include simple processes, conditional branching, and event generation. Each step in the workflow is represented by a `WorkflowStep` message in the Protobuf definition.

## Protobuf Definition

The Protobuf definitions relevant to workflows are as follows:

```proto
message WorkflowStep {
    string stepId = 1;
    string type = 2; // "process", "if", "event"
    string condition = 3; // Only for "if" type
    string eventType = 4; // Only for "event" type
    repeated string nextSteps = 5; // Next steps after this step
}

message CreateWorkflowRequest {
    string workflowId = 1;
    repeated WorkflowStep steps = 2;
}

message ExecuteWorkflowRequest {
    string workflowId = 1;
}

message ExecuteWorkflowResponse {
    string status = 1;
}
```

- `WorkflowStep`: Represents a single step in the workflow.
  - `stepId`: Unique identifier for the step.
  - `type`: Type of the step, which can be "process", "if", or "event".
  - `condition`: The condition to evaluate if the step is an "if" type.
  - `eventType`: The event type to generate if the step is an "event" type.
  - `nextSteps`: List of step IDs to execute next.

- `CreateWorkflowRequest`: Used to create a new workflow.
  - `workflowId`: Unique identifier for the workflow.
  - `steps`: List of steps that define the workflow.

- `ExecuteWorkflowRequest`: Used to execute an existing workflow.
  - `workflowId`: Unique identifier for the workflow to execute.

- `ExecuteWorkflowResponse`: Contains the status of the executed workflow.
  - `status`: Status message indicating the result of the execution.

## Workflow Creation

When a workflow is created, it is stored in memory (or in a database if you implement persistence). The steps of the workflow are defined in the `CreateWorkflowRequest` message.

### Example: Create Workflow

Here's an example of how to create a workflow with five steps using `grpcurl`:

```sh
grpcurl -plaintext -d '{
  "workflowId": "testWorkflow",
  "steps": [
    {"stepId": "1", "type": "process", "nextSteps": ["2"]},
    {"stepId": "2", "type": "if", "condition": "someCondition", "nextSteps": ["3", "4"]},
    {"stepId": "3", "type": "process", "nextSteps": ["5"]},
    {"stepId": "4", "type": "process", "nextSteps": ["5"]},
    {"stepId": "5", "type": "event", "eventType": "eventGenerated"}
  ]
}' localhost:50051 bpel.BPELProcessService/CreateWorkflow
```

## Workflow Execution

When a workflow is executed, the server goes through each step in the defined sequence, performing the appropriate actions based on the step type.

### Execution Logic

The execution logic is handled in the `executeSteps` method of the server implementation. Let's break it down:

```go
func (s *Server) executeSteps(steps []*api.WorkflowStep) string {
    for _, step := range steps {
        switch step.Type {
        case "process":
            // Implement the process logic here
            continue
        case "if":
            conditionMet := checkCondition(step.Condition)
            if conditionMet {
                // Execute the next steps if the condition is met
                nextSteps := getNextSteps(step.NextSteps, true)
                s.executeSteps(nextSteps)
            } else {
                // Execute the next steps if the condition is not met
                nextSteps := getNextSteps(step.NextSteps, false)
                s.executeSteps(nextSteps)
            }
        case "event":
            // Generate the event and notify subscribers
            s.notifySubscribers(step.EventType, "event data")
        }
    }
    return "Workflow executed successfully"
}
```

- **Process Step**: When the step type is "process", the corresponding logic is executed, and the workflow continues to the next step.
- **If Step**: When the step type is "if", the condition is evaluated. Depending on whether the condition is met, the next appropriate steps are determined and executed.
- **Event Step**: When the step type is "event", an event is generated, and subscribers to this event are notified.

### Condition Checking

The condition checking logic is implemented in the `checkCondition` function. This function evaluates whether the condition specified in an "if" step is met.

```go
func checkCondition(condition string) bool {
    // Implement the condition check logic here
    return true // Placeholder
}
```

### Notify Subscribers

The `notifySubscribers` method sends event notifications to all registered subscribers.

```go
func (s *Server) notifySubscribers(eventType string, data interface{}) {
    s.mu.Lock()
    defer s.mu.Unlock()
    urls, ok := s.subscribers[eventType]
    if !ok {
        return
    }

    for _, url := range urls {
        // Send the event data to the subscriber
        sendEvent(url, data.(string))
    }
}

func sendEvent(url, data string) {
    // Implement the logic to send event data to the subscriber
    http.Post(url, "application/json", bytes.NewBuffer([]byte(data)))
}
```

## Testing Workflow Execution

### Example: Execute Workflow

Here's an example of how to execute the created workflow using `grpcurl`:

```sh
grpcurl -plaintext -d '{
  "workflowId": "testWorkflow"
}' localhost:50051 bpel.BPELProcessService/ExecuteWorkflow
```

This command will trigger the execution of the workflow with the ID `testWorkflow`.

## Summary

The workflow definition and execution in GoBPEL involve the following steps:

1. **Define the Workflow**: Use Protobuf messages to define the structure of the workflow.
2. **Create the Workflow**: Send a request to create a workflow, specifying the steps and their details.
3. **Execute the Workflow**: Send a request to execute the workflow, which triggers the defined sequence of steps.
4. **Process Each Step**: Implement the logic for handling different types of steps (process, if, event) in the server.
5. **Notify Subscribers**: Notify registered subscribers when events are generated during workflow execution.

