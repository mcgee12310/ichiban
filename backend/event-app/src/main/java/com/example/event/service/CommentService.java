package com.example.event.service;

import com.example.event.dto.request.CommentRequest;
import com.example.event.dto.response.CommentResponse;
import com.example.event.model.EventComment;
import com.example.event.model.User;
import com.example.event.model.Event;
import com.example.event.repository.EventCommentRepository;
import com.example.event.repository.CommentSearchRepository;
import com.example.event.repository.UserRepository;
import com.example.event.repository.EventRepository;
import com.example.event.util.SecurityUtils; // Import your utility
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    private final EventCommentRepository commentRepository;
    private final CommentSearchRepository searchRepository;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;

    public CommentService(EventCommentRepository commentRepository, 
                          CommentSearchRepository searchRepository,
                          UserRepository userRepository,
                          EventRepository eventRepository) {
        this.commentRepository = commentRepository;
        this.searchRepository = searchRepository;
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
    }

    /**
     * Retrieves all comments for an event.
     * Automatically detects current user via SecurityUtils for 'isMyComment' flag.
     */
    public List<CommentResponse> getCommentsByEvent(Long eventId) {
        Long currentUserId = SecurityUtils.getCurrentUserId(); // Auto-detect from JWT
        return searchRepository.findCommentsByEventWithUser(eventId).stream()
                .map(entity -> mapToResponse(entity, currentUserId))
                .collect(Collectors.toList());
    }

    /**
     * Creates a new comment using identity from JWT.
     */
    @Transactional
    public CommentResponse createComment(Long eventId, CommentRequest request) {
        Long userId = SecurityUtils.getCurrentUserId();
        if (userId == null) {
            throw new RuntimeException("You must be logged in to post a comment.");
        }

        if (commentRepository.existsByEventIdAndUserId(eventId, userId)) {
            throw new RuntimeException("User has already commented on this event");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        EventComment comment = new EventComment();
        comment.setUser(user);
        comment.setEvent(event);
        comment.setComment(request.getContent());
        comment.setRating(request.getRating());
        comment.setCreatedAt(OffsetDateTime.now());

        EventComment savedComment = commentRepository.save(comment);
        return mapToResponse(savedComment, userId);
    }

    /**
     * Updates comment. Identity check happens internally via userId from JWT.
     */
    @Transactional
    public CommentResponse updateComment(Long commentId, CommentRequest request) {
        Long userId = SecurityUtils.getCurrentUserId();
        if (userId == null) throw new RuntimeException("Unauthorized");

        EventComment comment = commentRepository.findByIdAndUserId(commentId, userId)
                .orElseThrow(() -> new RuntimeException("Comment not found or unauthorized"));

        comment.setComment(request.getContent());
        comment.setRating(request.getRating());
        comment.setUpdatedAt(OffsetDateTime.now());

        return mapToResponse(commentRepository.save(comment), userId);
    }

    /**
     * Deletes comment. Only allowed if JWT userId matches comment owner.
     */
    @Transactional
    public void deleteComment(Long commentId) {
        Long userId = SecurityUtils.getCurrentUserId();
        if (userId == null) throw new RuntimeException("Unauthorized");

        EventComment comment = commentRepository.findByIdAndUserId(commentId, userId)
                .orElseThrow(() -> new RuntimeException("Comment not found or unauthorized"));
        
        commentRepository.delete(comment);
    }

    private CommentResponse mapToResponse(EventComment entity, Long currentUserId) {
        CommentResponse res = new CommentResponse();
        res.setId(entity.getId());
        res.setContent(entity.getComment());
        res.setRating(entity.getRating());
        res.setCreatedAt(entity.getCreatedAt());
        
        if (entity.getUser() != null) {
            res.setUserName(entity.getUser().getFullName()); 
            boolean isMine = currentUserId != null && entity.getUser().getId().equals(currentUserId);
            res.setIsMyComment(isMine);
        }
        
        return res;
    }
}