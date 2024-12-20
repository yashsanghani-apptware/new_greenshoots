const Ruleset = require('../models/ruleset');
const logger = require('../utils/logger');

exports.createRuleset = async (req, res) => {
  try {
    const ruleset = new Ruleset(req.body);
    await ruleset.save();
    res.status(201).json(ruleset);
  } catch (error) {
    logger.error('Error creating ruleset', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getRulesets = async (req, res) => {
  try {
    const rulesets = await Ruleset.find().populate('rules');
    res.status(200).json(rulesets);
  } catch (error) {
    logger.error('Error fetching rulesets', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getRulesetById = async (req, res) => {
  try {
    const ruleset = await Ruleset.findById(req.params.id).populate('rules');
    if (!ruleset) return res.status(404).json({ error: 'Ruleset not found' });
    res.status(200).json(ruleset);
  } catch (error) {
    logger.error('Error fetching ruleset', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateRuleset = async (req, res) => {
  try {
    const ruleset = await Ruleset.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!ruleset) return res.status(404).json({ error: 'Ruleset not found' });
    res.status(200).json(ruleset);
  } catch (error) {
    logger.error('Error updating ruleset', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteRuleset = async (req, res) => {
  try {
    const ruleset = await Ruleset.findByIdAndDelete(req.params.id);
    if (!ruleset) return res.status(404).json({ error: 'Ruleset not found' });
    res.status(204).send();
  } catch (error) {
    logger.error('Error deleting ruleset', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

