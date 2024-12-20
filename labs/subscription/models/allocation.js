const mongoose = require('mongoose');

const AllocationSchema = new mongoose.Schema({
  subscription_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Subscription' },
  offering_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Offering' },
  investor_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Investor' },
  allocated_shares: { type: Number, required: true },
  status: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Allocation', AllocationSchema);

