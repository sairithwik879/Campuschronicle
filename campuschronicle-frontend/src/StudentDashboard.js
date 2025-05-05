import React, { useState } from 'react';
import axios from 'axios';
import './StudentDashboard.css';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const [hackathons, setHackathons] = useState([]);
  const [hackathonError, setHackathonError] = useState('');
  const [currentView, setCurrentView] = useState('dashboard');

  const navigate = useNavigate();

  const handleShowHackathons = async () => {
    try {
      const response = await axios.get('https://campuschronicle-backend.onrender.com/api/hacklist');
      setHackathons(response.data);
      setHackathonError('');
    } catch (error) {
      setHackathonError('❌ Failed to fetch hackathons.');
      setHackathons([]);
    }
    setCurrentView('hackathons');
  };

  const renderDashboard = () => (
    <>
      <h2>🎓 Student Dashboard</h2>

      {/* Open static HTML form */}
      <a href="/rithwik-proj/student.html" target="_blank" rel="noopener noreferrer">
        <button>Request Outpass</button>
      </a>
      <br /><br />

      <button onClick={handleShowHackathons}>Hackathons Available</button><br /><br />
      <button className="back-button" onClick={() => navigate('/login/student')}>🔙 Back to Login</button>
    </>
  );

  const renderHackathons = () => (
    <>
      <h2>🚀 Available Hackathons</h2>
      {hackathonError && <p className="error-msg">{hackathonError}</p>}
      {hackathons.length > 0 ? (
        <div className="hackathon-scroll-container">
          <ul className="hackathon-list">
            {hackathons.map((hackathon) => (
              <li key={hackathon._id} className="hackathon-item">
                <strong>{hackathon.name}</strong><br />
                Deadline: {new Date(hackathon.applicationDeadline).toLocaleDateString()}<br />
                Posted On: {new Date(hackathon.postedDate).toLocaleDateString()}<br />
                <a href={hackathon.applicationLink} target="_blank" rel="noopener noreferrer">
                  Apply Now
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        !hackathonError && <p>No hackathons available right now.</p>
      )}
      <br />
      <button className="back-button" onClick={() => setCurrentView('dashboard')}>🔙 Back to Dashboard</button>
    </>
  );

  return (
    <div className="student-dashboard-container">
      {currentView === 'dashboard' && renderDashboard()}
      {currentView === 'hackathons' && renderHackathons()}
    </div>
  );
};

export default StudentDashboard;
