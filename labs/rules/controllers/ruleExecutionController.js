const ruleEvaluator = require('../services/ruleEvaluator');
const Fact = require('../models/fact');
const Ruleset = require('../models/ruleset');
const logger = require('../utils/logger');

exports.executeRuleset = async (req, res) => {
  try {
    const { rulesetId, facts } = req.body;
    await ruleEvaluator.evaluateRuleset(rulesetId, facts);
    res.status(200).json({ message: 'Ruleset executed successfully' });
  } catch (error) {
    logger.error('Error executing ruleset', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

