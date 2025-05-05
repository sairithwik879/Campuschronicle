import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './OutpassRequestList.css';

function OutpassRequestList() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOutpassRequests = async () => {
      try {
        const response = await axios.get('https://campuschronicle-backend.onrender.com/api/students');
        setRequests(response.data);
        setError('');
      } catch (err) {
        setError('❌ Failed to fetch outpass requests');
        console.error('Error fetching outpass requests:', err);
      }
    };

    fetchOutpassRequests();
  }, []);

  return (
    <div className="outpass-page">
      {/* Fixed Header */}
      <header className="outpass-header">
        <h1>📄 Outpass Requests</h1>
        <p className="outpass-subtext">Review and manage student outpass requests below.</p>
      </header>

      {/* Scrollable Content Area */}
      <main className="outpass-body">
        {error && <p className="error-text">{error}</p>}
        {requests.length > 0 ? (
          requests.map((request) => (
            <div key={request._id} className="request-card">
              <div>
                <strong>Student ID:</strong> {request.studentId} <br />
                <strong>Time:</strong> {request.time} <br />
                <strong>Reason:</strong> {request.reason} <br />
                <strong>Status:</strong> {request.status || 'Pending'} <br />
              </div>
              <button className="approve-button">Click</button>
            </div>
          ))
        ) : (
          <p>No outpass requests available.</p>
        )}
      </main>

      {/* Fixed Footer */}
      <footer className="outpass-footer">
        <button onClick={() => navigate('/login/faculty')} className="back-button">
          Return to Faculty Login
        </button>
      </footer>
    </div>
  );
}

export default OutpassRequestList;
