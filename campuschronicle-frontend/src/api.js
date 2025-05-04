// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // 👈 Make sure this matches backend
});

export default API;
