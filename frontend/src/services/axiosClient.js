// src/api/axiosClient.js
import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // ✅ ĐÚNG TÊN ENV
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
  withCredentials: true, // ✅ cần cho auth / cookie / CORS
});

export default axiosClient;
