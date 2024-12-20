import dotenv from 'dotenv';
dotenv.config();
// Export the configuration object
export const config = {
    mongodb: {
        // The MongoDB URI is read from the environment variable MONGODB_URI.
        // If the environment variable is not set, it defaults to 'mongodb://host.docker.internal:27017/testdb'.
        // 'host.docker.internal' is used to reference the host machine from within the Docker container.
        // uri: process.env.MONGODB_URI || 'mongodb://host.docker.internal:27017/testdb',
        
        //uri : 'mongodb://agsiridb:W3lc0m3$2024@host.docker.internal:27017/?tls=true&directConnection=true&tlsCAFile=global-bundle.pem&retryWrites=false',
        uri : 'mongodb://agsiridb:W3lc0m3$2024@localhost:27017/?tls=true&directConnection=true&tlsCAFile=global-bundle.pem&retryWrites=false',


        // The name of the MongoDB database is read from the environment variable DB_NAME.
        // If the environment variable is not set, it defaults to 'testdb'.
        dbName: process.env.DB_NAME || 'agsiri-db',

        // MongoDB connection options
        options: {
            // The maximum number of connections in the MongoDB connection pool.
            maxPoolSize: 20,

            tlsAllowInvalidHostnames: true,

            // The server selection timeout in milliseconds.
            // This is the amount of time the MongoDB driver will wait to find an available server
            // before throwing an error.
            serverSelectionTimeoutMS: 5000,
        },
    },
    redis: {
        // The Redis URI is read from the environment variable REDIS_URI.
        // If the environment variable is not set, it defaults to 'redis://:redis@localhost:6379'.
        // The password for Redis is 'redis', as specified by the URI 'redis://:redis@localhost:6379'.
        uri: process.env.REDIS_URI || 'redis://:redis@localhost:6379',
    },
    // AWS Credentials go here.
    aws: {
        region: process.env.AWS_REGION || '',
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
        sagemakerEndpoint: process.env.SAGEMAKER_ENDPOINT || '',
    },
};


