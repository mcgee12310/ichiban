package com.example.event.repository;

import com.example.event.model.EventComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventCommentRepository extends JpaRepository<EventComment, Long> {

    List<EventComment> findByEventId(Long eventId);

    List<EventComment> findByEventId(Long eventId, Sort sort);

    List<EventComment> findByUserId(Long userId);

    // Efficient check for the "One comment per user" rule
    boolean existsByEventIdAndUserId(Long eventId, Long userId);
    
    // Used for PUT and DELETE to ensure the comment belongs to the user
    Optional<EventComment> findByIdAndUserId(Long id, Long userId);

    @Query("""
        SELECT AVG(r.rating)
        FROM EventComment r
        WHERE r.event.id = :eventId
    """)
    Double findAverageRatingByEventId(Long eventId);
}
