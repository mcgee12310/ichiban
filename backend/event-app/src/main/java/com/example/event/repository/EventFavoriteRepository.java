package com.example.event.repository;

import com.example.event.model.EventFavorite;
import com.example.event.model.EventFavoriteId;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

// NOTE: Ensure EventSummaryProjection interface is in this package.

@Repository
public interface EventFavoriteRepository extends JpaRepository<EventFavorite, EventFavoriteId> {

    // Cleanest way to check if a favorite exists for the Detail API
    @Query("SELECT COUNT(ef) > 0 FROM EventFavorite ef WHERE ef.id.userId = :userId AND ef.id.eventId = :eventId")
	static
    boolean isFavorite(@Param("userId") Long userId, @Param("eventId") Long eventId) {
		// TODO Auto-generated method stub
		return false;
	}
    boolean existsByUserIdAndEventId(Long userId, Long eventId);
    // Existing methods
    Optional<EventFavorite> findById_UserIdAndId_EventId(Long userId, Long eventId);
    void deleteById_UserIdAndId_EventId(Long userId, Long eventId);

    @Query("""
            SELECT 
                e.id AS id, 
                e.title AS title, 
                e.startDatetime AS startDatetime,
                el.city AS locationCity, 
                e.price AS price, 
                e.imageUrl AS mainImageUrl 
            FROM EventFavorite ef 
            JOIN ef.event e 
            JOIN e.location el 
            WHERE ef.id.userId = :userId 
            ORDER BY ef.createdAt DESC
        """)
    List<EventSummaryProjection> findFavoriteEventsSummaryByUserId(Long userId);
}