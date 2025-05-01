import axios from 'axios';

// Create an Axios instance with a base URL
const apiClient = axios.create({
  baseURL: 'https://re-assist-backend.onrender.com', // Replace with your backend API URL
  timeout: 5000, // Optional: Set a timeout for requests
});

// Add an interceptor to include the token in the headers
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Add the token to the Authorization header
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;