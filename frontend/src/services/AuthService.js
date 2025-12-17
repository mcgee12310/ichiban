// src/api/authApi.js
import axiosClient from "./axiosClient";
import "./interceptor";

/**
 * LOGIN
 */
export const loginAPICall = async (email, password) => {
  try {
    const response = await axiosClient.post("/auth/login", {
      email,
      password,
    });

    const data = response.data;

    // Lưu token
    if (data?.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);
    }

    console.log("Login response:", data);
    return data;
  } catch (error) {
    console.error("Login thất bại", error.response?.data || error);
    throw error;
  }
};

/**
 * SIGN UP
 */
export const signupAPICall = async (
  email,
  password,
  fullName,
  birthdate,
  gender
) => {
  try {
    const response = await axiosClient.post("/auth/signup", {
      email,
      password,
      fullName,
      birthdate,
      gender,
    });

    return {
      success: true,
      data: response.data,
      message: response.data?.message || "Registration successful",
    };
  } catch (error) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message ||
        error.response.data?.error ||
        "サーバーエラーが発生しました";
      throw new Error(errorMessage);
    } else if (error.request) {
      throw new Error(
        "サーバーに接続できません。ネットワークを確認してください。"
      );
    } else {
      throw new Error(error.message || "予期しないエラーが発生しました");
    }
  }
};
