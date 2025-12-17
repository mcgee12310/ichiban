package com.example.event.repository;

import com.example.event.model.EventImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventImageRepository extends JpaRepository<EventImage, Long> {
    // Có thể thêm các phương thức tìm kiếm tùy chỉnh ở đây
    List<EventImage> findByEventId(Long eventId);
}