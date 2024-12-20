const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const i18n = require('i18n');
const config = require('./config');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

i18n.configure({
  locales: ['en', 'es'],
  directory: __dirname + '/locales',
  defaultLocale: 'en',
  queryParameter: 'lang',
  objectNotation: true
});

app.use(i18n.init);
app.use(bodyParser.json());

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/subscriptions', subscriptionRoutes);
app.use(errorHandler);

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

