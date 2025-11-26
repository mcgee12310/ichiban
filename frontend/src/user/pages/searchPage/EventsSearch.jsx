import React, { useEffect, useState, useMemo } from "react";
import styles from "./EventsSearch.module.css"; // CSS Module
import Header from "../../components/header/Header";
import SearchBox from "../../components/searchBox/SearchBox";
import EventCard from "../../components/eventCard/EventCard";
import Pagination from "../../components/pagination/Pagination";
import { getAllEvents } from "../../../services/EventService";

const userDistrict = "Hai Ba Trung"
const userCity = "Ha Noi"

const SAMPLE = [
  {
    id: 1,
    title: "Công viên Thống Nhất",
    categories: ["Công viên", "Thiên nhiên"],
    district: "Hoang Mai",
    city: "Ha Noi",
    description: "Công viên rộng, nhiều cây xanh, phù hợp cho gia đình.",
    startDatetime: "2024-06-01T08:00:00",
    endDatetime: "2024-06-01T18:00:00",
    rating: 4.5,
    price: 0,
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80",
  },
  {
    id: 2,
    title: "Quán cà phê Mộc",
    district: "Hai Ba Trung",
    city: "Ha Noi",
    description: "Quán nhỏ xinh, cà phê ngon, có không gian đọc sách.",
        startDatetime: "2024-06-01T08:00:00",
    endDatetime: "2024-06-01T18:00:00",

    rating: 4.2,
    price: 50000,
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
  },
  {
    id: 3,
    title: "Bảo tàng Nghệ thuật",
    district: "Quan 2",
    city: "HCM",
    description: "Triển lãm nghệ thuật đương đại.",
        startDatetime: "2024-06-01T08:00:00",
    endDatetime: "2024-06-01T18:00:00",

    rating: 4.8,
    price: 0,
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
  },
  {
    id: 4,
    title: "Nhà hàng Biển Xanh",
    district: "Quan 1",
    city: "HCM",
    description: "Nhà hàng hải sản tươi sống, view biển đẹp.",
        startDatetime: "2024-06-01T08:00:00",
    endDatetime: "2024-06-01T18:00:00",

    rating: 4.3,
    price: 200000,
    image:
      "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&q=80",
  },
];

/* ========================= MAIN PAGE ========================= */
export default function EventsSearch() {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(events.length / itemsPerPage);
  const [filters, setFilters] = useState({
    keyword: "",
    sortOption: "none",
    maxPrice: null, // hoặc 0, hoặc undefined tùy mặc định
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
    console.log("Fetched events data:", data.events);
    setEvents(data.events);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = () => {
    // Có thể không cần làm gì nếu filters đã được set
    console.log("Tìm kiếm với filters:", filters);
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
  }, [filters, userLocation]);

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
          Địa điểm hiện tại: {userLocation.city} - {userLocation.district}
        </div>
        {paginated.map(place => (
          <EventCard key={place.id} place={place} />
        ))}

        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>
    </div>
  );
}
