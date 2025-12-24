package com.example.event.service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.event.dto.response.EventSummaryResponse;
import com.example.event.exception.ResourceNotFoundException;
import com.example.event.model.Event;
import com.example.event.model.EventFavorite;
import com.example.event.model.EventFavoriteId; // Added
import com.example.event.model.User;
import com.example.event.repository.EventFavoriteRepository;
import com.example.event.repository.EventRepository;
import com.example.event.repository.UserRepository;
import com.example.event.util.SecurityUtils;

@Service
public class EventFavoriteService {

    private final EventFavoriteRepository favoriteRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public EventFavoriteService(
            EventFavoriteRepository favoriteRepository,
            EventRepository eventRepository,
            UserRepository userRepository) {
        this.favoriteRepository = favoriteRepository;
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    /**
     * Retrieves the favorites for the CURRENT logged-in user.
     */
    public List<EventSummaryResponse> getFavoritesForCurrentUser() {
        Long userId = SecurityUtils.getCurrentUserId();
        if (userId == null) {
            throw new RuntimeException("You must be logged in to view favorites.");
        }

        List<EventFavorite> favorites = favoriteRepository.findByUserIdWithEventAndImages(userId);

        return favorites.stream()
                .map(ef -> {
                    Event event = ef.getEvent();
                    // Get image from event_images table (same logic as osusume)
                    String imageUrl = null;
                    if (event.getImages() != null && !event.getImages().isEmpty()) {
                        imageUrl = event.getImages().get(0).getImageUrl();
                    }
                    
                    return new EventSummaryResponse(
                            event.getId(),
                            event.getTitle(),
                            event.getStartDatetime(),
                            event.getLocation() != null ? event.getLocation().getCity() : null,
                            imageUrl,
                            event.getPrice()
                    );
                })
                .collect(Collectors.toList());
    }

    /**
     * Adds an event to the CURRENT user's favorites list.
     */
    @Transactional
    public boolean addFavorite(Long eventId) {
        Long userId = SecurityUtils.getCurrentUserId();
        if (userId == null) {
            throw new RuntimeException("Unauthorized: Please login first.");
        }

        // 1. Validation: Ensure user and event exist
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));

        // 2. Check if already favorited
        if (favoriteRepository.findById_UserIdAndId_EventId(userId, eventId).isPresent()) {
            return false; // Already existed
        }

        // 3. Save new favorite
        EventFavoriteId id = new EventFavoriteId(userId, eventId);
        EventFavorite favorite = new EventFavorite(
                id,
                user,
                event,
                OffsetDateTime.now()
        );

        favoriteRepository.save(favorite);
        return true;
    }

    /**
     * Removes an event from the CURRENT user's favorites list.
     */
    @Transactional
    public void removeFavorite(Long eventId) {
        Long userId = SecurityUtils.getCurrentUserId();
        if (userId == null) {
            throw new RuntimeException("Unauthorized");
        }

        favoriteRepository.deleteById_UserIdAndId_EventId(userId, eventId);
    }
}
