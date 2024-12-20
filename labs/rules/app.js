const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const errorHandler = require('./utils/errorHandler');
const logger = require('./utils/logger');

const app = express();

app.use(bodyParser.json());
app.use('/api', routes);
app.use(errorHandler);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/rdes', { useNewUrlParser: true, useUnifiedTopology: true });
    app.listen(3000, () => logger.info('Server running on port 3000'));
  } catch (error) {
    logger.error('Error starting server', error);
  }
};

startServer();

module.exports = app;

