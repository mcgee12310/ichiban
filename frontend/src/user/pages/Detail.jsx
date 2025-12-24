import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Home, Search, Heart, Calendar, Menu, MapPin, Tag, Clock, ChevronLeft, ChevronRight, Share2, Star, ArrowLeft, Navigation } from 'lucide-react';
import Header from '../components/header/Header';
import ReviewSection from "../components/ReviewSection";
import ReviewItem from "../components/ReviewItem";
import { getEventDetail, getEventReviews } from '../../services/EventService'
import { addFavorite, removeFavorite } from '../../services/FavoriteService';
import { formatDate, formatPrice } from "../../ultis/format";

export default function PlaceDetailPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { eventId } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [reviews, setReviews] = useState([]);
  const sortedReviews = [...reviews].sort((a, b) => {
    if (a.isMyComment && !b.isMyComment) return -1;
    if (!a.isMyComment && b.isMyComment) return 1;
    return new Date(b.createdAt) - new Date(a.createdAt); // mới hơn lên trước
  });
  const [isFavorited, setIsFavorited] = useState(false);
  const [isUpdatingFavorite, setIsUpdatingFavorite] = useState(false);


  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % place.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + place.images.length) % place.images.length);
  };

  const openInGoogleMaps = () => {
    const query = encodeURIComponent(place.address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  const handleToggleFavorite = async () => {
    if (isUpdatingFavorite) return;

    try {
      setIsUpdatingFavorite(true);

      if (isFavorited) {
        await removeFavorite(eventId);
        setIsFavorited(false);
      } else {
        await addFavorite(eventId);
        setIsFavorited(true);
      }
    } catch (err) {
      alert('Please login to use favorite feature');
    } finally {
      setIsUpdatingFavorite(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem('token');
        if (token) {
      setIsLoggedIn(true);
    }
        const eventDetail = await getEventDetail(eventId);
        setPlace(eventDetail);
        setIsFavorited(eventDetail.isFavorite || false);
        console.log(eventDetail);

        const reviewRes = await getEventReviews(eventId);
        console.log(reviewRes);
        setReviews(reviewRes || []);

        const totalReviews = reviewRes.length;
        const averageRating =
          totalReviews === 0
            ? 0
            : (
              reviewRes.reduce((sum, r) => sum + r.rating, 0) / totalReviews
            ).toFixed(1);

        setAverageRating(averageRating);
        setTotalReviews(totalReviews);
      } catch (error) {
        console.error("Load event detail failed:", error);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) fetchData();
  }, [eventId]);

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!place) {
    return <div className="p-10 text-center">No data</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      <Header />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">戻る</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="relative bg-gray-200 rounded-2xl overflow-hidden shadow-lg group">
              <div className="aspect-video w-full">
                <img
                  src={place?.images?.[currentImageIndex] || "https://via.placeholder.com/800x450"}
                  alt="Place"
                  className="w-full h-full object-cover"
                />
              </div>

              {place.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                  >
                    <ChevronRight size={24} />
                  </button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {place.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`h-2 rounded-full transition-all ${index === currentImageIndex ? 'bg-white w-8' : 'bg-white/60 w-2'
                          }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Place Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{place.title}</h1>
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <MapPin size={18} className="text-red-500" />
                    <span>{place.address}, {place.district}, {place.city}</span>
                  </div>
                </div>

                <button
                  onClick={handleToggleFavorite}
                  disabled={isUpdatingFavorite}
                  className={`
    p-3 rounded-full transition-all hover:scale-110
    ${isFavorited
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-red-50 hover:bg-red-100 text-red-500'}
    ${isUpdatingFavorite ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''}
  `}
                >
                  <Heart
                    size={24}
                    fill={isFavorited ? 'currentColor' : 'none'}
                  />
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {place.categories.map((category, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-red-50 to-pink-50 text-red-600 rounded-full text-sm font-medium"
                  >
                    <Tag size={14} />
                    {category}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 text-gray-600 mb-4 bg-blue-50 p-3 rounded-lg">
                <Clock size={18} className="text-blue-500" />
                <span className="font-medium">{formatDate(place.startDatetime)} - {formatDate(place.endDatetime)}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600 mb-4 bg-green-50 p-3 rounded-lg">
                <Tag size={18} className="text-green-600" />
                <span className="font-semibold text-green-700">
                  {formatPrice(place.price)}
                </span>
              </div>

              <p className="text-gray-700 leading-relaxed text-lg">{place.description}</p>
            </div>
          </div>

          {/* Right Column - Map & Reviews */}
          <div className="space-y-6">
            {/* Map Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="text-red-500" />
                場所
              </h2>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 mb-4 flex items-center justify-center min-h-[200px] border-2 border-dashed border-blue-200">
                <div className="text-center">
                  <MapPin size={48} className="text-blue-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-4 font-medium">
                    地図 (API統合時にGoogleマップを埋め込む)
                  </p>
                  <button
                    onClick={openInGoogleMaps}
                    className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all shadow-md hover:shadow-lg transform hover:scale-105 font-semibold"
                  >
                    <Navigation size={18} />
                    Googleマップで開く
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 font-medium">{place.address}, {place.district}, {place.city}</p>
              </div>
            </div>

            {/* Review Section */}
            <ReviewSection
              reviews={reviews}
              setReviews={setReviews}
              isLoggedIn={isLoggedIn}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
