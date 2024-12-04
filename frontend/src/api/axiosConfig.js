import axios from 'axios';

const apiKey = localStorage.getItem('user_token') || process.env.REACT_APP_USER_API_KEY; 

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
    'X-User-Api-Key': apiKey,
  },
});

export default axiosInstance;
