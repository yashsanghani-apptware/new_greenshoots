const mongoose = require('mongoose');

const factSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true }
});

module.exports = mongoose.model('Fact', factSchema);

