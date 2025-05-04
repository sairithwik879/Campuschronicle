const express = require('express');
const router = express.Router();
const Hackathon = require('../models/Hackathon');

// POST route to post a hackathon
router.post('/post-hackathon', async (req, res) => {
  try {
    const { name, applicationDeadline, applicationLink } = req.body;

    const newHackathon = new Hackathon({
      name,
      applicationDeadline,
      postedDate: new Date(),
      applicationLink,
    });

    await newHackathon.save();
    res.status(201).json({ message: 'Hackathon posted successfully!' });
  } catch (error) {
    console.error('Error posting hackathon:', error);
    res.status(500).json({ message: 'Server error while posting hackathon.' });
  }
});
// Get all hackathons
router.get('/hacklist', async (req, res) => {
  try {
    const hacklist = await Hackathon.find();
    res.json(hacklist);
  } catch (error) {
    console.error('Error in hackthon list : ',error);
    res.status(500).json({ message: 'Failed to fetch hackathons' });
  }
});


module.exports = router;
