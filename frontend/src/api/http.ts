import axios, { type AxiosInstance, type InternalAxiosRequestConfig, AxiosError } from 'axios';

// The default is /api/v1 due to backend setup. In docker we reverse proxy or talk directly to port 8005.
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8005/api/v1';

export const http: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach JWT token
http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('auth_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Interceptor to handle global 401s
http.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Clear token and fire a custom event so the UI context can reset
      localStorage.removeItem('auth_token');
      window.dispatchEvent(new Event('auth_unauthorized'));
    }
    return Promise.reject(error);
  }
);
