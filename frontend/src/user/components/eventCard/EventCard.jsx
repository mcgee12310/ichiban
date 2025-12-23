import React from "react";
import { Home, Search, Heart, Calendar, Menu, MapPin, Tag, Clock, ChevronLeft, ChevronRight, Share2, Star, ArrowLeft, Navigation } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import styles from "./EventCard.module.css";
import { formatDate, formatPrice } from "../../../ultis/format";

export default function EventCard({ place, onCardClick, onRemoveFavorite, showRemoveButton = false }) {

  // Fallback image if no image is available
  const imageUrl = place.image || place.mainImageUrl || 'https://via.placeholder.com/200?text=No+Image';

  // Hàm tiện ích để giới hạn số ký tự
  const truncateDescription = (text, limit = 50) => {
    if (!text) return '';
    if (text.length <= limit) {
      return text;
    }
    return text.substring(0, limit) + '...';
  };

  // 2. useNavigate フックを初期化 (Khởi tạo hook useNavigate)
  const navigate = useNavigate();

  // 詳細ページへ移動する関数 (Hàm chuyển đến trang chi tiết)
  const handleDetailClick = () => {
    // Ví dụ: chuyển đến đường dẫn /events/:id
    // Sử dụng place.id để chuyển đến trang của sự kiện cụ thể.
    navigate(`/events/${place.id}`);
  };

  return (
    <div className={styles.item} onClick={onCardClick} style={{ cursor: 'pointer' }}>
      <img src={imageUrl} alt={place.title} className={styles.itemImage} />

      <div className={styles.itemContent}>
        <h4 className={styles.itemTitle}>{place.title}</h4>

        {/* ==== Categories ==== */}
        {place.categories?.length > 0 && (
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
        )}

        {/* Location - Đảm bảo căn trái */}
        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <MapPin size={18} className="text-red-500" />
          {place.district}, {place.city}
        </div>

        {/* Time - Sử dụng padding ngang p-0 hoặc px-0 để thẳng hàng với các div khác */}
        <div className="flex items-center gap-2 text-gray-600 mb-4 p-0 px-0">
          <Clock size={18} className="text-blue-500" />
          <span className="font-medium">{formatDate(place.startDate)} - {formatDate(place.endDate)}</span>
        </div>

        {/* MÔ TẢ: Áp dụng hàm truncateDescription tại đây */}
        <div className={styles.desc}>
          {truncateDescription(place.shortDescription, 50)}
        </div>
      </div>

      <div className={styles.rightBox}>
        {/* Rating */}
        {place.rating && <div className={styles.rating}>{place.rating}</div>}

        {/* Price */}
        <div className={styles.price}>
          {/* 翻訳: Miễn phí -> 無料 (Miễn phí) */}
          {place.price === 0 ? "無料" : formatPrice(place.price)}
        </div>

        {/* Remove from Favorites Button */}
        {/* {showRemoveButton && (
          <button
            className="bg-red-50 hover:bg-red-100 text-red-500 p-2 rounded transition-colors mb-2"
            onClick={handleRemove}
            disabled={isRemoving}
            title="Remove from favorites"
          >
            <Heart size={20} fill="currentColor" />
          </button>
        )} */}

        {/* Button */}
        <button onClick={handleDetailClick} className={styles.detailBtn}>
          {/* 翻訳: Chi tiết -> 詳細 (Chi tiết) */}
          詳細
        </button>
      </div>
    </div>
  );
}
