import React, { useState } from 'react';
import axios from 'axios';

function PostHackathonForm() {
  const [formData, setFormData] = useState({
    name: '',
    applicationDeadline: '',
    postedDate: '',
    applicationLink: '',
  });

  const [message, setMessage] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the POST request to the server with the form data
      await axios.post('http://localhost:5000/api/post-hackathon', formData);
      setMessage('Hackathon posted successfully.');

      // Reset form fields after successful submission
      setFormData({
        name: '',
        applicationDeadline: '',
        postedDate: '',
        applicationLink: '',
      });
    } catch (error) {
      setMessage('Error posting hackathon.');
      console.error('Error posting hackathon:', error);
    }
  };

  return (
    <div>
      <h3>Post Hackathon</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Hackathon Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="applicationDeadline"
          placeholder="Application Deadline"
          value={formData.applicationDeadline}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="postedDate"
          placeholder="Posted Date"
          value={formData.postedDate}
          onChange={handleChange}
          required
        />
        <input
          type="url"
          name="applicationLink"
          placeholder="Application Link"
          value={formData.applicationLink}
          onChange={handleChange}
          required
        />
        <button type="submit">Post Hackathon</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default PostHackathonForm;
