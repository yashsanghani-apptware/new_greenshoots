import { ERROR_MESSAGES, INVALID_MESSAGE } from './../constants/index';

import { Request, Response } from "express";
import { DocuSignIntegration } from "../services/docusignService";
import jwtConfig from "../../jwtConfig.json";
import * as path from "path";
import { clearUploadFolder } from "../utils/clearUploadFolder";
import fs from 'fs';
import File from '../models/file';
import axios from 'axios';
import {translate} from '../utils/i18n';

/**
 * Sends a document to DocuSign for signing.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the document is sent.
 */
export const sendDocumentToDocuSign = async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const { signer_email, signer_name, cc_email, cc_name } = req.body;
    // Check for required fields
    if (!signer_email || !signer_name || !cc_email || !cc_name) {
      return res.status(400).json({
        error:
        translate('MISSING_REQUIRED_FILEDS_DOCUSIGN'),
      });
    }

    // Validate email format (basic validation)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signer_email) || !emailRegex.test(cc_email)) {
      return res.status(400).json({
        error: translate('INVALID_EMAIL_FORMAT'),
      });
    }

    // Validate that the names are not empty strings
    if (signer_name.trim() === "" || cc_name.trim() === "") {
      return res.status(400).json({
        error: translate('INAVLID_SIGNER_CC_NAME'),
      });
    }

    // Check if files are present
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: translate('NO_FILES_UPLOADED') });
    }

    // 'files' should match the field name used in the form
    const uploadedFiles = req.files.files;

    // Handle single and multiple file uploads
    const fileArray = Array.isArray(uploadedFiles)
      ? uploadedFiles
      : [uploadedFiles];

    
    const uploadsDir = path.join(__dirname, '../uploads');
    // Check if the uploads directory exists, if not, create it
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    // Upload each file
    const filePaths: string[] = [];
    for (const file of fileArray) {
      const filePath = path.join(uploadsDir, file.name);
      await file.mv(filePath);
      filePaths.push(filePath);
    }

    // Initialize the DocuSign Integration
    const docusignIntegration = new DocuSignIntegration(jwtConfig, filePaths);

    // Pass only necessary information
    const envelopeId = await docusignIntegration.run(req);

    await clearUploadFolder();

    // Respond with a success message
    res.status(200).json({
      envelopeId: envelopeId,
      message: `Email sent to the signer email ${signer_email} for the document signature.`,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

/**
 * Sends a document from S3 to DocuSign for signature.
 *
 * This function retrieves a file from the database, downloads it from S3, and then sends it to DocuSign for signature.
 * It validates the request body for required fields and email formats.
 * If the file is not found or an error occurs, it returns an error response.
 *
 * @param {Request} req - The HTTP request object containing the signer's email, name, CC email, CC name, and file ID.
 * @param {Response} res - The HTTP response object.
 * @return {Promise<void>} A promise that resolves when the function completes.
 */
export const sendDocumentFromS3ToDocuSign = async (req: Request, res: Response) => {
  try {
    const { signer_email, signer_name, cc_email, cc_name, file_id } = req.body;

    // Validate request body
    if (!signer_email || !signer_name || !cc_email || !cc_name) {
      return res.status(400).json({ error: translate("MISSING_REQUIRED_FILEDS_DOCUSIGN") });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signer_email) || !emailRegex.test(cc_email)) {
      return res.status(400).json({ error: translate("INVALID_EMAIL_FORMAT") });
    }

    if (signer_name.trim() === "" || cc_name.trim() === "") {
      return res.status(400).json({ error: translate("INAVLID_SIGNER_CC_NAME") });
    }

    // Ensure file_id is provided
    if (!file_id) {
      return res.status(400).json({ error: translate("INVALID_FILE_ID") });
    }

    // Fetch file from the database
    const file = await File.findOne({ _id: file_id, isDeleted: false });

    if (!file) {
      return res.status(404).json({ error: translate("FILE_NOT_FOUND") });
    }

    const fileUrl = file.content_url;

    // Prepare local directory for storing the downloaded file
    const uploadsDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filePath = path.join(uploadsDir, file.name);

    // Download the file from S3 and save it locally
    const response = await axios.get(fileUrl, { responseType: 'stream' });
    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });

    // Initialize the DocuSign Integration
    const docusignIntegration = new DocuSignIntegration(jwtConfig, [filePath]);

    // Pass only necessary information to DocuSign
    const envelopeId = await docusignIntegration.run(req);

    // Clear the uploads directory
    await clearUploadFolder();

    // Respond with a success message
    res.status(200).json({
      envelopeId: envelopeId,
      message: `Email sent to the signer email ${signer_email} for the document signature.`,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

