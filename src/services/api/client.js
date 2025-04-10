import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

const client = axios.create({
  baseURL: API_URL,
  timeout: 50000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;
