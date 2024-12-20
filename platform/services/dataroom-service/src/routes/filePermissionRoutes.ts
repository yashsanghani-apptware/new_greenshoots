import express, { Request, Response, Router } from 'express';
import {
    createFilePermissions,
    getFilePermissions,
    getFilePermission,
    updatePermission,
    deletePermission,
    checkUserPermissions,
} from '../controllers/fileController';

const router: Router = express.Router();

// File Permission APIs
router.post('/:cabinet_id/files/:file_id/permissions', createFilePermissions);
router.get('/:cabinet_id/files/:file_id/permissions', getFilePermissions);
router.get('/:cabinet_id/files/:file_id/permissions/:permission_id', getFilePermission);

router.put('/:cabinet_id/files/:file_id/permissions/:permission_id', updatePermission);
router.delete('/:cabinet_id/files/:file_id/permissions/:permission_id', deletePermission);
router.post('/:cabinet_id/files/:file_id/user/:user_id/checkpermission', checkUserPermissions);

export default router;
