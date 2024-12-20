const Rule = require('../models/rule');
const logger = require('../utils/logger');

exports.createRule = async (req, res) => {
  try {
    const rule = new Rule(req.body);
    await rule.save();
    res.status(201).json(rule);
  } catch (error) {
    logger.error('Error creating rule', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getRules = async (req, res) => {
  try {
    const rules = await Rule.find();
    res.status(200).json(rules);
  } catch (error) {
    logger.error('Error fetching rules', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getRuleById = async (req, res) => {
  try {
    const rule = await Rule.findById(req.params.id);
    if (!rule) return res.status(404).json({ error: 'Rule not found' });
    res.status(200).json(rule);
  } catch (error) {
    logger.error('Error fetching rule', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateRule = async (req, res) => {
  try {
    const rule = await Rule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!rule) return res.status(404).json({ error: 'Rule not found' });
    res.status(200).json(rule);
  } catch (error) {
    logger.error('Error updating rule', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteRule = async (req, res) => {
  try {
    const rule = await Rule.findByIdAndDelete(req.params.id);
    if (!rule) return res.status(404).json({ error: 'Rule not found' });
    res.status(204).send();
  } catch (error) {
    logger.error('Error deleting rule', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

