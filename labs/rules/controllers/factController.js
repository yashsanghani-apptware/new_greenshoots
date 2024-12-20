const Fact = require('../models/fact');
const logger = require('../utils/logger');

exports.createFact = async (req, res) => {
  try {
    const fact = new Fact(req.body);
    await fact.save();
    res.status(201).json(fact);
  } catch (error) {
    logger.error('Error creating fact', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getFacts = async (req, res) => {
  try {
    const facts = await Fact.find();
    res.status(200).json(facts);
  } catch (error) {
    logger.error('Error fetching facts', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getFactById = async (req, res) => {
  try {
    const fact = await Fact.findById(req.params.id);
    if (!fact) return res.status(404).json({ error: 'Fact not found' });
    res.status(200).json(fact);
  } catch (error) {
    logger.error('Error fetching fact', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateFact = async (req, res) => {
  try {
    const fact = await Fact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!fact) return res.status(404).json({ error: 'Fact not found' });
    res.status(200).json(fact);
  } catch (error) {
    logger.error('Error updating fact', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteFact = async (req, res) => {
  try {
    const fact = await Fact.findByIdAndDelete(req.params.id);
    if (!fact) return res.status(404).json({ error: 'Fact not found' });
    res.status(204).send();
  } catch (error) {
    logger.error('Error deleting fact', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

