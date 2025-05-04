import React, { useState } from 'react';
import axios from 'axios';

function AddStudentForm() {
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    studentMobile: '',
    parentMobile: '',
    remark: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading state

    try {
      const response = await axios.post('http://localhost:5000/api/students', formData);
      setMessage(response.data.message || 'Student added successfully.');
      setFormData({
        name: '',
        studentId: '',
        studentMobile: '',
        parentMobile: '',
        remark: '',
      });
    } catch (error) {
      // Error handling with more detailed message
      const errorMessage = error.response ? error.response.data.message : error.message;
      setMessage(`Error: ${errorMessage}`);
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div className="add-student-form">
      <h3>Add Student</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="studentId"
            placeholder="Student ID"
            value={formData.studentId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="tel"
            name="studentMobile"
            placeholder="Student Mobile Number"
            value={formData.studentMobile}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="tel"
            name="parentMobile"
            placeholder="Parent Mobile Number"
            value={formData.parentMobile}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="remark"
            placeholder="Remark"
            value={formData.remark}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <button type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Student'}
          </button>
        </div>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default AddStudentForm;
