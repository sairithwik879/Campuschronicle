require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');  // Import authRoutes first
const apiRoutes = require('./routes/apiRoutes');    // Import apiRoutes here
//const test = require('./routes/testRoutes');
const hackathonRoutes = require('./routes/hackthonRoutes');
const studentRoutes = require('./routes/studentRoutes');

//const rithwik33Routes = require('./routes/stuloginRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Import routes and use them
app.use('/api', authRoutes);  // Use authRoutes first
app.use('/api', apiRoutes);   // Use apiRoutes second
app.use('/api', hackathonRoutes);
app.use('/api', studentRoutes);
app.use('/rithwik-proj', express.static(path.join(__dirname, 'campuschronicle-frontend', 'rithwik-proj')));


//app.use('/api', test);
//app.use('/api', rithwik33Routes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
