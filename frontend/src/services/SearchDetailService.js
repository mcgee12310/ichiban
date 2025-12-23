const API_BASE_URL = 'http://localhost:8080/api';

export const fetchEventDetail = async (eventId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/events/${eventId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching event detail:', error);
    throw error;
  }
};
