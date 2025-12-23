package com.example.event.repository;

import com.example.event.model.Event;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    // --- 1. Query for Core Event Details (Projection) ---
    // FIX: Using EventDetailProjection interface for type-safe mapping.
    // NOTE: Aliases (e.g., AS id) MUST match the getter names in the Projection interface.
    @Query("""
        SELECT e.id AS id, e.title AS title, e.description AS description, 
               e.price AS price, e.startDatetime AS startDatetime, e.endDatetime AS endDatetime, 
               el.district AS district, el.address AS address, el.city AS city, 
               ec.name AS categoryName 
        FROM Event e
        JOIN e.location el
        JOIN e.category ec
        WHERE e.id = :eventId
    """)
    Optional<EventDetailProjection> findEventDetailProjection(Long eventId);

    // --- 2. Query for Event Reviews/Comments (Object[] for simplicity) ---
    // Returns rows of [fullName (String), rating (Integer), comment (String), createdAt (OffsetDateTime)]
    @Query("""
            SELECT u.fullName, c.rating, c.comment, c.createdAt, u.id 
            FROM EventComment c
            JOIN c.user u
            WHERE c.event.id = :eventId
            ORDER BY c.createdAt DESC
        """)
    List<Object[]> findEventReviewsByEventId(Long eventId);

    // --- 3. Query for Event Images (List<String>) ---
    // Returns a list of image URLs, ordered by whether they are the main image.
    @Query("SELECT i.imageUrl FROM EventImage i WHERE i.event.id = :eventId ORDER BY i.isMain DESC, i.createdAt ASC")
    List<String> findEventImageUrlsByEventId(Long eventId);
}