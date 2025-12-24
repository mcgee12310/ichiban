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

// export const getEventReviews = async (eventId, sortBy = "latest") => {
//   const res = await axiosClient.get(`/events/${eventId}/reviews`, {
//     params: { sortBy },
//   });
//   return res.data;
// };


// ======================== EVENT REVIEW ========================
export const getEventReviews = async (eventId) => {
  const res = await axiosClient.get(`/comment/events/${eventId}`);
  return res.data;
};

// api/commentApi.js
export const createEventComment = async (eventId, content, rating) => {
  const res = await axiosClient.post(`/comment/events/${eventId}`, {
    content,
    rating
  });
  return res.data;
};

export const updateEventComment = async (commentId, content, rating) => {
  const res = await axiosClient.put(`/comment/${commentId}`, {
    content,
    rating
  });
  return res.data;
};

export const deleteEventComment = async (commentId) => {
  await axiosClient.delete(`/comment/${commentId}`);
};
