module.exports = {
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/subscriptionService',
  port: process.env.PORT || 3000
};

