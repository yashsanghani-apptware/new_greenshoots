import { MongoClient, Db, MongoClientOptions } from 'mongodb'; // Import necessary MongoDB classes
import { createClient, RedisClientType } from 'redis'; // Import Redis client classes
import logger from '../config/logger'; // Import logger for logging
import { config } from '../config/config'; // Import configuration settings

/**
 * DocumentDBService is a service class for interacting with MongoDB and Redis.
 * This class provides methods to create collections, insert documents, perform vector searches, and cache query results.
 * The purpose of this class is to abstract the database operations and provide a simplified interface for interacting with MongoDB and Redis.
 */
class DocumentDBService {
    private client: MongoClient; // MongoDB client instance
    private db: Db; // MongoDB database instance
    private redisClient: RedisClientType; // Redis client instance
    private isRedisConnected: boolean = false; // Flag to track Redis connection status

    /**
     * Constructor initializes MongoDB and Redis clients
     */
    constructor() {
        this.client = new MongoClient(config.mongodb.uri, config.mongodb.options as MongoClientOptions);
        this.db = {} as Db; // Initialize as empty object to be assigned later
        this.redisClient = createClient({ url: config.redis.uri });
    }

    /**
     * Connects to MongoDB and Redis
     * This method ensures that the connections to both MongoDB and Redis are established before performing any operations.
     * It logs the connection status and throws an error if the connection fails.
     */
    async connect() {
        try {
            await this.client.connect(); // Connect to MongoDB
            this.db = this.client.db(config.mongodb.dbName); // Select the database
            logger.info('Connected to DocumentDB');

            // Connect to Redis if not already connected
            if (!this.isRedisConnected) {
                await this.redisClient.connect();
                this.isRedisConnected = true; // Update connection status
                logger.info('Connected to Redis');
            }
        } catch (error) {
            logger.error('Error connecting to DocumentDB or Redis: ' + (error as Error).message);
            throw new Error('ConnectionError'); // Throw custom error on failure
        }
    }

    /**
     * Disconnects from MongoDB and Redis
     * This method ensures that the connections to both MongoDB and Redis are closed after operations are completed.
     * It logs the disconnection status and throws an error if the disconnection fails.
     */
    async disconnect() {
        try {
            await this.client.close(); // Close MongoDB connection
            logger.info('Disconnected from DocumentDB');

            // Disconnect from Redis if connected
            if (this.isRedisConnected) {
                await this.redisClient.disconnect();
                this.isRedisConnected = false; // Update connection status
                logger.info('Disconnected from Redis');
            }
        } catch (error) {
            logger.error('Error disconnecting from DocumentDB or Redis: ' + (error as Error).message);
            throw new Error('DisconnectionError'); // Throw custom error on failure
        }
    }

    /**
     * Creates a new collection in MongoDB
     * @param {string} collectionName - The name of the collection to be created
     * @returns {Promise<Db>} - The created collection
     * 
     * Example usage:
     * ```
     * await documentDBService.createCollection('myCollection');
     * ```
     */
    async createCollection(collectionName: string) {
        try {
            await this.connect(); // Ensure connection
            const collection = await this.db.createCollection(collectionName);
            logger.info(`Collection ${collectionName} created`);
            return collection; // Return the created collection
        } catch (error) {
            logger.error(`Error creating collection ${collectionName}: ` + (error as Error).message);
            throw new Error('CreateCollectionError'); // Throw custom error on failure
        } finally {
            await this.disconnect(); // Ensure disconnection
        }
    }

    /**
     * Inserts multiple documents into a collection
     * @param {string} collectionName - The name of the collection
     * @param {object[]} documents - The documents to be inserted
     * @returns {Promise<any>} - The result of the insert operation
     * 
     * Example usage:
     * ```
     * await documentDBService.insertDocuments('myCollection', [{ name: 'John' }, { name: 'Doe' }]);
     * ```
     */
    async insertDocuments(collectionName: string, documents: object[]) {
        try {
            await this.connect(); // Ensure connection
            const result = await this.db.collection(collectionName).insertMany(documents);
            logger.info(`${result.insertedCount} documents inserted into ${collectionName}`);
            return result; // Return the insert result
        } catch (error) {
            logger.error(`Error inserting documents into ${collectionName}: ` + (error as Error).message);
            throw new Error('InsertDocumentsError'); // Throw custom error on failure
        } finally {
            await this.disconnect(); // Ensure disconnection
        }
    }

    /**
     * Finds documents in a collection with caching
     * @param {string} collectionName - The name of the collection
     * @param {object} query - The query object
     * @param {object} [options] - Optional query options
     * @returns {Promise<any[]>} - The found documents
     * 
     * Example usage:
     * ```
     * const documents = await documentDBService.findDocuments('myCollection', { name: 'John' });
     * ```
     */
    async findDocuments(collectionName: string, query: object, options?: object) {
        const cacheKey = `${collectionName}_${JSON.stringify(query)}_${JSON.stringify(options)}`; // Create a unique cache key

        try {
            await this.connect(); // Ensure connection
            const cachedResults = await this.redisClient.get(cacheKey); // Try to get results from cache

            if (cachedResults) {
                logger.info(`Cache hit for query on ${collectionName}`);
                return JSON.parse(cachedResults); // Return cached results
            }

            logger.info(`Cache miss for query on ${collectionName}`);
            const cursor = await this.db.collection(collectionName).find(query, options);
            const results = await cursor.toArray(); // Fetch results from MongoDB
            logger.info(`Found ${results.length} documents in ${collectionName}`);

            // Cache the results for 1 hour
            await this.redisClient.set(cacheKey, JSON.stringify(results), { EX: 3600 });

            return results; // Return the results
        } catch (error) {
            logger.error(`Error finding documents in ${collectionName}: ` + (error as Error).message);
            throw new Error('FindDocumentsError'); // Throw custom error on failure
        } finally {
            await this.disconnect(); // Ensure disconnection
        }
    }

    /**
     * Creates a vector index in a collection
     * @param {string} collectionName - The name of the collection
     * @param {string} indexName - The name of the index
     * @param {string} fieldName - The name of the field to index
     * @param {number} numDimensions - The number of dimensions in the vector
     * @returns {Promise<any>} - The result of the index creation
     * 
     * Example usage:
     * ```
     * await documentDBService.createVectorIndex('myCollection', 'myVectorIndex', 'vectorField', 128);
     * ```
     */
    async createVectorIndex(collectionName: string, indexName: string, fieldName: string, numDimensions: number) {
        try {
            await this.connect(); // Ensure connection
            const command = {
                createIndexes: collectionName,
                indexes: [
                    {
                        name: indexName,
                        key: { [fieldName]: "vector" }, // Define the field as a vector
                        vectorOptions: {
                            type: "hnsw", // Use HNSW algorithm for vector search
                            dimensions: numDimensions, // Number of dimensions in the vector
                            similarity: "euclidean", // Similarity measure
                            m: 16, // HNSW parameter
                            efConstruction: 64 // HNSW parameter
                        }
                    }
                ]
            };
            const result = await this.db.command(command);
            logger.info(`Vector index ${indexName} created on collection ${collectionName}`);
            return result; // Return the result of the command
        } catch (error) {
            logger.error(`Error creating vector index ${indexName} on collection ${collectionName}: ` + (error as Error).message);
            throw new Error('CreateVectorIndexError'); // Throw custom error on failure
        } finally {
            await this.disconnect(); // Ensure disconnection
        }
    }

    /**
     * Inserts documents with vector fields into a collection
     * @param {string} collectionName - The name of the collection
     * @param {object[]} documents - The documents to be inserted
     * @returns {Promise<any>} - The result of the insert operation
     * 
     * Example usage:
     * ```
     * await documentDBService.insertVectorDocuments('myCollection', [{ vectorField: [0.1, 0.2, 0.3, ...] }]);
     * ```
     */
    async insertVectorDocuments(collectionName: string, documents: object[]) {
        try {
            await this.connect(); // Ensure connection
            const result = await this.db.collection(collectionName).insertMany(documents);
            logger.info(`${result.insertedCount} vector documents inserted into ${collectionName}`);
            return result; // Return the insert result
        } catch (error) {
            logger.error(`Error inserting vector documents into ${collectionName}: ` + (error as Error).message);
            throw new Error('InsertVectorDocumentsError'); // Throw custom error on failure
        } finally {
            await this.disconnect(); // Ensure disconnection
        }
    }

    /**
     * Performs a vector search in a collection
     * @param {string} collectionName - The name of the collection
     * @param {string} fieldName - The name of the field to search
     * @param {number[]} queryVector - The query vector
     * @param {number} k - The number of nearest neighbors to find
     * @param {string} similarity - The similarity measure (e.g., "euclidean", "cosine")
     * @param {number} probes - The number of clusters to search
     * @returns {Promise<any[]>} - The search results
     * 
     * Example usage:
     * ```
     * const results = await documentDBService.vectorSearch('myCollection', 'vectorField', [0.1, 0.2, 0.3, ...], 5, 'euclidean', 1);
     * ```
     */
    async vectorSearch(collectionName: string, fieldName: string, queryVector: number[], k: number, similarity: string, probes: number) {
        // Ensure k and probes are positive integers
        if (!Number.isInteger(k) || k <= 0) {
            throw new Error(`Invalid value for k: ${k}. Expected a positive integer greater than 0.`);
        }
        if (!Number.isInteger(probes) || probes <= 0) {
            throw new Error(`Invalid value for probes: ${probes}. Expected a positive integer greater than 0.`);
        }

        try {
            await this.connect(); // Ensure connection
            const pipeline = [
                {
                    $search: {
                        vectorSearch: {
                            vector: queryVector,
                            path: fieldName,
                            k: k,
                            similarity: similarity,
                            probes: probes
                        }
                    }
                }
            ];
            const result = await this.db.collection(collectionName).aggregate(pipeline).toArray(); // Perform the aggregation
            logger.info(`Vector search performed on collection ${collectionName}`);
            return result; // Return the search results
        } catch (error) {
            logger.error(`Error performing vector search on collection ${collectionName}: ` + (error as Error).message);
            throw new Error('VectorSearchError'); // Throw custom error on failure
        } finally {
            await this.disconnect(); // Ensure disconnection
        }
    }
}

export default DocumentDBService;

