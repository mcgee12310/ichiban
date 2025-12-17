// src/api/eventApi.js
import axiosClient from "./axiosClient";
import "./interceptor"; // 👈 quan trọng (chạy interceptor)

export const getAllEvents = async (page = 0, size = 10) => {
  const res = await axiosClient.post("/events/search", { page, size });
  return res.data;
};

export const getEventDetail = async (id) => {
  const res = await axiosClient.get(`/events/${id}`);
  return res.data;
};

export const getEventReviews = async (eventId, sortBy = "latest") => {
  const res = await axiosClient.get(`/events/${eventId}/reviews`, {
    params: { sortBy },
  });
  return res.data;
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
