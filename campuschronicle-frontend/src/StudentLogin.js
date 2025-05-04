import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StudentLogin() {
  const [studentId, setStudentId] = useState('');
  const [studentMobile, setStudentMobile] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // For redirection

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/student-login', {
        studentId,
        studentMobile,
      });

      if (response.data.success) {
        setMessage('✅ Login successful');
        navigate('/student-dashboard'); // Replace with your actual route
      } else {
        setMessage('❌ Login failed');
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setMessage(`❌ ${error.response.data.message}`);
      } else {
        setMessage('❌ Server error. Please try again.');
      }
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Student Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
        />
        <br /><br />
        <input
          type="text"
          placeholder="Mobile Number"
          value={studentMobile}
          onChange={(e) => setStudentMobile(e.target.value)}
          required
        />
        <br /><br />
        <button type="submit">Login</button>
        <button onClick={() => navigate('/')}>Return to Role Page</button>
      </form>
      {message && <p style={{ color: message.includes('✅') ? 'green' : 'red' }}>{message}</p>}
    </div>
  );
}

export default StudentLogin;
