const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  studentId: { type: String, required: true, unique: true },
  studentMobile: String,
  parentMobile: String,
  remark: String,
});

module.exports = mongoose.model('Student', studentSchema);
