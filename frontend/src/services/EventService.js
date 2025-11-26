import axios from "axios";

const BASE_URL = "http://localhost:8080/api"; 
// nhớ thống nhất prefix /api nếu BE dùng

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
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
