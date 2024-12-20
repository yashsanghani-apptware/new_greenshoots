## 1. Create/Update Subscriptions
Endpoint: PUT /subscriptions/{offering_id}/investor/{investor_id}


curl -X PUT http://localhost:3000/subscriptions/{offering_id}/investor/{investor_id} \
-H "Content-Type: application/json" \
-d '{
  "number_of_shares": 100,
  "status": "pending"
}'
Replace {offering_id} and {investor_id} with the actual IDs.

## 2. List Offering Subscriptions
Endpoint: GET /subscriptions/{offering_id}


curl -X GET http://localhost:3000/subscriptions/{offering_id}
Replace {offering_id} with the actual ID.

## 3. List Investor Subscriptions
Endpoint: GET /subscriptions/investor/{user_id}


curl -X GET http://localhost:3000/subscriptions/investor/{user_id}
Replace {user_id} with the actual ID of the investor.

## 4. Delete Subscription
Endpoint: DELETE /subscriptions/{offering_id}/investor/{user_id}


curl -X DELETE http://localhost:3000/subscriptions/{offering_id}/investor/{user_id}
Replace {offering_id} and {user_id} with the actual IDs.

## 5. Create/Update Allocations
Endpoint: PUT /subscriptions/{offering_id}/investor/{user_id}/allocations


curl -X PUT http://localhost:3000/subscriptions/{offering_id}/investor/{user_id}/allocations \
-H "Content-Type: application/json" \
-d '{
  "allocated_shares": 50,
  "status": "allocated"
}'
Replace {offering_id} and {user_id} with the actual IDs.

## 6. Delete Allocation
Endpoint: DELETE /subscriptions/{offering_id}/investor/{user_id}/allocations


curl -X DELETE http://localhost:3000/subscriptions/{offering_id}/investor/{user_id}/allocations
Replace {offering_id} and {user_id} with the actual IDs.

# Summary
These curl scripts can be used to validate all the endpoints of the Subscription Service, ensuring that each endpoint is functioning correctly as defined in the functional and design specifications. Replace the placeholders {offering_id}, {investor_id}, and {user_id} with the actual IDs obtained from previous API responses to test the update, get, and delete operations.
