import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateFacultyForm from './CreateFacultyForm';
import FacultyList from './FacultyList';
import axios from 'axios';
import './PrincipalDashboard.css';

function PrincipalDashboard() {
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = useState(false);
  const [showList, setShowList] = useState(false);
  const [facultyList, setFacultyList] = useState([]);
  const [refresh, setRefresh] = useState(0); // for updating list after creation

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  // Fetch faculty list when the component is mounted or after refresh
  useEffect(() => {
    axios.get('http://localhost:5000/api/faculty-list')
      .then(response => setFacultyList(response.data))
      .catch(error => console.error('Error fetching faculty list:', error));
  }, [refresh]); // will run when the refresh state changes

  const handleFacultyDeleted = () => {
    setRefresh((prev) => prev + 1); // Refresh the list after deletion
  };

  return (
    <div className="principal-dashboard">
      <div className="user-menu">
        <div className="user-dropdown">
          <span style={{color:'blue'}}>Logged in as: </span>
          <span style={{color:'green'}}><b>Principal</b></span>
          <div className="dropdown-content">
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>

      <h2>Principal Dashboard</h2>

      <button onClick={() => { setShowCreate(!showCreate); setShowList(false); }}>
        Create Faculty
      </button>
      <button onClick={() => { setShowList(!showList); setShowCreate(false); }}>
        List of Faculty
      </button>
      <button onClick={() => navigate('/')}>Return to Role Page</button>

      <div className="dashboard-section">
        {showCreate && <CreateFacultyForm onFacultyCreated={() => setRefresh(prev => prev + 1)} />}
        {showList && <FacultyList facultyList={facultyList} onFacultyDeleted={handleFacultyDeleted} />}
      </div>
    </div>
  );
}

export default PrincipalDashboard;
