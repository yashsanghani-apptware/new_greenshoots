import { createLogger, format, transports } from 'winston';

/**
 * Logger class provides a centralized logging mechanism using the Winston library.
 * It supports logging at various levels: info, warn, and error.
 */
export class Logger {
  // Winston logger instance configured with specific formatting and transports
  private static logger = createLogger({
    level: 'info', // Default logging level (can be adjusted as needed)
    
    // Combine multiple formatting options for log messages
    format: format.combine(
      // Adds colors to log levels for better readability in the console
      format.colorize(),
      
      // Adds a timestamp to each log message, using a specific format
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss', // Format for the timestamp
      }),

      // Custom formatting for log messages, defining the final output structure
      format.printf(({ timestamp, level, message }) => 
        `${timestamp} [${level}]: ${message}`
      )
    ),

    // Define where the logs should be output (console, files, etc.)
    transports: [
      // Transport to output logs to the console
      new transports.Console(),
      
      // Uncomment the following lines to enable file-based logging:
      
      // Transport to write error logs to a specific file
      // new transports.File({ filename: 'error.log', level: 'error' }),

      // Transport to write all logs (info, warn, error) to a combined log file
      // new transports.File({ filename: 'combined.log' }),
    ],
  });

  /**
   * Logs an informational message.
   * 
   * @param message - The message to log.
   */
  static log(message: string): void {
    Logger.logger.info(message); // Logs the message at the 'info' level
  }

  /**
   * Logs an error message.
   * 
   * @param message - The error message to log.
   */
  static error(message: string): void {
    Logger.logger.error(message); // Logs the message at the 'error' level
  }

  /**
   * Logs a warning message.
   * 
   * @param message - The warning message to log.
   */
  static warn(message: string): void {
    Logger.logger.warn(message); // Logs the message at the 'warn' level
  }
}

