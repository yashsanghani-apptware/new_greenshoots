const AWS = require('aws-sdk');
const config = require('../config');

AWS.config.update({
  accessKeyId: config.s3.accessKeyId,
  secretAccessKey: config.s3.secretAccessKey,
  region: config.s3.region
});

const s3 = new AWS.S3();

exports.uploadFile = (file) => {
  const params = {
    Bucket: config.s3.bucketName,
    Key: `${Date.now()}_${file.originalname}`,
    Body: file.buffer
  };
  return s3.upload(params).promise();
};

