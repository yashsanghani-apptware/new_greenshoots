import AWS from "aws-sdk";
import config from "../config";

AWS.config.update({
  accessKeyId: config.s3.accessKeyId,
  secretAccessKey: config.s3.secretAccessKey,
  region: config.s3.region,
});

const s3 = new AWS.S3();

export interface FileType {
  name: string;
  data: Buffer | Uint8Array | Blob | string;
}

interface UploadResult extends AWS.S3.ManagedUpload.SendData {
  VersionId?: string;
}
/**
 * Uploads a file to an Amazon S3 bucket.
 *
 * @param {FileType} file - The file to be uploaded.
 * @param {string} clientId - The client ID associated with the bucket.
 * @param {string} dataroomId - The dataroom ID associated with the file.
 * @param {string} cabinetId - The cabinet ID associated with the file.
 * @return {Promise<UploadResult>} A promise that resolves with the result of the file upload.
 */
export const uploadFile = async (
  file: FileType,
  clientId: string,
  keyName:  string,
  // dataroomId: string,
  // cabinetId: string
): Promise<UploadResult> => {
  const bucketName = `${clientId}-${config.s3.bucketName}`;
  const params: AWS.S3.PutObjectRequest = {
    Bucket: bucketName,
    // Key: `${dataroomId}/${cabinetId}/${Date.now()}_${file.name}`,
    Key: `${keyName}/${Date.now()}_${file.name}`,
    Body: file.data,
    // ACL: process.env.AWS_ACL!, // TODO: Once we integrate the IAM serivce to Data room service we need to add ACL to the Bucket
  };
  try {
    // Check if the bucket exists
    await s3.headBucket({ Bucket: bucketName }).promise();
  } catch (err) {
    // If the bucket does not exist, create it
    await s3.createBucket({ Bucket: bucketName }).promise();

    // Enable versioning on the newly created bucket
    const versioningParams: AWS.S3.PutBucketVersioningRequest = {
      Bucket: bucketName,
      VersioningConfiguration: {
        Status: "Enabled",
      },
    };
    await s3.putBucketVersioning(versioningParams).promise();
  }

  // Upload the file to the bucket
  return s3.upload(params).promise();
};

export const deleteFile = async (
  key: string
): Promise<AWS.S3.DeleteObjectOutput | void> => {
  const params: AWS.S3.DeleteObjectRequest = {
    Bucket: config.s3.bucketName as string,
    Key: key,
  };
  try {
    const data = await s3.deleteObject(params).promise();
    console.log(`File deleted successfully: ${key}`);
    return data;
  } catch (error) {
    console.error(`Failed to delete file: ${key}`, error);
  }
};

const generatePresignedUrl = async (contentUrl: string, expiryTime = 60 * 60) => {
  const {bucketName, key} = extractBucketAndKey(contentUrl);
  let params ={};
  if (contentUrl.includes(".pdf")) {
    params = {
      Bucket: bucketName,
      Key: decodeURIComponent(key),
      Expires: expiryTime, // The URL will expire after this time (in seconds),
      ResponseContentDisposition: 'inline', // Suggests inline display
      ResponseContentType: 'application/pdf'
    };
  } else {
    params = {
      Bucket: bucketName,
      Key: decodeURIComponent(key),
      Expires: expiryTime, // The URL will expire after this time (in seconds),
    };
  }

  // Generate presigned URL for the object
  const url = await s3.getSignedUrl('getObject', params);
  return url;
};

function extractBucketAndKey(contentUrl: string) {
  // Remove the 'https://' and split the URL into parts
  const urlParts = contentUrl.replace('https://', '').split('.s3.amazonaws.com/');
  
  // The first part is the bucket name
  const bucketName = urlParts[0];
  
  // The second part is the key
  const key = urlParts[1];
  return { bucketName, key };
}
export default {
  uploadFile,
  deleteFile,
  generatePresignedUrl
};
