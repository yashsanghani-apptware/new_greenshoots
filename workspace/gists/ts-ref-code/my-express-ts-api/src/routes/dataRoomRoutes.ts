import { Router } from 'express';
const router = Router();

const dataRoomController = require('../controllers/dataRoomController');

router.post('/', dataRoomController.createDataRoom);
router.get('/:dataroom_id', dataRoomController.getDataRoom);

export default router;
