package com.example.event.controller;

import com.example.event.dto.response.EventSummaryResponse;
import com.example.event.service.EventFavoriteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites") // Removed /users/{userId}
public class EventFavoriteController {

    private final EventFavoriteService favoriteService;

    public EventFavoriteController(EventFavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    /**
     * GET /api/favorites
     * Retrieves all events favorited by the CURRENT logged-in user.
     */
    @GetMapping
    public ResponseEntity<List<EventSummaryResponse>> getMyFavorites() {
        // Identity is now handled inside the service via SecurityUtils
        List<EventSummaryResponse> favorites = favoriteService.getFavoritesForCurrentUser();
        return ResponseEntity.ok(favorites);
    }

    /**
     * POST /api/favorites/{eventId}
     * Adds an event to the current user's favorites list.
     */
    @PostMapping("/{eventId}")
    public ResponseEntity<Void> addFavorite(@PathVariable Long eventId) {
        // userId is no longer passed in the URL
        boolean wasCreated = favoriteService.addFavorite(eventId);

        if (wasCreated) {
            return new ResponseEntity<>(HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    /**
     * DELETE /api/favorites/{eventId}
     * Removes an event from the current user's favorites list.
     */
    @DeleteMapping("/{eventId}")
    public ResponseEntity<Void> removeFavorite(@PathVariable Long eventId) {
        favoriteService.removeFavorite(eventId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}