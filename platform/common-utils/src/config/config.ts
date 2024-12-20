import * as dotenv from 'dotenv';

// Load environment variables from a .env file into process.env
dotenv.config();

/**
 * Configuration settings for the application.
 * Reads values from environment variables with sensible defaults.
 */
export const Config = {
    cacheType: process.env.CACHE_TYPE || 'redis',
    host: process.env.CACHE_HOST || 'localhost',
    port: Number(process.env.CACHE_PORT) || 6379,
    db: Number(process.env.CACHE_DB) || 0
};

