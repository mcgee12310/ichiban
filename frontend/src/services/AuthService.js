import axios from 'axios';

const AUTH_REST_API_BASE_URL= 'http://localhost:8080/api/auth';

const api = axios.create({
  baseURL: AUTH_REST_API_BASE_URL,
});

// gọi API đăng nhập
export const loginAPICall = async (email, password) => {
  try {
    const response = await axios.post("http://localhost:8080/api/auth/login", {
      email,
      password
    });

    const data = response.data;

    console.log("Login response data:", response.data.token);
    
    // 1. Lưu token vào localStorage (tùy chọn, để giữ login sau khi reload)
    localStorage.setItem("jwtToken", data.token);

    // 2. Lưu token vào state nếu cần
    // setToken(token);

    return true;
  } catch (error) {
    console.error("Login thất bại", error);
    throw error;
  }
}
  