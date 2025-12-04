import axios from "axios";

const BASE_URL = "http://localhost:8080/api"; 
// nhớ thống nhất prefix /api nếu BE dùng

const token = localStorage.getItem("token"); 

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}` // token lấy từ login
  }
});

// ======================== GET ALL EVENTS ========================
export const getAllEvents = async (page = 0, size = 10) => {
  try {
    const response = await api.post("/events/search", { page, size });
    console.log("Get events response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Get events error:", error);
    throw error;
  }
};
