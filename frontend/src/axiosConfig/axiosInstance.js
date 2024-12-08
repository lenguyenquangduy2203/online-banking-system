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
    // Lấy token người dùng từ localStorage
    let userToken; 
    try {
      userToken = JSON.parse(localStorage.getItem('user_token'));
    } catch (error) {
      userToken = undefined;
    }
    if (userToken) {
      config.headers[userToken.header] = userToken.token;
    }

    // Lấy token admin từ localStorage (nếu cần)
    let adminToken; 
    try {
      adminToken = JSON.parse(localStorage.getItem('admin_token'));
    } catch (error) {
      adminToken = undefined;
    }
    if (adminToken) {
      config.headers[adminToken.header] = adminToken.token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
