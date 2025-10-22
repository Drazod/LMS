// src/lib/api.ts
import axios from "axios";

const api = axios.create({
  // put ONLY the host/port in the env; append /api/v1 here
  baseURL: `${import.meta.env.VITE_API_BASE_URL}api`, // e.g. https://lmsaibe-production.up.railway.app/api/v1
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// attach token automatically if you use auth
api.interceptors.request.use((config) => {
  // Handle Content-Type for FormData
  if (config.data instanceof FormData) {
    // For FormData, let the browser set the content type with boundary
    config.headers?.delete?.('Content-Type');
  } else {
    // For JSON requests, set content type
    config.headers = config.headers || {};
    config.headers['Content-Type'] = 'application/json';
  }

  // Automatically attach authentication token
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers = config.headers || {};
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
});
export default api;          // <-- add this
export { api };  // <-- and this

// src/lib/api.ts

