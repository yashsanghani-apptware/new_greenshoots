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
var aws_sdk_1 = require("aws-sdk");
var documentdb_service_1 = require("../services/documentdb.service");
var config_1 = require("../config/config");
var logger_1 = require("../config/logger");
// Initialize AWS SDK
aws_sdk_1.default.config.update({
    region: config_1.config.aws.region,
    accessKeyId: config_1.config.aws.accessKeyId,
    secretAccessKey: config_1.config.aws.secretAccessKey,
});
var sagemakerRuntime = new aws_sdk_1.default.SageMakerRuntime();
var documentDBService = new documentdb_service_1.default();
// Function to generate vector embeddings using SageMaker
function generateVectorEmbedding(text) {
    return __awaiter(this, void 0, void 0, function () {
        var params, response, responseBody, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
                        Body: JSON.stringify({ inputText: text }),
                        EndpointName: config_1.config.aws.sagemakerEndpoint,
                        ContentType: 'application/json',
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, sagemakerRuntime.invokeEndpoint(params).promise()];
                case 2:
                    response = _a.sent();
                    responseBody = JSON.parse(response.Body.toString());
                    return [2 /*return*/, responseBody.embedding];
                case 3:
                    error_1 = _a.sent();
                    if (error_1 instanceof Error) {
                        logger_1.default.error('Error generating vector embeddings: ' + error_1.message);
                    }
                    else {
                        logger_1.default.error('Error generating vector embeddings: ' + String(error_1));
                    }
                    throw new Error('EmbeddingGenerationError');
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Function to index text into DocumentDB
function indexText(text, collectionName, fieldName, numDimensions) {
    return __awaiter(this, void 0, void 0, function () {
        var vectorEmbedding, document_1, error_2;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, generateVectorEmbedding(text)];
                case 1:
                    vectorEmbedding = _b.sent();
                    document_1 = (_a = {
                            text: text
                        },
                        _a[fieldName] = vectorEmbedding,
                        _a);
                    return [4 /*yield*/, documentDBService.insertVectorDocuments(collectionName, [document_1])];
                case 2:
                    _b.sent();
                    // Create vector index
                    return [4 /*yield*/, documentDBService.createVectorIndex(collectionName, 'vector_index', fieldName, numDimensions)];
                case 3:
                    // Create vector index
                    _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _b.sent();
                    if (error_2 instanceof Error) {
                        logger_1.default.error('Error indexing text: ' + error_2.message);
                    }
                    else {
                        logger_1.default.error('Error indexing text: ' + String(error_2));
                    }
                    throw new Error('IndexingError');
                case 5: return [2 /*return*/];
            }
        });
    });
}
// Function to search similar documents
function searchSimilarDocuments(collectionName, fieldName, queryText, k, similarity, probes) {
    return __awaiter(this, void 0, void 0, function () {
        var queryVector, results, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, generateVectorEmbedding(queryText)];
                case 1:
                    queryVector = _a.sent();
                    return [4 /*yield*/, documentDBService.vectorSearch(collectionName, fieldName, queryVector, k, similarity, probes)];
                case 2:
                    results = _a.sent();
                    return [2 /*return*/, results];
                case 3:
                    error_3 = _a.sent();
                    if (error_3 instanceof Error) {
                        logger_1.default.error('Error searching similar documents: ' + error_3.message);
                    }
                    else {
                        logger_1.default.error('Error searching similar documents: ' + String(error_3));
                    }
                    throw new Error('SearchError');
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Main function to demonstrate the functionality
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var text, collectionName, fieldName, numDimensions, queryText, results, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    text = "I love dog and cat.";
                    collectionName = "myCollection";
                    fieldName = "vectorField";
                    numDimensions = 128;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    // Index the text
                    return [4 /*yield*/, indexText(text, collectionName, fieldName, numDimensions)];
                case 2:
                    // Index the text
                    _a.sent();
                    logger_1.default.info('Text indexed successfully');
                    queryText = "I like pets";
                    return [4 /*yield*/, searchSimilarDocuments(collectionName, fieldName, queryText, 5, 'euclidean', 1)];
                case 3:
                    results = _a.sent();
                    console.log('Search Results:', results);
                    return [3 /*break*/, 5];
                case 4:
                    error_4 = _a.sent();
                    if (error_4 instanceof Error) {
                        logger_1.default.error('Error in main function: ' + error_4.message);
                    }
                    else {
                        logger_1.default.error('Error in main function: ' + String(error_4));
                    }
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
main().catch(function (error) {
    if (error instanceof Error) {
        logger_1.default.error('Unhandled error in main function: ' + error.message);
    }
    else {
        logger_1.default.error('Unhandled error in main function: ' + String(error));
    }
});
