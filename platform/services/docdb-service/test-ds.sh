export COLLECTION_NAME="farms5"
export DOCUMENTS='[{"name": "Alice", "age": 25, "city": "New York"}, {"name": "Bob", "age": 30, "city": "San Francisco"}]'
export QUERY='{"age": {"$gt": 20}}'

echo "Creating Collection ..."
# Create Collection
curl -X POST http://localhost:6000/api/storage/collections -H "Content-Type: application/json" -d "{\"collectionName\": \"$COLLECTION_NAME\"}"


echo "\nInserting $DOCUMENTS into $COLLECTION_NAME"

# Insert Documents
curl -X POST http://localhost:6000/api/storage/documents -H "Content-Type: application/json" -d "{\"collectionName\": \"$COLLECTION_NAME\", \"documents\": $DOCUMENTS}"

echo "\nFinding $QUERY in $COLLECTION_NAME (Scenario: Cache Miss)"
# Find Documents (Cache Miss)
curl -G 'http://localhost:6000/api/storage/documents' --data-urlencode "collectionName=$COLLECTION_NAME" --data-urlencode "query=$QUERY"

echo "\nFinding $QUERY in $COLLECTION_NAME(Scenario: Cache Hit)"
# Find Documents (Cache Hit)
curl -G 'http://localhost:6000/api/storage/documents' --data-urlencode "collectionName=$COLLECTION_NAME" --data-urlencode "query=$QUERY"


