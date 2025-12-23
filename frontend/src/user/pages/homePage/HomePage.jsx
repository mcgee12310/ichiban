import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { getAllEvents } from "../../../services/EventService";
import { getFavoriteEvents } from "../../../services/FavoriteService";
import { Search, Heart, TrendingUp, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { formatDate } from "../../../ultis/format";
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [favouriteEvents, setFavouriteEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [favoritesLoading, setFavoritesLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
    fetchFavorites();
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

  const fetchFavorites = async () => {
    try {
      setFavoritesLoading(true);
      const token = localStorage.getItem("token");
      if (token) {
        const favorites = await getFavoriteEvents();
        setFavouriteEvents(favorites || []);
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
      // Nếu không có token hoặc lỗi, để empty array
      setFavouriteEvents([]);
    } finally {
      setFavoritesLoading(false);
    }
  };

  // Filter events by search query
  const filteredEvents = events.filter(event =>
    event.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.district?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.city?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get random events for different sections (không dùng favouriteEvents từ slice nữa)
  const osusumeEvents = events.slice(3, 6); // 3 events instead of 2
  const hotTrendEvents = events.slice(6, 9); // 3 events

  // Handler khi nhấn nút Tìm kiếm
  const handleSearch = (e) => {
    e.preventDefault();
    // Chuyển sang trang search với query
    navigate(`/events/search?q=${encodeURIComponent(searchQuery)}`);
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
                <h2 className="text-2xl font-bold text-gray-800">イベント検索</h2>
              </div>
              <p className="text-gray-600 mb-6 text-sm">キーワードでイベントを検索できます</p>
              
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  type="text"
                  placeholder="イベント名、場所など..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-5 py-3 rounded-full border-2 border-pink-200 bg-white/90 focus:outline-none focus:border-pink-400 transition-all text-gray-700 placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-full font-medium hover:from-pink-500 hover:to-pink-600 transition-all shadow-md hover:shadow-lg"
                >
                  検索
                </button>
              </form>
            </div>

            {/* CALENDAR */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-pink-200">
              <CalendarComponent events={events} />
            </div>

            {/* FAVOURITE */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-pink-200">
              <div className="flex items-center gap-3 mb-6">
                <Heart className="w-6 h-6 text-pink-600 fill-pink-600" />
                <h2 className="text-2xl font-bold text-gray-800">お気に入り</h2>
              </div>
              
              <div className="space-y-4">
                {favoritesLoading ? (
                  <div className="text-center py-8 text-gray-500">読み込み中...</div>
                ) : favouriteEvents.length > 0 ? (
                  favouriteEvents.map((event, index) => (
                    <EventItemCard key={index} event={event} />
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">お気に入りがありません</div>
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
                <h2 className="text-2xl font-bold text-gray-800">おすすめ</h2>
              </div>
              
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-8 text-gray-500">読み込み中...</div>
                ) : osusumeEvents.length > 0 ? (
                  osusumeEvents.map((event, index) => (
                    <EventItemCard key={index} event={event} />
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">イベントがありません</div>
                )}
              </div>
            </div>

            {/* HOT TREND */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-pink-200">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-6 h-6 text-pink-600" />
                <h2 className="text-2xl font-bold text-gray-800">人気のイベント</h2>
              </div>
              
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-8 text-gray-500">読み込み中...</div>
                ) : hotTrendEvents.length > 0 ? (
                  hotTrendEvents.map((event, index) => (
                    <EventItemCard key={index} event={event} />
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">イベントがありません</div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Calendar Component
function CalendarComponent({ events = [] }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  
  // Count events for each day
  const getEventCountForDay = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => {
      if (!event.startDatetime) return false;
      const eventDate = new Date(event.startDatetime);
      const eventDateStr = `${eventDate.getFullYear()}-${String(eventDate.getMonth() + 1).padStart(2, '0')}-${String(eventDate.getDate()).padStart(2, '0')}`;
      return eventDateStr === dateStr;
    }).length;
  };
  
  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };
  
  const renderDays = () => {
    const days = [];
    
    // Previous month's days
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push(
        <div key={`prev-${i}`} className="text-center py-3 text-gray-300">
          {prevMonthDays - i}
        </div>
      );
    }
    
    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = 
        day === today.getDate() && 
        month === today.getMonth() && 
        year === today.getFullYear();
      
      const eventCount = getEventCountForDay(day);
      
      // Determine background color based on event count
      let bgClass = "hover:bg-pink-50 text-gray-700";
      if (isToday) {
        bgClass = "bg-gray-900 text-white font-semibold";
      } else if (eventCount >= 3) {
        bgClass = "bg-pink-400 text-white font-medium hover:bg-pink-500";
      } else if (eventCount === 2) {
        bgClass = "bg-pink-300 text-white font-medium hover:bg-pink-400";
      } else if (eventCount === 1) {
        bgClass = "bg-pink-200 text-gray-700 hover:bg-pink-300";
      }
      
      days.push(
        <button
          key={day}
          className={`text-center py-3 rounded-xl transition-all ${bgClass}`}
        >
          {day}
        </button>
      );
    }
    
    return days;
  };
  
  return (
    <div className="max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={previousMonth}
          className="p-2 hover:bg-pink-50 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
        
        <div className="flex gap-3">
          <select
            value={month}
            onChange={(e) => setCurrentDate(new Date(year, parseInt(e.target.value), 1))}
            className="px-4 py-2 border border-gray-300 rounded-xl bg-white text-gray-700 focus:outline-none focus:border-pink-400"
          >
            {monthNames.map((name, index) => (
              <option key={index} value={index}>
                {name}
              </option>
            ))}
          </select>
          
          <select
            value={year}
            onChange={(e) => setCurrentDate(new Date(parseInt(e.target.value), month, 1))}
            className="px-4 py-2 border border-gray-300 rounded-xl bg-white text-gray-700 focus:outline-none focus:border-pink-400"
          >
            {Array.from({ length: 10 }, (_, i) => year - 5 + i).map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-pink-50 rounded-lg transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>
      
      {/* Days of week */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1">
        {renderDays()}
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
          {event.title || "イベント名"}
        </h3>
        {!compact && (
          <p className="text-xs text-gray-500 mb-1">{event.city || "場所"} • {event.district || "地区"}</p>
        )}
        <p className="text-sm text-gray-600 truncate">
          {event.shortDescription || "イベントの説明"}
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

