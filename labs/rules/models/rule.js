const mongoose = require('mongoose');

const ruleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  conditions: [
    {
      fact: String,
      property: String,
      operator: String,
      value: mongoose.Schema.Types.Mixed
    }
  ],
  actions: [
    {
      actionType: String,
      fact: String,
      property: String,
      value: mongoose.Schema.Types.Mixed,
      endpointUrl: String,
      payload: mongoose.Schema.Types.Mixed
    }
  ]
});

module.exports = mongoose.model('Rule', ruleSchema);

