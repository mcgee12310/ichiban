package com.example.event.controller;

import com.example.event.dto.request.CommentRequest;
import com.example.event.dto.response.CommentResponse;
import com.example.event.service.CommentService;
import com.example.event.util.SecurityUtils; // Helper to get ID from JWT
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comment") // Grouped under /comments
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    /**
     * GET all comments for an event.
     * Identity is optional: if no token, isMyComment = false for all.
     */
    @GetMapping("/events/{eventId}")
    public ResponseEntity<List<CommentResponse>> getComments(@PathVariable Long eventId) {
        // userId is pulled inside the service via SecurityUtils
        List<CommentResponse> comments = commentService.getCommentsByEvent(eventId);
        return ResponseEntity.ok(comments);
    }

    /**
     * POST a new comment.
     * No more {uId} in path! JWT handles the identity.
     */
    @PostMapping("/events/{eventId}")
    public ResponseEntity<CommentResponse> createComment(
            @PathVariable Long eventId, 
            @Valid @RequestBody CommentRequest request) {
        CommentResponse response = commentService.createComment(eventId, request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /**
     * PUT (Update) an existing comment.
     */
    @PutMapping("/{commentId}")
    public ResponseEntity<CommentResponse> updateComment(
            @PathVariable Long commentId, 
            @Valid @RequestBody CommentRequest request) {
        CommentResponse response = commentService.updateComment(commentId, request);
        return ResponseEntity.ok(response);
    }

    /**
     * DELETE a comment.
     */
    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.noContent().build();
    }
}