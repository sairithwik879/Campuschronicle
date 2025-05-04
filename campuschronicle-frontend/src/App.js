// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import StudentLogin from './StudentLogin';
import FacultyLogin from './facultyComponents/FacultyLogin';
import PrincipalLogin from './PrincipalLogin';
import StudentDashboard from './StudentDashboard';
import FacultyDashboard from './facultyComponents/FacultyDashboard';
import PrincipalDashboard from './components/PrincipalDashboard'; // ✅ updated import path

function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="app-container">
      <h1 className="title">Welcome to CampusChronicle</h1>
      <p className="subtitle">Select Your Role</p>
      <div className="role-buttons">
        <button onClick={() => navigate('/login/student')}>Student</button>
        <button onClick={() => navigate('/login/faculty')}>Faculty</button>
        <button onClick={() => navigate('/login/principal')}>Principal</button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login/student" element={<StudentLogin />} />
        <Route path="/login/faculty" element={<FacultyLogin />} />
        <Route path="/login/principal" element={<PrincipalLogin />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
        <Route path="/principal-dashboard" element={<PrincipalDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
