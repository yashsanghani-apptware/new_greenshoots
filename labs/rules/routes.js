const express = require('express');
const factController = require('./controllers/factController');
const ruleController = require('./controllers/ruleController');
const rulesetController = require('./controllers/rulesetController');
const ruleExecutionController = require('./controllers/ruleExecutionController');
const notificationController = require('./controllers/notificationController');

const router = express.Router();

// Fact Routes
router.post('/facts', factController.createFact);
router.get('/facts', factController.getFacts);
router.get('/facts/:id', factController.getFactById);
router.put('/facts/:id', factController.updateFact);
router.delete('/facts/:id', factController.deleteFact);

// Rule Routes
router.post('/rules', ruleController.createRule);
router.get('/rules', ruleController.getRules);
router.get('/rules/:id', ruleController.getRuleById);
router.put('/rules/:id', ruleController.updateRule);
router.delete('/rules/:id', ruleController.deleteRule);

// Ruleset Routes
router.post('/rulesets', rulesetController.createRuleset);
router.get('/rulesets', rulesetController.getRulesets);
router.get('/rulesets/:id', rulesetController.getRulesetById);
router.put('/rulesets/:id', rulesetController.updateRuleset);
router.delete('/rulesets/:id', rulesetController.deleteRuleset);

// Rule Execution Routes
router.post('/rulesets/execute', ruleExecutionController.executeRuleset);

// Notification Routes
router.post('/notify', notificationController.sendNotification);

module.exports = router;

