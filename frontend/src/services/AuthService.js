import axios from 'axios';

const AUTH_REST_API_BASE_URL= 'http://localhost:8080/api/auth/';

const api = axios.create({
  baseURL: AUTH_REST_API_BASE_URL,
});

// gọi API đăng nhập
export const loginAPICall = async (username,password) => {
  const response = await api.post("/login", { username,password });
  return response.data;
}
  