

import axios from 'axios';

const url = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: url,
  timeout: 60000,
  headers: {
    Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : undefined,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
