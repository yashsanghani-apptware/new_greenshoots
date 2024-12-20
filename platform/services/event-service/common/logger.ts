import winston from 'winston';

// Create a Winston logger instance with custom settings
const logger = winston.createLogger({
  level: 'info', // Set the minimum log level to 'info'
  format: winston.format.combine(
    winston.format.timestamp(), // Add a timestamp to each log message
    winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console() // Log to the console
  ]
});

export default logger; // Export the logger instance

