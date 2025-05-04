const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const OutpassRequest = require('../models/OutpassRequest.js')

// In your API route file

//const hackathon = require('../models/hackthon');
router.get('/students',async(req,res)=>{
  try{
    const outpassRequest= await OutpassRequest.find();
    return res.status(200).json(outpassRequest)
  }catch(err){
    return res.status(500).json({
      message: `Internal server error`,
      error: err
    })
  }
})
// Add Student
router.post('/students', async (req, res) => {
    const { studentId, name, studentMobile, parentMobile, remark } = req.body;
  
    // Check if a student with the same studentId already exists
    const existingStudent = await Student.findOne({ studentId });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student ID already exists' });
    }
  
    // Create a new student document
    const newStudent = new Student({
      studentId,
      name,
      studentMobile,
      parentMobile,
      remark,
    });
  
    try {
      // Save the new student to the database
      await newStudent.save();
      res.status(201).json({ message: 'Student added successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to add student' });
    }
});
// Student Login Route with default student login credentials
router.post('/student-login', async (req, res) => {
  try {
    const { studentId, studentMobile } = req.body;

    console.log('Received:', studentId, studentMobile);

    // Check for default student login credentials
    if (studentId === '123' && studentMobile === '123') {
      return res.status(200).json({
        success: true,
        message: 'Login successful',
        student: { studentId: '123', studentMobile: '123', name: 'Default Student' }
      });
    }

    // If not default, search in the database
    const student = await Student.findOne({ studentId, studentMobile });
    console.log('DB Match:', student);

    if (!student) {
      return res.status(401).json({ success: false, message: 'Invalid student ID or mobile number' });
    }

    res.status(200).json({ success: true, message: 'Login successful', student });
  } catch (error) {
    console.error('Student login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
