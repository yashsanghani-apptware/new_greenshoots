module.exports = {
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/farmService',
  s3: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    bucketName: process.env.S3_BUCKET_NAME
  },
  workflowServiceURL: process.env.WORKFLOW_SERVICE_URL,
  notificationServiceURL: process.env.NOTIFICATION_SERVICE_URL,
  port: process.env.PORT || 3000
};

