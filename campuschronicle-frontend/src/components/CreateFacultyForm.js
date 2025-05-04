// src/components/CreateFacultyForm.js
import React, { useState } from 'react';
import axios from 'axios';

function CreateFacultyForm({ onFacultyCreated }) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const facultyData = { userId, password, name };

    axios.post('http://localhost:5000/api/create-faculty', facultyData)
      .then((response) => {
        setMessage('Faculty created successfully!');
        onFacultyCreated();  // Refresh the faculty list
      })
      .catch((error) => {
        setMessage('Error creating faculty');
        console.error(error);
      });
  };

  return (
    <div>
      <h3>Create Faculty</h3>
      <form onSubmit={handleSubmit}>
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
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Create</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateFacultyForm;
