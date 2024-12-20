import { Router, Request, Response } from 'express'; // Import necessary classes from express
import DocumentDBService from '../services/documentdb.service'; // Import the DocumentDBService class
import i18n from '../config/i18n'; // Import internationalization module

const router = Router(); // Create a new Router instance
const documentDBService = new DocumentDBService(); // Create an instance of DocumentDBService

/**
 * Route to create a new collection in MongoDB
 * This endpoint accepts a JSON payload with a collection name and creates a new collection in the database.
 * 
 * Example request payload:
 * {
 *   "collectionName": "myCollection"
 * }
 */
router.post('/collections', async (req: Request, res: Response) => {
    console.log('POST /collections');
    const { collectionName } = req.body; // Extract collection name from request body
    try {
        await documentDBService.createCollection(collectionName); // Create collection
        res.status(200).send({ message: i18n.__('Collection created successfully') });
    } catch (error) {
        res.status(500).send({ error: i18n.__('Error creating collection') }); // Handle errors
    }
});

/**
 * Route to insert documents into a collection
 * This endpoint accepts a JSON payload with a collection name and an array of documents, and inserts the documents into the specified collection.
 * 
 * Example request payload:
 * {
 *   "collectionName": "myCollection",
 *   "documents": [
 *     { "name": "John" },
 *     { "name": "Doe" }
 *   ]
 * }
 */
router.post('/documents', async (req: Request, res: Response) => {
    console.log('POST /documents');
    const { collectionName, documents } = req.body; // Extract collection name and documents from request body
    try {
        await documentDBService.insertDocuments(collectionName, documents); // Insert documents
        res.status(200).send({ message: i18n.__('Documents inserted successfully') });
    } catch (error) {
        console.error('Error inserting documents:', error); // Log error
        res.status(500).send({ error: i18n.__('Error inserting documents') }); // Handle errors
    }
});

/**
 * Route to find documents in a collection
 * This endpoint accepts query parameters for collection name and a query object, and returns the matching documents from the specified collection.
 * 
 * Example request URL:
 * GET /documents?collectionName=myCollection&query={"name": "John"}
 */
router.get('/documents', async (req: Request, res: Response) => {
    console.log('GET /documents');
    const { collectionName, query } = req.query; // Extract collection name and query from query parameters
    try {
        const documents = await documentDBService.findDocuments(collectionName as string, JSON.parse(query as string)); // Find documents
        res.status(200).send(documents); // Return found documents
    } catch (error) {
        console.error('Error finding documents:', error); // Log error
        res.status(500).send({ error: i18n.__('Error finding documents') }); // Handle errors
    }
});

/**
 * Route to create a vector index in a collection
 * This endpoint accepts a JSON payload with collection name, index name, field name, and number of dimensions, and creates a vector index on the specified field.
 * 
 * Example request payload:
 * {
 *   "collectionName": "myCollection",
 *   "indexName": "myVectorIndex",
 *   "fieldName": "vectorField",
 *   "numDimensions": 128
 * }
 */
router.post('/vectors', async (req: Request, res: Response) => {
    console.log('POST /vectors');
    const { collectionName, indexName, fieldName, numDimensions } = req.body; // Extract parameters from request body
    try {
        await documentDBService.createVectorIndex(collectionName, indexName, fieldName, numDimensions); // Create vector index
        res.status(200).send({ message: i18n.__('Vector index created successfully') });
    } catch (error) {
        res.status(500).send({ error: i18n.__('Error creating vector index') }); // Handle errors
    }
});

/**
 * Route to insert documents with vector fields into a collection
 * This endpoint accepts a JSON payload with collection name and an array of documents, and inserts the documents with vector fields into the specified collection.
 * 
 * Example request payload:
 * {
 *   "collectionName": "myCollection",
 *   "documents": [
 *     { "vectorField": [0.1, 0.2, 0.3, ...] }
 *   ]
 * }
 */
router.post('/vectors/documents', async (req: Request, res: Response) => {
    console.log('POST /vectors/documents');
    const { collectionName, documents } = req.body; // Extract collection name and documents from request body
    try {
        await documentDBService.insertVectorDocuments(collectionName, documents); // Insert vector documents
        res.status(200).send({ message: i18n.__('Vector documents inserted successfully') });
    } catch (error) {
        console.error('Error inserting vector documents:', error); // Log error
        res.status(500).send({ error: i18n.__('Error inserting vector documents') }); // Handle errors
    }
});

/**
 * Route to perform a vector search in a collection
 * This endpoint accepts a JSON payload with collection name, field name, query vector, number of nearest neighbors (k), similarity measure, and number of clusters to search (probes),
 * and returns the search results from the specified collection.
 * 
 * Example request payload:
 * {
 *   "collectionName": "myCollection",
 *   "fieldName": "vectorField",
 *   "queryVector": [0.1, 0.2, 0.3, ...],
 *   "k": 5,
 *   "similarity": "euclidean",
 *   "probes": 1
 * }
 */
router.post('/vectors/search', async (req: Request, res: Response) => {
    console.log('POST /vectors/search');
    const { collectionName, fieldName, queryVector, k, similarity, probes } = req.body; // Extract parameters from request body
    try {
        const results = await documentDBService.vectorSearch(collectionName, fieldName, queryVector, k, similarity, probes); // Perform vector search
        res.status(200).send(results); // Return search results
    } catch (error) {
        console.error('Error performing vector search:', error); // Log error
        res.status(500).send({ error: i18n.__('Error performing vector search') }); // Handle errors
    }
});

export default router; // Export the router as the default export


