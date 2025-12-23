package com.example.event.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.event.model.EventFavorite;
import com.example.event.model.EventFavoriteId;

@Repository
public interface EventFavoriteRepository extends JpaRepository<EventFavorite, EventFavoriteId> {

    boolean existsByUserIdAndEventId(Long userId, Long eventId);

    @Query("SELECT ef FROM EventFavorite ef JOIN FETCH ef.event WHERE ef.user.id = :userId")
    List<EventFavorite> findByUserId(@Param("userId") Long userId);

    void deleteByUserIdAndEventId(Long userId, Long eventId);

}