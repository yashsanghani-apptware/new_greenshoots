const logger = require('../services/logger');

module.exports = (err, req, res, next) => {
  logger.error(err.message);
  res.status(err.status || 500).json({ message: req.__('error.generic'), details: err.message });
};

