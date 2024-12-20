const axios = require('axios');
const config = require('../config');

exports.initiateWorkflow = (workflowData) => {
  return axios.post(`${config.workflowServiceURL}/initiate`, workflowData);
};

