// src/components/FacultyDashboard.js

import React, { useState } from 'react';
import PostHackathonForm from './PostHackathonForm';
import AddStudentForm from './AddStudentForm';
import SearchStudent from './SearchStudent';
import HackathonList from './HackathonList'; // ✅ Import HackathonList
import './FacultyDashboard.css';

function FacultyDashboard() {
  const [activeSection, setActiveSection] = useState('');

  const handleAcceptOutpassRedirect = () => {
    window.location.href = '/rithwik-proj/principle.html'; // redirect to static file
  };

  return (
    <div className="faculty-dashboard">
      <h2>Faculty Dashboard</h2>

      <div className="button-group">
        <button onClick={handleAcceptOutpassRedirect}>Accept Outpass</button>
        <button onClick={() => setActiveSection('postHackathon')}>Post Hackathon</button>
        <button onClick={() => setActiveSection('addStudent')}>Add Student</button>
        <button onClick={() => setActiveSection('searchStudent')}>Search Student by ID</button>
        <button onClick={() => setActiveSection('hackathonList')}>List of Hackathons</button>
        <button onClick={() => setActiveSection('dummy2')}>Dummy Button 2</button>
      </div>

      <div className="section">
        {activeSection === 'postHackathon' && <PostHackathonForm />}
        {activeSection === 'addStudent' && <AddStudentForm />}
        {activeSection === 'searchStudent' && <SearchStudent />}
        {activeSection === 'hackathonList' && <HackathonList />}
        {activeSection === 'dummy2' && (
          <div>
            <h3>Dummy Button 2</h3>
            <p>Placeholder for future feature.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FacultyDashboard;
