import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FavoritePage.module.css";
import Header from "../components/header/Header";
import EventCard from "../components/eventCard/EventCard";
import { getFavorite } from "../../services/FavoriteService";

export default function FavoritePage() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const data = await getFavorite();
      console.log("Fetched favorites data:", data);
      // API returns array directly or wrapped in favorites property
      const favoritesArray = Array.isArray(data) ? data : (data.favorites || []);
      console.log("Favorites array:", favoritesArray);
      // Log first item to see structure
      if (favoritesArray.length > 0) {
        console.log("First favorite item structure:", favoritesArray[0]);
      }
      setFavorites(favoritesArray);
    } catch (err) {
      setError(err.message);
      console.error('Failed to load favorites:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  const handleRemoveFavorite = () => {
    // Refresh favorites after removing
    fetchFavorites();
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.wrapper}>
        <div className="mb-6 pb-6 border-b-2 border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">My Favorites</h2>
          <p className="text-gray-600">
            {favorites.length === 0 ? "No favorite events yet" : `You have ${favorites.length} favorite event(s)`}
          </p>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Loading favorites...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 text-center mb-6">
            <p className="text-red-600 font-semibold mb-2">Error Loading Favorites</p>
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={fetchFavorites}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && favorites.length === 0 && (
          <div className="bg-gray-50 rounded-lg p-12 text-center border-2 border-dashed border-gray-300">
            <p className="text-gray-600 mb-4 text-lg">💔 No favorite events added yet</p>
            <button
              onClick={() => navigate('/events/search')}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg transition-colors font-semibold"
            >
              Browse Events
            </button>
          </div>
        )}

        {!loading && !error && favorites.length > 0 && (
          <div>
            {favorites.map((event, index) => (
              <div key={event.id}>
                <EventCard
                  place={event}
                  onCardClick={() => handleCardClick(event.id)}
                  onRemoveFavorite={handleRemoveFavorite}
                  showRemoveButton={true}
                />
                {index < favorites.length - 1 && <div className="my-2"></div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
