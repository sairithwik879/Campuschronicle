import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import shared styles

function PrincipalLogin() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (userId === 'principal' && password === '242006') {
      navigate('/principal-dashboard');
    } else {
      alert('Invalid credentials!');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Principal Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="text"
              className="login-input"
              placeholder="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              className="login-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
          <button type="button" className="return-btn" onClick={() => navigate('/')}>
            Return
          </button>
        </form>
      </div>
    </div>
  );
}

export default PrincipalLogin;
