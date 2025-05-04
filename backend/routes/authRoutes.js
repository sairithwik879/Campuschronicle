const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;

// Login route
router.post('/login', async (req, res) => {
  const { userId, password } = req.body;
  const user = await User.findOne({ userId });

  if (!user) return res.status(404).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, role: user.role, userId: user.userId });
});

// Create faculty (only for principal)
router.post('/create-faculty', async (req, res) => {
  const { userId, password, name } = req.body;

  const existing = await User.findOne({ userId });
  if (existing) return res.status(400).json({ message: 'User ID already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newFaculty = new User({
    userId,
    password: hashedPassword,
    role: 'faculty',
    name,
  });

  await newFaculty.save();
  res.json({ message: 'Faculty created successfully' });
});


// List all faculty (updated route name)
router.get('/faculty-list', async (req, res) => {  // Changed from '/faculty' to '/faculty-list'
  try {
    const faculty = await User.find({ role: 'faculty' });
    res.json(faculty);
  } catch (error) {
    console.error('Error fetching faculty list:', error);
    res.status(500).json({ message: 'Failed to fetch faculty list' });
  }
});

// Delete faculty (only for principal)
router.delete('/delete-faculty/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the faculty user by ID
    const faculty = await User.findByIdAndDelete(id);

    if (!faculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    }

    res.json({ message: 'Faculty deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting faculty', error });
  }
});
// POST /api/login
// POST /api/login
router.post('/login', async (req, res) => {
  const { userId, password } = req.body;
  const user = await User.findOne({ userId });

  if (!user) return res.status(404).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

  res.json({ token, role: user.role, userId: user.userId });
});

module.exports = router;
