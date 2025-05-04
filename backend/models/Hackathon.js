const mongoose = require('mongoose');

const hackthonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  applicationDeadline: { type: Date, required: true },
  postedDate: { type: Date, required: true },
  applicationLink: { type: String, required: true },
});

module.exports = mongoose.model('Hackthon', hackthonSchema);
