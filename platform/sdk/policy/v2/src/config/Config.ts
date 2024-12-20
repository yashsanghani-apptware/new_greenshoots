// Importing the 'dotenv' package, which loads environment variables from a .env file into process.env.
// This allows configuration values to be set outside of the codebase, making the application more flexible and secure.
import dotenv from 'dotenv';

// Load environment variables from the .env file into process.env.
// dotenv.config() must be called at the start of the application to ensure that environment variables are available throughout.
dotenv.config();

/**
 * Config class holds configuration values for the application.
 * It uses environment variables for dynamic configuration and provides fallback default values.
 */
export class Config {
  /**
   * The base URL for the API.
   * - This value is fetched from the environment variable `BASE_API_URL`.
   * - If the environment variable is not set, it defaults to "https://api.agsiri.dev/v1".
   */
  static readonly BASE_API_URL = process.env.BASE_API_URL || "https://api.agsiri.dev/v1";

  /**
   * The default timeout for API requests, specified in milliseconds.
   * - This value is fetched from the environment variable `DEFAULT_TIMEOUT`.
   * - If the environment variable is not set, it defaults to 5000 milliseconds (5 seconds).
   * - The value is converted to a number using `Number()` to ensure proper type handling.
   */
  static readonly DEFAULT_TIMEOUT = Number(process.env.DEFAULT_TIMEOUT) || 5000;
}

