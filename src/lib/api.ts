// src/lib/api.ts
import axios from "axios";

const api = axios.create({
  // put ONLY the host/port in the env; append /api/v1 here
  baseURL: `${import.meta.env.VITE_API_BASE_URL}api`, // e.g. https://lmsbe-production.up.railway.app/api/v1
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// attach token automatically if you use auth
api.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    if (config.headers) {
      delete (config.headers as any)["Content-Type"]; // let browser set multipart boundary
    }
  } else {
    config.headers = { ...(config.headers || {}), "Content-Type": "application/json" };
  }
  return config;
});
export default api;          // <-- add this
export { api };  // <-- and this

// src/lib/api.ts

