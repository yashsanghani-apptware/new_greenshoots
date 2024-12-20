const Farm = require('../models/farm');
const logger = require('../services/logger');

// Helper function for logging errors
const logError = (message, error) => {
  logger.error(`${message}: ${error.message}`);
};

// Create a New Farm
exports.createFarm = async (req, res) => {
  const farm = new Farm(req.body);
  try {
    const savedFarm = await farm.save();
    logger.info('Farm created successfully');
    res.status(201).json(savedFarm);
  } catch (error) {
    logError('Failed to create farm', error);
    res.status(400).json({ message: req.__('error.createFarm'), details: error.message });
  }
};

// Modify an Existing Farm
exports.updateFarm = async (req, res) => {
  try {
    const farm = await Farm.findByIdAndUpdate(req.params.farm_id, req.body, { new: true, runValidators: true });
    if (!farm) {
      logger.warn('Farm not found');
      return res.status(404).json({ message: req.__('error.farmNotFound') });
    }
    logger.info('Farm updated successfully');
    res.status(200).json(farm);
  } catch (error) {
    logError('Failed to update farm', error);
    res.status(400).json({ message: req.__('error.updateFarm'), details: error.message });
  }
};

// Get All Farms
exports.getFarms = async (req, res) => {
  try {
    const farms = await Farm.find();
    res.status(200).json(farms);
  } catch (error) {
    logError('Failed to get farms', error);
    res.status(500).json({ message: req.__('error.getFarms'), details: error.message });
  }
};

// Get a Particular Farm
exports.getFarm = async (req, res) => {
  try {
    const farm = await Farm.findById(req.params.farm_id);
    if (!farm) {
      logger.warn('Farm not found');
      return res.status(404).json({ message: req.__('error.farmNotFound') });
    }
    res.status(200).json(farm);
  } catch (error) {
    logError('Failed to get farm', error);
    res.status(500).json({ message: req.__('error.getFarm'), details: error.message });
  }
};

// Delete a Farm
exports.deleteFarm = async (req, res) => {
  try {
    const farm = await Farm.findByIdAndDelete(req.params.farm_id);
    if (!farm) {
      logger.warn('Farm not found');
      return res.status(404).json({ message: req.__('error.farmNotFound') });
    }
    logger.info('Farm deleted successfully');
    res.status(200).json(farm);
  } catch (error) {
    logError('Failed to delete farm', error);
    res.status(500).json({ message: req.__('error.deleteFarm'), details: error.message });
  }
};

// Update Due Diligence Soil Information
exports.updateSoilInformation = async (req, res) => {
  try {
    const farm = await Farm.findById(req.params.farm_id);
    if (!farm) {
      logger.warn('Farm not found');
      return res.status(404).json({ message: req.__('error.farmNotFound') });
    }
    farm.due_diligence.soil_information = { ...farm.due_diligence.soil_information, ...req.body };
    await farm.save();
    logger.info('Soil information updated successfully');
    res.status(200).json(farm);
  } catch (error) {
    logError('Failed to update soil information', error);
    res.status(400).json({ message: req.__('error.updateSoilInformation'), details: error.message });
  }
};

// Update Due Diligence Financial Information
exports.updateFinancialInformation = async (req, res) => {
  try {
    const farm = await Farm.findById(req.params.farm_id);
    if (!farm) {
      logger.warn('Farm not found');
      return res.status(404).json({ message: req.__('error.farmNotFound') });
    }
    farm.due_diligence.financial_information = { ...farm.due_diligence.financial_information, ...req.body };
    await farm.save();
    logger.info('Financial information updated successfully');
    res.status(200).json(farm);
  } catch (error) {
    logError('Failed to update financial information', error);
    res.status(400).json({ message: req.__('error.updateFinancialInformation'), details: error.message });
  }
};

// Update Due Diligence Crop Information
exports.updateCropInformation = async (req, res) => {
  try {
    const farm = await Farm.findById(req.params.farm_id);
    if (!farm) {
      logger.warn('Farm not found');
      return res.status(404).json({ message: req.__('error.farmNotFound') });
    }
    farm.due_diligence.crop_information = { ...farm.due_diligence.crop_information, ...req.body };
    await farm.save();
    logger.info('Crop information updated successfully');
    res.status(200).json(farm);
  } catch (error) {
    logError('Failed to update crop information', error);
    res.status(400).json({ message: req.__('error.updateCropInformation'), details: error.message });
  }
};

// Update Due Diligence Other Information
exports.updateOtherInformation = async (req, res) => {
  try {
    const farm = await Farm.findById(req.params.farm_id);
    if (!farm) {
      logger.warn('Farm not found');
      return res.status(404).json({ message: req.__('error.farmNotFound') });
    }
    farm.due_diligence.other = { ...farm.due_diligence.other, ...req.body };
    await farm.save();
    logger.info('Other information updated successfully');
    res.status(200).json(farm);
  } catch (error) {
    logError('Failed to update other information', error);
    res.status(400).json({ message: req.__('error.updateOtherInformation'), details: error.message });
  }
};

