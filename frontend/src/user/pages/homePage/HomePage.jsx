import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { getAllEvents } from "../../../services/EventService";
import { Search, Heart, TrendingUp, Star } from "lucide-react";
import { formatDate } from "../../../ultis/format";

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await getAllEvents(0, 20);
      setEvents(response.events || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter events by search query
  const filteredEvents = events.filter(event =>
    event.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.district?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.city?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get random events for different sections
  const favouriteEvents = events.slice(0, 3);
  const osusumeEvents = events.slice(3, 6); // 3 events instead of 2
  const hotTrendEvents = events.slice(6, 9); // 3 events

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-100 to-purple-100">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            
            {/* SEARCHING FOR PLACE */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-pink-200">
              <div className="flex items-center gap-3 mb-2">
                <Search className="w-6 h-6 text-pink-600" />
                <h2 className="text-2xl font-bold text-gray-800">Searching for place</h2>
              </div>
              <p className="text-gray-600 mb-6 text-sm">Mở tả cái gì đó</p>
              
              <form onSubmit={handleSearch} className="flex gap-3">
                <input
                  type="text"
                  placeholder="Mô tả cái gì đó"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-5 py-3 rounded-full border-2 border-pink-200 bg-white/90 focus:outline-none focus:border-pink-400 transition-all text-gray-700 placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-full font-medium hover:from-pink-500 hover:to-pink-600 transition-all shadow-md hover:shadow-lg"
                >
                  Tìm kiếm
                </button>
              </form>
            </div>

            {/* FAVOURITE */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-pink-200">
              <div className="flex items-center gap-3 mb-6">
                <Heart className="w-6 h-6 text-pink-600 fill-pink-600" />
                <h2 className="text-2xl font-bold text-gray-800">Favourite</h2>
              </div>
              
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-8 text-gray-500">Đang tải...</div>
                ) : favouriteEvents.length > 0 ? (
                  favouriteEvents.map((event, index) => (
                    <EventItemCard key={index} event={event} />
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">Không có sự kiện yêu thích</div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            
            {/* OSUSUME (Recommended) */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-pink-200">
              <div className="flex items-center gap-3 mb-6">
                <Star className="w-6 h-6 text-pink-600 fill-pink-600" />
                <h2 className="text-2xl font-bold text-gray-800">Osusume</h2>
              </div>
              
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-8 text-gray-500">Đang tải...</div>
                ) : osusumeEvents.length > 0 ? (
                  osusumeEvents.map((event, index) => (
                    <EventItemCard key={index} event={event} />
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">Không có sự kiện</div>
                )}
              </div>
            </div>

            {/* HOT TREND */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-pink-200">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-6 h-6 text-pink-600" />
                <h2 className="text-2xl font-bold text-gray-800">Hot trend</h2>
              </div>
              
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-8 text-gray-500">Đang tải...</div>
                ) : hotTrendEvents.length > 0 ? (
                  hotTrendEvents.map((event, index) => (
                    <EventItemCard key={index} event={event} />
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">Không có sự kiện</div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Event Item Card Component
function EventItemCard({ event, compact = false }) {
  const defaultImage = "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400";
  
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 flex gap-4 items-start hover:bg-white transition-all hover:shadow-md border border-pink-100">
      {/* Image */}
      <img
        src={event.image || defaultImage}
        alt={event.title}
        className="w-24 h-20 object-cover rounded-xl shadow-sm"
      />
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-gray-800 mb-1 truncate text-lg">
          {event.title || "Text"}
        </h3>
        {!compact && (
          <p className="text-xs text-gray-500 mb-1">small text</p>
        )}
        <p className="text-sm text-gray-600 truncate">
          {event.shortDescription || "describes"}
        </p>
      </div>
      
      {/* Rating Column */}
      <div className="flex flex-col items-end gap-1">
        <div className="flex items-center gap-1 bg-pink-50 px-3 py-1 rounded-full">
          <Star className="w-4 h-4 text-pink-500 fill-pink-500" />
          <span className="text-sm font-semibold text-gray-700">
            {event.rating || "3.6"}
          </span>
        </div>
        {!compact && (
          <>
            <span className="text-sm text-gray-500">{event.rating || "3.6"}</span>
            <span className="text-sm text-gray-500">{event.rating || "3.6"}</span>
          </>
        )}
      </div>
    </div>
  );
}

