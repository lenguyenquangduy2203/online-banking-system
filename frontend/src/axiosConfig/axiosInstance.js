// src/axiosConfig/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // Base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem('user_token');
    if (userToken) {
      config.headers['X-User-Api-Key'] = userToken;
    }

    // Lấy token admin từ localStorage (nếu cần)
    const adminToken = localStorage.getItem('admin_token');
    if (adminToken) {
      config.headers['X-Admin-Api-Key'] = adminToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
