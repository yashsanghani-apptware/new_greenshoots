import { createLogger, transports, format } from 'winston';
import expressWinston from 'express-winston';

/**
 * Creates a Winston logger instance with predefined settings.
 * The logger outputs logs in JSON format and writes to both console and files.
 */
export const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' })
    ],
});

/**
 * Middleware for logging HTTP requests using express-winston and the Winston logger.
 * Automatically logs all incoming HTTP requests with metadata.
 */
export const expressLogger = expressWinston.logger({
    winstonInstance: logger,
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: false,
});

