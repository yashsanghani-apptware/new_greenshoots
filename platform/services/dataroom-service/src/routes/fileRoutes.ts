import express, { Request, Response, Router } from 'express';
import {
    uploadFile,
    getFiles,
    getFile,
    updateFile,
    deleteFile,
    getFileVersion,
    downloadFile,
    mount,
    unmount,
} from '../controllers/fileController';

const router: Router = express.Router();

// File Module APIs:
router.post('/', uploadFile); // Upload File
router.get('/', getFiles); // Get Files
router.get('/:file_id', getFile); // Get File
router.get('/:file_id/download', downloadFile); // Download File
router.get('/:file_id/version/:version_id', getFileVersion); // Get File Version
router.put('/:file_id', updateFile); // Update File
router.delete('/:file_id', deleteFile); // Delete File
router.post('/:file_id/mount', mount); // Attach File   
router.post('/:file_id/unmount', unmount); // Detach File 

export default router;
