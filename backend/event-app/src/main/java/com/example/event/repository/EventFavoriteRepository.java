package com.example.event.repository;

import com.example.event.model.EventFavorite;
import com.example.event.model.EventFavoriteId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventFavoriteRepository extends JpaRepository<EventFavorite, EventFavoriteId> {

    boolean existsByUserIdAndEventId(Long userId, Long eventId);

}