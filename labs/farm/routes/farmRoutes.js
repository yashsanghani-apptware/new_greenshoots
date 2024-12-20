const express = require('express');
const farmController = require('../controllers/farmController');
const router = express.Router();

router.post('/', farmController.createFarm);
router.put('/:farm_id', farmController.updateFarm);
router.get('/', farmController.getFarms);
router.get('/:farm_id', farmController.getFarm);
router.delete('/:farm_id', farmController.deleteFarm);
router.put('/:farm_id/dd/soil', farmController.updateSoilInformation);
router.put('/:farm_id/dd/financial', farmController.updateFinancialInformation);
router.put('/:farm_id/dd/crop', farmController.updateCropInformation);
router.put('/:farm_id/dd/other', farmController.updateOtherInformation);

module.exports = router;

