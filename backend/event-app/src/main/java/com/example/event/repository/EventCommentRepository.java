package com.example.event.repository;

import com.example.event.model.EventComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventCommentRepository extends JpaRepository<EventComment, Long> {

    List<EventComment> findByEventId(Long eventId);

    List<EventComment> findByUserId(Long userId);

}