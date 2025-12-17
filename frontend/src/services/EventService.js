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

// ======================== GET EVENT DETAIL ========================
export const getEventDetail = async (id) => {
  try {
    const response = await api.get(`/events/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Get event detail error:", error.response?.data || error);
    throw error;
  }
};

// ======================== GET EVENT REVIEWS ========================
export const getEventReviews = async (eventId, sortBy = "latest") => {
  try {
    const response = await api.get(`/events/${eventId}/reviews`, {
      params: { sortBy }
    });
    return response.data;
  } catch (error) {
    console.error("Get event reviews error:", error.response?.data || error);
    throw error;
  }
};

// ======================== SUBMIT EVENT REVIEW ========================
export const submitEventReview = async (eventId, rating, comment) => {
  try {
    const response = await api.post(`/events/${eventId}/reviews`, {
      rating,
      comment
    });
    return response.data;
  } catch (error) {
    console.error("Submit event review error:", error.response?.data || error);
    throw error;
  }
};
