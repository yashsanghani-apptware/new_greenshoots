To accommodate the callback service running on the host and listening on port 4000, you need to use the `host.docker.internal` hostname within the Docker container to reach the host machine.

Here are the updated `curl` commands:

### 1. Publish an Event

```sh
curl -X POST http://localhost:3000/publish -H "Content-Type: application/json" -d '{
  "id": "1",
  "type": "example.event",
  "payload": {"message": "Hello, World!"},
  "timestamp": "2023-01-01T00:00:00Z",
  "source": "example-source"
}'
```

### 2. Subscribe to an Event

```sh
curl -X POST http://localhost:3000/subscribe -H "Content-Type: application/json" -d '{
  "eventType": "example.event",
  "callbackUrl": "http://host.docker.internal:4000/events"
}'
```

### 3. List All Subscriptions

```sh
curl -X GET http://localhost:3000/subscriptions
```

### 4. Unsubscribe from an Event

```sh
curl -X POST http://localhost:3000/unsubscribe -H "Content-Type: application/json" -d '{
  "eventType": "example.event",
  "callbackUrl": "http://host.docker.internal:4000/events"
}'
```

### 5. Get Metrics

```sh
curl -X GET http://localhost:3000/metrics
```

### Explanation of Each Command

1. **Publish an Event**:
   - This command sends a POST request to the `/publish` endpoint with an example event payload.
   - Replace the `id`, `type`, `payload`, `timestamp`, and `source` fields with the actual event data as needed.

2. **Subscribe to an Event**:
   - This command sends a POST request to the `/subscribe` endpoint to subscribe a callback URL to an event type.
   - Replace the `eventType` with the actual event type.
   - Use `http://host.docker.internal:4000/events` to point to the callback service running on the host.

3. **List All Subscriptions**:
   - This command sends a GET request to the `/subscriptions` endpoint to retrieve all current subscriptions.

4. **Unsubscribe from an Event**:
   - This command sends a POST request to the `/unsubscribe` endpoint to remove a subscription for a callback URL from an event type.
   - Replace the `eventType` with the actual event type.
   - Use `http://host.docker.internal:4000/events` to point to the callback service running on the host.

5. **Get Metrics**:
   - This command sends a GET request to the `/metrics` endpoint to retrieve metrics about published, delivered, and failed events.

By using `host.docker.internal`, the Docker container can reach services running on the host machine, ensuring that the event callbacks are correctly routed to your host-based callback service.
