import React from 'react';
import axios from 'axios';

function FacultyList({ facultyList, onFacultyDeleted }) {
  const handleDelete = (facultyId) => {
    axios.delete(`http://localhost:5000/api/delete-faculty/${facultyId}`)
      .then(response => {
        // After successful deletion, refresh the list
        onFacultyDeleted();
      })
      .catch(error => {
        console.error('Error deleting faculty:', error);
      });
  };

  return (
    <div className="faculty-list">
      <h3>Faculty List</h3>
      <ul>
        {facultyList.length > 0 ? (
          facultyList.map((faculty) => (
            <li key={faculty._id}>
              {faculty.name} - {faculty.userId}
              <button onClick={() => handleDelete(faculty._id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No faculty found.</p>
        )}
      </ul>
    </div>
  );
}

export default FacultyList;
