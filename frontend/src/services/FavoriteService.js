import api from "./axiosClient";

// Lấy danh sách sự kiện yêu thích
export const getFavoriteEvents = async () => {
  const response = await api.get("/favorites");
  return response.data;
};

// Thêm sự kiện vào yêu thích
export const addFavorite = async (eventId) => {
  const response = await api.post(`/favorites/${eventId}`);
  return response.data;
};

// Xóa sự kiện khỏi yêu thích
export const removeFavorite = async (eventId) => {
  const response = await api.delete(`/favorites/${eventId}`);
  return response.data;
};

// Kiểm tra xem sự kiện có trong yêu thích không
export const checkFavorite = async (eventId) => {
  const response = await api.get(`/favorites/check/${eventId}`);
  return response.data;
};
