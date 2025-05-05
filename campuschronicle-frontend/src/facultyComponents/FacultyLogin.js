import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FacultyLogin.css'; // optional if you want to style

function FacultyLogin() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('https://campuschronicle-backend.onrender.com/api/login', { userId, password },);

      if (response.data.role === 'faculty') {
        localStorage.setItem('token', response.data.token);
        navigate('/faculty-dashboard');
      } else {
        setError('Not a faculty user.');
      }
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="faculty-login">
      <h2>Faculty Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <button onClick={() => navigate('/')}>Return to Role Page</button>
      </form>
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
}

export default FacultyLogin;
