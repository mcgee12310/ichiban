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
    localStorage.setItem("token", data.token);
    localStorage.setItem("email", data.email);
    console.log("Login response data:", response.data);
    
    return data;
  } catch (error) {
    console.error("Login thất bại", error);
    throw error;
  }
}

export const signupAPICall = async (email, password, fullName, birthdate, gender) => {
  try {
    const response = await axios.post("http://localhost:8080/api/auth/signup", {
      email: email,
      password: password,
      fullName: fullName,
      birthdate: birthdate,
      gender: gender
    });

    // Kiểm tra response
    if (response.data) {
      return {
        success: true,
        data: response.data,
        message: response.data.message || 'Registration successful'
      };
    }
    
    throw new Error('No response data received');
    
  } catch (error) {
    // Xử lý các loại lỗi khác nhau
    if (error.response) {
      // Server trả về error response
      const errorMessage = error.response.data?.message || 
                          error.response.data?.error ||
                          'サーバーエラーが発生しました';
      
      throw new Error(errorMessage);
    } else if (error.request) {
      // Request được gửi nhưng không nhận được response
      throw new Error('サーバーに接続できません。ネットワークを確認してください。');
    } else {
      // Lỗi khác
      throw new Error(error.message || '予期しないエラーが発生しました');
    }
  }
};
