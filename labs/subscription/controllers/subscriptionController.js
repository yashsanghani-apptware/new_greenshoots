const Subscription = require('../models/subscription');
const Allocation = require('../models/allocation');
const logger = require('../services/logger');

// Helper function for logging errors
const logError = (message, error) => {
  logger.error(`${message}: ${error.message}`);
};

// Create/Update Subscriptions
exports.createOrUpdateSubscription = async (req, res) => {
  const { offering_id, investor_id } = req.params;
  const { number_of_shares, status } = req.body;
  
  try {
    let subscription = await Subscription.findOne({ offering_id, investor_id });
    if (subscription) {
      subscription.number_of_shares = number_of_shares || subscription.number_of_shares;
      subscription.status = status || subscription.status;
      subscription.updated_at = new Date();
    } else {
      subscription = new Subscription({
        offering_id,
        investor_id,
        number_of_shares,
        status,
        created_at: new Date(),
        updated_at: new Date()
      });
    }
    await subscription.save();
    logger.info('Subscription created or updated successfully');
    res.status(200).json(subscription);
  } catch (error) {
    logError('Failed to create or update subscription', error);
    res.status(500).json({ message: req.__('error.createOrUpdateSubscription'), details: error.message });
  }
};

// List Offering Subscriptions
exports.listOfferingSubscriptions = async (req, res) => {
  const { offering_id } = req.params;

  try {
    const subscriptions = await Subscription.find({ offering_id });
    res.status(200).json(subscriptions);
  } catch (error) {
    logError('Failed to list offering subscriptions', error);
    res.status(500).json({ message: req.__('error.listOfferingSubscriptions'), details: error.message });
  }
};

// List Investor Subscriptions
exports.listInvestorSubscriptions = async (req, res) => {
  const { user_id } = req.params;

  try {
    const subscriptions = await Subscription.find({ investor_id: user_id, status: { $ne: 'completed' } });
    res.status(200).json(subscriptions);
  } catch (error) {
    logError('Failed to list investor subscriptions', error);
    res.status(500).json({ message: req.__('error.listInvestorSubscriptions'), details: error.message });
  }
};

// Delete Subscription
exports.deleteSubscription = async (req, res) => {
  const { offering_id, user_id } = req.params;

  try {
    await Subscription.findOneAndDelete({ offering_id, investor_id: user_id });
    logger.info('Subscription deleted successfully');
    res.status(200).json({ message: req.__('success.deleteSubscription') });
  } catch (error) {
    logError('Failed to delete subscription', error);
    res.status(500).json({ message: req.__('error.deleteSubscription'), details: error.message });
  }
};

// Create/Update Allocations
exports.createOrUpdateAllocation = async (req, res) => {
  const { offering_id, user_id } = req.params;
  const { allocated_shares, status } = req.body;

  try {
    let allocation = await Allocation.findOne({ offering_id, investor_id: user_id });
    if (allocation) {
      allocation.allocated_shares = allocated_shares || allocation.allocated_shares;
      allocation.status = status || allocation.status;
      allocation.updated_at = new Date();
    } else {
      allocation = new Allocation({
        subscription_id: offering_id,
        offering_id,
        investor_id: user_id,
        allocated_shares,
        status,
        created_at: new Date(),
        updated_at: new Date()
      });
    }
    await allocation.save();
    logger.info('Allocation created or updated successfully');
    res.status(200).json(allocation);
  } catch (error) {
    logError('Failed to create or update allocation', error);
    res.status(500).json({ message: req.__('error.createOrUpdateAllocation'), details: error.message });
  }
};

// Delete Allocation
exports.deleteAllocation = async (req, res) => {
  const { offering_id, user_id } = req.params;

  try {
    await Allocation.findOneAndDelete({ offering_id, investor_id: user_id });
    logger.info('Allocation deleted successfully');
    res.status(200).json({ message: req.__('success.deleteAllocation') });
  } catch (error) {
    logError('Failed to delete allocation', error);
    res.status(500).json({ message: req.__('error.deleteAllocation'), details: error.message });
  }
};

