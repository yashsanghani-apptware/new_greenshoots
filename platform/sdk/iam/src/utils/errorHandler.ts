import { logger } from './logger';
import { i18next } from './i18n';

/**
 * Custom error class for handling application-specific errors.
 *
 * @extends {Error}
 */
export class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Handles an error by logging it and returning a formatted error response.
 *
 * @param {Error} err - The error to handle.
 * @returns {object} - The formatted error response.
 */
export const handleError = (err: Error) => {
  if (err instanceof AppError) {
    logger.error({
      message: err.message,
      statusCode: err.statusCode,
      stack: err.stack,
    });

    const responseMessage = i18next.t('error_occurred', { message: err.message });

    return {
      status: err.status,
      message: responseMessage,
    };
  } else {
    logger.error({
      message: err.message,
      stack: err.stack,
    });

    return {
      status: 'error',
      message: 'An unexpected error occurred.',
    };
  }
};

