import React, { useState } from 'react';
import axios from 'axios';

function SearchStudent() {
  const [studentId, setStudentId] = useState('');
  const [student, setStudent] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle input changes for studentId
  const handleChange = (e) => {
    setStudentId(e.target.value);
  };

  // Handle the form submission to search the student by ID
  const handleSearch = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message on new search

    try {
      // Send a GET request to the backend to search for the student
      const response = await axios.get(`https://campuschronicle-backend.onrender.com/api/search-student/${studentId}`);
      setStudent(response.data);
    } catch (error) {
      setErrorMessage('Student not found or server error');
      setStudent(null); // Clear student data on error
    }
  };

  return (
    <div>
      <h3>Search Student by ID</h3>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={handleChange}
          required
        />
        <button type="submit">Search</button>
      </form>

      {errorMessage && <p>{errorMessage}</p>}
      
      {student && (
        <div>
          <h4>Student Found:</h4>
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Student ID:</strong> {student.studentId}</p>
          <p><strong>Mobile:</strong> {student.studentMobile}</p>
          <p><strong>Parent Mobile:</strong> {student.parentMobile}</p>
          <p><strong>Remark:</strong> {student.remark}</p>
        </div>
      )}
    </div>
  );
}

export default SearchStudent;
