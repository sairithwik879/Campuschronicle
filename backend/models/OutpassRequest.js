const mongoose = require('mongoose');

const outpassRequestSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  time: { type: String, required: true },
  reason: { type: String, required: true },
  requestedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('OutpassRequest', outpassRequestSchema);
