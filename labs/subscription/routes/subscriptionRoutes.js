const express = require('express');
const subscriptionController = require('../controllers/subscriptionController');
const router = express.Router();

router.put('/:offering_id/investor/:investor_id', subscriptionController.createOrUpdateSubscription);
router.get('/:offering_id', subscriptionController.listOfferingSubscriptions);
router.get('/investor/:user_id', subscriptionController.listInvestorSubscriptions);
router.delete('/:offering_id/investor/:user_id', subscriptionController.deleteSubscription);
router.put('/:offering_id/investor/:user_id/allocations', subscriptionController.createOrUpdateAllocation);
router.delete('/:offering_id/investor/:user_id/allocations', subscriptionController.deleteAllocation);

module.exports = router;

