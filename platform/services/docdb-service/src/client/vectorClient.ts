import AWS from 'aws-sdk';
import axios from 'axios';
import DocumentDBService from '../services/documentdb.service';
import { config } from '../config/config';
import logger from '../config/logger';

// Initialize AWS SDK
AWS.config.update({
    region: config.aws.region,
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
});

const sagemakerRuntime = new AWS.SageMakerRuntime();
const documentDBService = new DocumentDBService();

// Function to generate vector embeddings using SageMaker
async function generateVectorEmbedding(text: string): Promise<number[]> {
    const params = {
        Body: JSON.stringify({ inputText: text }),
        EndpointName: config.aws.sagemakerEndpoint,
        ContentType: 'application/json',
    };

    try {
        const response = await sagemakerRuntime.invokeEndpoint(params).promise();
        const responseBody = JSON.parse(response.Body.toString());
        return responseBody.embedding;
    } catch (error) {
        if (error instanceof Error) {
            logger.error('Error generating vector embeddings: ' + error.message);
        } else {
            logger.error('Error generating vector embeddings: ' + String(error));
        }
        throw new Error('EmbeddingGenerationError');
    }
}

// Function to index text into DocumentDB
async function indexText(text: string, collectionName: string, fieldName: string, numDimensions: number) {
    try {
        // Generate vector embeddings
        const vectorEmbedding = await generateVectorEmbedding(text);

        // Insert the document with vector embeddings
        const document = {
            text,
            [fieldName]: vectorEmbedding,
        };

        await documentDBService.insertVectorDocuments(collectionName, [document]);

        // Create vector index
        await documentDBService.createVectorIndex(collectionName, 'vector_index', fieldName, numDimensions);
    } catch (error) {
        if (error instanceof Error) {
            logger.error('Error indexing text: ' + error.message);
        } else {
            logger.error('Error indexing text: ' + String(error));
        }
        throw new Error('IndexingError');
    }
}

// Function to search similar documents
async function searchSimilarDocuments(collectionName: string, fieldName: string, queryText: string, k: number, similarity: string, probes: number) {
    try {
        // Generate vector embeddings for the query
        const queryVector = await generateVectorEmbedding(queryText);

        // Perform vector search
        const results = await documentDBService.vectorSearch(collectionName, fieldName, queryVector, k, similarity, probes);

        return results;
    } catch (error) {
        if (error instanceof Error) {
            logger.error('Error searching similar documents: ' + error.message);
        } else {
            logger.error('Error searching similar documents: ' + String(error));
        }
        throw new Error('SearchError');
    }
}

// Main function to demonstrate the functionality
async function main() {
    const text = "I love dog and cat.";
    const collectionName = "myCollection";
    const fieldName = "vectorField";
    const numDimensions = 128; // Change based on your model's output dimensions

    try {
        // Index the text
        await indexText(text, collectionName, fieldName, numDimensions);
        logger.info('Text indexed successfully');

        // Search for similar documents
        const queryText = "I like pets";
        const results = await searchSimilarDocuments(collectionName, fieldName, queryText, 5, 'euclidean', 1);

        console.log('Search Results:', results);
    } catch (error) {
        if (error instanceof Error) {
            logger.error('Error in main function: ' + error.message);
        } else {
            logger.error('Error in main function: ' + String(error));
        }
    }
}

main().catch(error => {
    if (error instanceof Error) {
        logger.error('Unhandled error in main function: ' + error.message);
    } else {
        logger.error('Unhandled error in main function: ' + String(error));
    }
});

