import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './HackathonList.css';

const HackathonList = () => {
  const [hackathons, setHackathons] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch the list of hackathons from the server
    axios.get('http://localhost:5000/api/hacklist')
      .then((response) => {
        setHackathons(response.data); // Update state with fetched hackathons
      })
      .catch((error) => {
        setError('No hackathons found');
        console.error('Error fetching hackathons:', error);
      });
  }, []);

  return (
    <div className="hackathon-list">
      <h2>Upcoming Hackathons</h2>
      {error && <div className="error">{error}</div>}
      
      {hackathons.length > 0 ? (
        <ul>
          {hackathons.map((hackathon) => (
            <li key={hackathon._id}>
              <strong>{hackathon.name}</strong>
              <p><strong>Application Deadline:</strong> {new Date(hackathon.applicationDeadline).toLocaleDateString()}</p>
              <p><strong>Posted On:</strong> {new Date(hackathon.postedDate).toLocaleDateString()}</p>
              <a href={hackathon.applicationLink} target="_blank" rel="noopener noreferrer">Apply Now</a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hackathons available at the moment.</p>
      )}

        <footer className="outpass-footer">
          <button onClick={() => navigate('/login/faculty')} className="back-button">
          Return to Faculty Login
        </button>
      </footer>
    </div>
  );
}

export default HackathonList;
