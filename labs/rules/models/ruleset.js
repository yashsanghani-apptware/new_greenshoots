const mongoose = require('mongoose');

const rulesetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  rules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rule' }]
});

module.exports = mongoose.model('Ruleset', rulesetSchema);

