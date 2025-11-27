import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5055/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, error => Promise.reject(error));

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response) {
      // Server responded but with an error status (4xx / 5xx)
      console.error("API error:");
      console.error("Status:", err.response.status);
      console.error("URL:", err.config?.url);
      console.error("Method:", err.config?.method);
      console.error("Response data:", err.response.data);  // 💥 MOST IMPORTANT
    } else if (err.request) {
      // Request was sent but no response received
      console.error("No response from server:", err.request);
    } else {
      // Something went wrong setting up the request
      console.error("Error setting up request:", err.message);
    }

    return Promise.reject(err);
  }
);


export default api;
