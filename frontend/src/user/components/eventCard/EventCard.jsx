import React from "react";
import styles from "./EventCard.module.css";
import { PinIcon } from "lucide-react";
import { formatDate, formatPrice } from "../../../ultis/format";

export default function EventCard({ place }) {
  return (
    <div className={styles.item}>
      <img src={place.image} alt={place.name} className={styles.itemImage} />

      <div className={styles.itemContent}>
        <h4 className={styles.itemTitle}>{place.title}</h4>
        {/* ==== Categories ==== */}
        {place.categories?.length > 0 && (
          <div className={styles.categories}>
            {place.categories.map((cat, index) => (
              <span key={index} className={styles.categoryTag}>
                {cat}
              </span>
            ))}
          </div>
        )}
        
        <div className={styles.location}>
          📌 {place.district}, {place.city}
        </div>

        <div className={styles.date}>
          {formatDate(place.startDatetime)} - {formatDate(place.endDatetime)}
        </div>

        <div className={styles.desc}>{place.description}</div>
      </div>

      <div className={styles.rightBox}>
        {/* Rating */}
        <div className={styles.rating}>{place.rating}</div>

        {/* Price */}
        <div className={styles.price}>
          {place.price === 0 ? "Miễn phí" : formatPrice(place.price)}
        </div>

        {/* Button */}
        <button className={styles.detailBtn}>Chi tiết</button>
      </div>
    </div>
  );
}
