import axiosClient from "./axiosClient";

// Lấy danh sách sự kiện yêu thích
export const getFavorite = async () => {
  const response = await axiosClient.get("/favorites");
  return response.data;
};

// Thêm sự kiện vào yêu thích
export const addFavorite = async (eventId) => {
  const response = await axiosClient.post(`/favorites/${eventId}`);
  return response.data;
};

// Xóa sự kiện khỏi yêu thích
export const removeFavorite = async (eventId) => {
  const response = await axiosClient.delete(`/favorites/${eventId}`);
  return response.data;
};

// Kiểm tra xem sự kiện có trong yêu thích không
export const checkFavorite = async (eventId) => {
  const response = await axiosClient.get(`/favorites/check/${eventId}`);
  return response.data;
};
