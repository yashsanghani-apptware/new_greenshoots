"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb"); // Import necessary MongoDB classes
var redis_1 = require("redis"); // Import Redis client classes
var logger_1 = require("../config/logger"); // Import logger for logging
var config_1 = require("../config/config"); // Import configuration settings
/**
 * DocumentDBService is a service class for interacting with MongoDB and Redis.
 * This class provides methods to create collections, insert documents, perform vector searches, and cache query results.
 * The purpose of this class is to abstract the database operations and provide a simplified interface for interacting with MongoDB and Redis.
 */
var DocumentDBService = /** @class */ (function () {
    /**
     * Constructor initializes MongoDB and Redis clients
     */
    function DocumentDBService() {
        this.isRedisConnected = false; // Flag to track Redis connection status
        this.client = new mongodb_1.MongoClient(config_1.config.mongodb.uri, config_1.config.mongodb.options);
        this.db = {}; // Initialize as empty object to be assigned later
        this.redisClient = (0, redis_1.createClient)({ url: config_1.config.redis.uri });
    }
    /**
     * Connects to MongoDB and Redis
     * This method ensures that the connections to both MongoDB and Redis are established before performing any operations.
     * It logs the connection status and throws an error if the connection fails.
     */
    DocumentDBService.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.client.connect()];
                    case 1:
                        _a.sent(); // Connect to MongoDB
                        this.db = this.client.db(config_1.config.mongodb.dbName); // Select the database
                        logger_1.default.info('Connected to DocumentDB');
                        if (!!this.isRedisConnected) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.redisClient.connect()];
                    case 2:
                        _a.sent();
                        this.isRedisConnected = true; // Update connection status
                        logger_1.default.info('Connected to Redis');
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        logger_1.default.error('Error connecting to DocumentDB or Redis: ' + error_1.message);
                        throw new Error('ConnectionError'); // Throw custom error on failure
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Disconnects from MongoDB and Redis
     * This method ensures that the connections to both MongoDB and Redis are closed after operations are completed.
     * It logs the disconnection status and throws an error if the disconnection fails.
     */
    DocumentDBService.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.client.close()];
                    case 1:
                        _a.sent(); // Close MongoDB connection
                        logger_1.default.info('Disconnected from DocumentDB');
                        if (!this.isRedisConnected) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.redisClient.disconnect()];
                    case 2:
                        _a.sent();
                        this.isRedisConnected = false; // Update connection status
                        logger_1.default.info('Disconnected from Redis');
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        logger_1.default.error('Error disconnecting from DocumentDB or Redis: ' + error_2.message);
                        throw new Error('DisconnectionError'); // Throw custom error on failure
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
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
    DocumentDBService.prototype.createCollection = function (collectionName) {
        return __awaiter(this, void 0, void 0, function () {
            var collection, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 6]);
                        return [4 /*yield*/, this.connect()];
                    case 1:
                        _a.sent(); // Ensure connection
                        return [4 /*yield*/, this.db.createCollection(collectionName)];
                    case 2:
                        collection = _a.sent();
                        logger_1.default.info("Collection ".concat(collectionName, " created"));
                        return [2 /*return*/, collection]; // Return the created collection
                    case 3:
                        error_3 = _a.sent();
                        logger_1.default.error("Error creating collection ".concat(collectionName, ": ") + error_3.message);
                        throw new Error('CreateCollectionError'); // Throw custom error on failure
                    case 4: return [4 /*yield*/, this.disconnect()];
                    case 5:
                        _a.sent(); // Ensure disconnection
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
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
    DocumentDBService.prototype.insertDocuments = function (collectionName, documents) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 6]);
                        return [4 /*yield*/, this.connect()];
                    case 1:
                        _a.sent(); // Ensure connection
                        return [4 /*yield*/, this.db.collection(collectionName).insertMany(documents)];
                    case 2:
                        result = _a.sent();
                        logger_1.default.info("".concat(result.insertedCount, " documents inserted into ").concat(collectionName));
                        return [2 /*return*/, result]; // Return the insert result
                    case 3:
                        error_4 = _a.sent();
                        logger_1.default.error("Error inserting documents into ".concat(collectionName, ": ") + error_4.message);
                        throw new Error('InsertDocumentsError'); // Throw custom error on failure
                    case 4: return [4 /*yield*/, this.disconnect()];
                    case 5:
                        _a.sent(); // Ensure disconnection
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
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
    DocumentDBService.prototype.findDocuments = function (collectionName, query, options) {
        return __awaiter(this, void 0, void 0, function () {
            var cacheKey, cachedResults, cursor, results, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cacheKey = "".concat(collectionName, "_").concat(JSON.stringify(query), "_").concat(JSON.stringify(options));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, 8, 10]);
                        return [4 /*yield*/, this.connect()];
                    case 2:
                        _a.sent(); // Ensure connection
                        return [4 /*yield*/, this.redisClient.get(cacheKey)];
                    case 3:
                        cachedResults = _a.sent();
                        if (cachedResults) {
                            logger_1.default.info("Cache hit for query on ".concat(collectionName));
                            return [2 /*return*/, JSON.parse(cachedResults)]; // Return cached results
                        }
                        logger_1.default.info("Cache miss for query on ".concat(collectionName));
                        return [4 /*yield*/, this.db.collection(collectionName).find(query, options)];
                    case 4:
                        cursor = _a.sent();
                        return [4 /*yield*/, cursor.toArray()];
                    case 5:
                        results = _a.sent();
                        logger_1.default.info("Found ".concat(results.length, " documents in ").concat(collectionName));
                        // Cache the results for 1 hour
                        return [4 /*yield*/, this.redisClient.set(cacheKey, JSON.stringify(results), { EX: 3600 })];
                    case 6:
                        // Cache the results for 1 hour
                        _a.sent();
                        return [2 /*return*/, results]; // Return the results
                    case 7:
                        error_5 = _a.sent();
                        logger_1.default.error("Error finding documents in ".concat(collectionName, ": ") + error_5.message);
                        throw new Error('FindDocumentsError'); // Throw custom error on failure
                    case 8: return [4 /*yield*/, this.disconnect()];
                    case 9:
                        _a.sent(); // Ensure disconnection
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
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
    DocumentDBService.prototype.createVectorIndex = function (collectionName, indexName, fieldName, numDimensions) {
        return __awaiter(this, void 0, void 0, function () {
            var command, result, error_6;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, 4, 6]);
                        return [4 /*yield*/, this.connect()];
                    case 1:
                        _b.sent(); // Ensure connection
                        command = {
                            createIndexes: collectionName,
                            indexes: [
                                {
                                    name: indexName,
                                    key: (_a = {}, _a[fieldName] = "vector", _a), // Define the field as a vector
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
                        return [4 /*yield*/, this.db.command(command)];
                    case 2:
                        result = _b.sent();
                        logger_1.default.info("Vector index ".concat(indexName, " created on collection ").concat(collectionName));
                        return [2 /*return*/, result]; // Return the result of the command
                    case 3:
                        error_6 = _b.sent();
                        logger_1.default.error("Error creating vector index ".concat(indexName, " on collection ").concat(collectionName, ": ") + error_6.message);
                        throw new Error('CreateVectorIndexError'); // Throw custom error on failure
                    case 4: return [4 /*yield*/, this.disconnect()];
                    case 5:
                        _b.sent(); // Ensure disconnection
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
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
    DocumentDBService.prototype.insertVectorDocuments = function (collectionName, documents) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 6]);
                        return [4 /*yield*/, this.connect()];
                    case 1:
                        _a.sent(); // Ensure connection
                        return [4 /*yield*/, this.db.collection(collectionName).insertMany(documents)];
                    case 2:
                        result = _a.sent();
                        logger_1.default.info("".concat(result.insertedCount, " vector documents inserted into ").concat(collectionName));
                        return [2 /*return*/, result]; // Return the insert result
                    case 3:
                        error_7 = _a.sent();
                        logger_1.default.error("Error inserting vector documents into ".concat(collectionName, ": ") + error_7.message);
                        throw new Error('InsertVectorDocumentsError'); // Throw custom error on failure
                    case 4: return [4 /*yield*/, this.disconnect()];
                    case 5:
                        _a.sent(); // Ensure disconnection
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
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
    DocumentDBService.prototype.vectorSearch = function (collectionName, fieldName, queryVector, k, similarity, probes) {
        return __awaiter(this, void 0, void 0, function () {
            var pipeline, result, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Ensure k and probes are positive integers
                        if (!Number.isInteger(k) || k <= 0) {
                            throw new Error("Invalid value for k: ".concat(k, ". Expected a positive integer greater than 0."));
                        }
                        if (!Number.isInteger(probes) || probes <= 0) {
                            throw new Error("Invalid value for probes: ".concat(probes, ". Expected a positive integer greater than 0."));
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 7]);
                        return [4 /*yield*/, this.connect()];
                    case 2:
                        _a.sent(); // Ensure connection
                        pipeline = [
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
                        return [4 /*yield*/, this.db.collection(collectionName).aggregate(pipeline).toArray()];
                    case 3:
                        result = _a.sent();
                        logger_1.default.info("Vector search performed on collection ".concat(collectionName));
                        return [2 /*return*/, result]; // Return the search results
                    case 4:
                        error_8 = _a.sent();
                        logger_1.default.error("Error performing vector search on collection ".concat(collectionName, ": ") + error_8.message);
                        throw new Error('VectorSearchError'); // Throw custom error on failure
                    case 5: return [4 /*yield*/, this.disconnect()];
                    case 6:
                        _a.sent(); // Ensure disconnection
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return DocumentDBService;
}());
exports.default = DocumentDBService;
