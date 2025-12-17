import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Home, Search, Heart, Calendar, Menu, MapPin, Tag, Clock, ChevronLeft, ChevronRight, Share2, Star, ArrowLeft, Navigation } from 'lucide-react';
import Header from '../components/header/Header';
import { getEventDetail, getEventReviews, submitEventReview } from '../../services/EventService'
import { formatDate, formatPrice } from "../../ultis/format";

export default function PlaceDetailPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { id } = useParams();

  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % place.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + place.images.length) % place.images.length);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: place.name,
        text: place.description,
        url: window.location.href
      });
    } else {
      alert('この機能はお使いのブラウザではサポートされていません');
    }
  };

  const openInGoogleMaps = () => {
    const query = encodeURIComponent(place.address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      alert('評価を選択してください');
      return;
    }

    if (!comment.trim()) {
      alert('コメントを入力してください');
      return;
    }

    try {
      setSubmitting(true);
      await submitEventReview(id, rating, comment);
      
      // Reset form
      setRating(0);
      setComment('');
      setHoveredRating(0);
      
      // Refresh reviews
      const reviewRes = await getEventReviews(id, "latest");
      setReviews(reviewRes.reviews || []);
      setAverageRating(reviewRes.averageRating);
      setTotalReviews(reviewRes.totalReviews);
      
      alert('レビューを投稿しました！');
    } catch (error) {
      console.error("Submit review failed:", error);
      alert('レビューの投稿に失敗しました。もう一度お試しください。');
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const eventDetail = await getEventDetail(id);
        setPlace(eventDetail);

        const reviewRes = await getEventReviews(id, "latest");
        setReviews(reviewRes.reviews || []);
        setAverageRating(reviewRes.averageRating);
        setTotalReviews(reviewRes.totalReviews);
      } catch (error) {
        console.error("Load event detail failed:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

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
                <button className="bg-red-50 hover:bg-red-100 text-red-500 p-3 rounded-full transition-all hover:scale-110">
                  <Heart size={24} />
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
                <span className="font-medium">{formatDate(place.startDate)} - {formatDate(place.endDate)}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600 mb-4 bg-green-50 p-3 rounded-lg">
                <Tag size={18} className="text-green-600" />
                <span className="font-semibold text-green-700">
                  {formatPrice(place.price)}
                </span>
              </div>

              <p className="text-gray-700 leading-relaxed text-lg">{place.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => alert('お気に入りに追加しました！')}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white py-3.5 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-red-600 hover:to-pink-600 transition-all transform hover:scale-105"
              >
                <Heart size={20} />
                お気に入りに追加
              </button>
              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 bg-white border-2 border-gray-300 text-gray-700 py-3.5 px-6 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <Share2 size={20} />
                シェアー
              </button>
            </div>

            {/* Review Form */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Star className="text-yellow-500" />
                レビューを書く
              </h2>
              
              <form onSubmit={handleSubmitReview} className="space-y-4">
                {/* Star Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    評価 <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="transition-transform hover:scale-110 focus:outline-none"
                      >
                        <Star
                          size={32}
                          className={
                            star <= (hoveredRating || rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }
                        />
                      </button>
                    ))}
                    {rating > 0 && (
                      <span className="ml-2 text-sm text-gray-600 font-medium">
                        {rating} / 5
                      </span>
                    )}
                  </div>
                </div>

                {/* Comment Textarea */}
                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                    コメント <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={5}
                    placeholder="このイベントについての感想を書いてください..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all resize-none text-gray-700"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    {comment.length} 文字
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting || rating === 0 || !comment.trim()}
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3.5 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-red-600 hover:to-pink-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg"
                >
                  {submitting ? '投稿中...' : 'レビューを投稿'}
                </button>
              </form>
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
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  レビュー
                </h2>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-500 fill-yellow-500" size={16} />
                    <span className="font-semibold text-gray-900">
                      {averageRating}
                    </span>
                  </div>
                  <span>({totalReviews} 件)</span>
                </div>
              </div>

              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-5 hover:shadow-md transition-all border border-gray-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {review.userName.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500 font-medium">{review.date}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
