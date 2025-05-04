const express = require('express');
const router = express.Router();
const Student = require('../models/Student');  // Ensure correct path
const OutpassRequest = require('../models/OutpassRequest');

// Route to search student by studentId
router.get('/search-student/:studentId', async (req, res) => {
  console.log('Searching for student with ID:', req.params.studentId);  // Log the studentId

  try {
    const student = await Student.findOne({ studentId: req.params.studentId });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
  } catch (error) {
    console.error('Error searching student:', error);
    res.status(500).json({ message: 'Server error while searching student' });
  }
});
// Student Login Route
router.post('/student-login', async (req, res) => {
  try {
    const { studentId, studentMobile } = req.body;

    // Validate inputs
    if (!studentId || !studentMobile) {
      return res.status(400).json({ success: false, message: 'Both studentId and studentMobile are required' });
    }

    // Search for student by studentId and studentMobile
    const student = await Student.findOne({ studentId, studentMobile });

    if (!student) {
      return res.status(401).json({ success: false, message: 'Invalid student ID or mobile number' });
    }

    // Successful login
    res.status(200).json({
      success: true,
      message: 'Login successful',
      student,
    });
  } catch (error) {
    console.error('Student login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// OUTPASS REQUEST
router.post('/request-outpass', async (req, res) => {
  try {
    const { studentId, time, reason } = req.body;

    if (!studentId || !time || !reason) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const newRequest = new OutpassRequest({ studentId, time, reason });
    await newRequest.save();

    res.status(200).json({ success: true, message: 'Outpass request submitted successfully' });
  } catch (error) {
    console.error('Outpass request error:', error);
    res.status(500).json({ success: false, message: 'Server error while submitting outpass' });
  }
});


module.exports = router;
