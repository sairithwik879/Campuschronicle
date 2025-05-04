const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  role: { type: String, enum: ['student', 'faculty', 'principal'], required: true },
  userId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String,
  mobile: String,
  parentMobile: String,
  remark: String,
});

module.exports = mongoose.model('User', userSchema);
