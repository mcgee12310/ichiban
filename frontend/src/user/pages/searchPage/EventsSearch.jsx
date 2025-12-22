import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams } from 'react-router-dom';
import styles from "./EventsSearch.module.css"; // CSS Module
import Header from "../../components/header/Header";
import SearchBox from "../../components/searchBox/SearchBox";
import EventCard from "../../components/eventCard/EventCard";
import Pagination from "../../components/pagination/Pagination";
import { getAllEvents } from "../../../services/EventService";

const userDistrict = "Hai Ba Trung"
const userCity = "Ha Noi"

/* ========================= MAIN PAGE ========================= */
export default function EventsSearch() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const [filters, setFilters] = useState({
    keyword: initialQuery,
    rangeOption: "all",
    sortOption: "none",
    maxPrice: 500000,
  });

  const [userLocation, setUserLocation] = useState({ city: "", district: "" });
  useEffect(() => {
    setUserLocation({
      city: "Ha Noi",
      district: "Hai Ba Trung"
    });
  }, []);

  const fetchData = async () => {
    const data = await getAllEvents();
    console.log("取得したイベントデータ:", data.events); // 翻訳: Fetched events data:
    setEvents(data.events);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = () => {
    // Có thể không cần làm gì nếu filters đã được set
    console.log("以下のフィルターで検索:", filters); // 翻訳: Tìm kiếm với filters:
  };

  const filtered = useMemo(() => {
    return events.filter((p) => {
      if (filters.keyword && !p.title.toLowerCase().includes(filters.keyword.toLowerCase()))
        return false;

      if (filters.rangeOption === "district") {
        if (p.city !== userLocation.city || p.district !== userLocation.district) return false;
      } else if (filters.rangeOption === "city") {
        if (p.city !== userLocation.city) return false;
      }

      if (filters.maxPrice != null && p.price > filters.maxPrice) return false;

      return true;
    }).sort((a, b) => {
      switch (filters.sortOption) {
        case "ratingAsc": return a.rating - b.rating;
        case "ratingDesc": return b.rating - a.rating;
        case "priceAsc": return a.price - b.price;
        case "priceDesc": return b.price - a.price;
        case "priceFreeFirst":
          return a.price === 0 && b.price !== 0
            ? -1
            : b.price === 0 && a.price !== 0
              ? 1
              : a.price - b.price;
        default: return 0;
      }
    });
  }, [filters, userLocation, events]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const paginated = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filtered.slice(start, end);
  }, [page, filtered]);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.wrapper}>
        <SearchBox
          filters={filters}
          setFilters={setFilters}
          onSearch={handleSearch}
        />
        <div className="mb-2 text-sm text-gray-600">
          現在の場所: {userLocation.city} - {userLocation.district}
        </div> {/* 翻訳: Địa điểm hiện tại: */}
        {paginated.map(place => (
          <EventCard key={place.id} place={place} />
        ))}

        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>
    </div>
  );
}
