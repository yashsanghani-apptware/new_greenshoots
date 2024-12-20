import { createLogger, format, transports } from 'winston'; // Import necessary components from the winston logging library

/**
 * Creates a logger instance using winston.
 *
 * The logger is configured to log messages at the 'info' level and higher.
 * It formats the log messages to include a timestamp and output as JSON.
 * The logs are transported to the console.
 *
 * @constant {Logger} logger - The configured logger instance.
 *
 * Usage:
 * - Import the logger instance into any module that requires logging.
 * - Use the logger methods (e.g., logger.info, logger.error) to log messages.
 *
 * Example:
 * import { logger } from './utils/logger';
 *
 * logger.info('This is an informational message.');
 * logger.error('This is an error message.');
 */
const logger = createLogger({
  level: 'info', // Set the logging level to 'info'
  format: format.combine(
    format.timestamp(), // Add a timestamp to each log message
    format.json() // Format the log message as JSON
  ),
  transports: [
    new transports.Console() // Transport log messages to the console
  ],
});

/**
 * Logs an informational message.
 *
 * @param {string} message - The message to log.
 */
export const logInfo = (message: string) => {
  logger.info(message);
};

/**
 * Logs an error message.
 *
 * @param {string} message - The message to log.
 */
export const logError = (message: string) => {
  logger.error(message);
};

export { logger };

