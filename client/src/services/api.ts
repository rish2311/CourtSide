import axios from 'axios';

// ─── Base Axios Instance ──────────────────────────────────────────────────────

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,           // Send cookies with every request (for HTTP-only auth cookies)
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10_000,                 // 10 second timeout
});

// ─── Request Interceptor ──────────────────────────────────────────────────────
// Automatically attach Bearer token from localStorage (fallback to zustand later)

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor ─────────────────────────────────────────────────────
// Handles 401 globally — redirect to login if unauthorized

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect — will hook into auth store later
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
