const axios = require('axios');
const config = require('../config');

exports.sendNotification = (notificationData) => {
  return axios.post(`${config.notificationServiceURL}/notify`, notificationData);
};

