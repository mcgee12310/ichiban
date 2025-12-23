package com.example.event.repository;

import com.example.event.model.EventComment;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CommentSearchRepository {

    @PersistenceContext
    private EntityManager entityManager;

    /**
     * Fetches comments for an event and joins with User in one query 
     * to make getting 'userName' very fast.
     */
    public List<EventComment> findCommentsByEventWithUser(Long eventId) {
        String jpql = "SELECT c FROM EventComment c JOIN FETCH c.user WHERE c.event.id = :eventId ORDER BY c.createdAt DESC";
        TypedQuery<EventComment> query = entityManager.createQuery(jpql, EventComment.class);
        query.setParameter("eventId", eventId);
        return query.getResultList();
    }
}