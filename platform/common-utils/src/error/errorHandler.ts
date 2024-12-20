import { Request, Response, NextFunction } from 'express';
import { logger } from '../logging/logger'; // Correct import path based on the structure

// Custom error classes for different scenarios
export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NotFoundError';
    }
}

export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
    }
}

export class AuthenticationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AuthenticationError';
    }
}

/**
 * Express middleware for handling errors in the application.
 * Logs the error message and stack trace, and sends an appropriate error response to the client.
 * @param err - The error object.
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 * @param next - The next middleware function.
 */
export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    let statusCode = 500;
    let errorMessage = 'Internal Server Error';

    // Handle different error types
    if (err instanceof NotFoundError) {
        statusCode = 404;
        errorMessage = err.message;
    } else if (err instanceof ValidationError) {
        statusCode = 400;
        errorMessage = err.message;
    } else if (err instanceof AuthenticationError) {
        statusCode = 401;
        errorMessage = err.message;
    }

    // Log the error with more details
    logger.error(err.message, { stack: err.stack, path: req.path, method: req.method });

    res.status(statusCode).json({ error: errorMessage });
}

/**
 * Generic error handler function for non-Express functions.
 * Logs the error message and stack trace, and returns a standardized error response.
 * @param err - The error object.
 * @returns A standardized error response object.
 */
export function genericErrorHandler(err: any) {
    let errorMessage = 'Internal Server Error';

    // Handle different error types
    if (err instanceof NotFoundError) {
        errorMessage = err.message;
    } else if (err instanceof ValidationError) {
        errorMessage = err.message;
    } else if (err instanceof AuthenticationError) {
        errorMessage = err.message;
    }

    // Log the error with more details
    logger.error(err.message, { stack: err.stack });

    return { error: errorMessage };
}
