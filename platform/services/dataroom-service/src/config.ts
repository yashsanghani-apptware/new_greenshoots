interface S3Config {
    accessKeyId?: string;
    secretAccessKey?: string;
    region?: string;
    bucketName?: string;
  }
  
  interface Config {
    mongoURI: string;
    mongoTestURI: string;
    s3: S3Config;
    workflowServiceURL?: string;
    notificationServiceURL?: string;
  }
  
  const config: Config = {
    mongoURI: process.env.MONGO_URI || 'mongodb+srv://saddamshah:hOzlWf1NF6Xnx7aA@agsiri.nk7ua3s.mongodb.net/dataRoomService',
    mongoTestURI: process.env.TEST_MONGO_URI || 'mongodb://localhost:27017/test_dataRoomService',
    s3: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
      bucketName: process.env.S3_BUCKET_NAME,
    },
    workflowServiceURL: process.env.WORKFLOW_SERVICE_URL,
    notificationServiceURL: process.env.NOTIFICATION_SERVICE_URL,
  };
  
  export default config;
  