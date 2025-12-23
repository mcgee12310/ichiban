package com.example.event.service;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.event.dto.response.detail.EventDetailResponse;
import com.example.event.dto.response.detail.EventReviewItemResponse;
import com.example.event.exception.ResourceNotFoundException;
import com.example.event.repository.EventDetailProjection;
import com.example.event.repository.EventFavoriteRepository;
import com.example.event.repository.EventRepository;

@Service
public class EventDetailService {

    private final EventRepository eventRepository;
    private final EventFavoriteRepository favoriteRepository;

    public EventDetailService(EventRepository eventRepository, EventFavoriteRepository favoriteRepository) {
        this.eventRepository = eventRepository;
        this.favoriteRepository = favoriteRepository;
    }
    
    private static final DateTimeFormatter REVIEW_DATE_FORMATTER = 
        DateTimeFormatter.ofPattern("yyyy/MM/dd").withZone(ZoneId.of("Asia/Ho_Chi_Minh"));

    /**
     * Fetches full event details including favorite status for a specific user.
     * @param eventId The ID of the event
     * @param currentUserId The ID of the logged-in user (null if guest)
     */
    public EventDetailResponse getEventDetails(Long eventId, Long currentUserId) {
        
        // 1. Fetch Core Event Details via Projection
        EventDetailProjection coreData = eventRepository.findEventDetailProjection(eventId)
            .orElseThrow(() -> new ResourceNotFoundException("Event not found with ID: " + eventId));
            
        // 2. Map Core Data Fields
        Long id = coreData.getId();
        String title = coreData.getTitle();
        String description = coreData.getDescription();
        BigDecimal price = coreData.getPrice();
        OffsetDateTime startDatetime = coreData.getStartDatetime();
        OffsetDateTime endDatetime = coreData.getEndDatetime();
        String categoryName = coreData.getCategoryName();
        String district = coreData.getDistrict();
        String address = coreData.getAddress();
        String city = coreData.getCity();
        
        // Formulate readable strings for the Frontend
        String locationSummary = String.format("%s • %s • Price $%s", district, city, price.toString());
        String fullAddress = String.format("%s, %s, %s", address, district, city);

        // 3. CHECK FAVORITE STATUS (The Fix)
        // We use the instance 'favoriteRepository' and the standard JPA exists method
        boolean isFavorite = false;
        if (currentUserId != null) {
            // FIX: Make sure you use 'favoriteRepository' (the instance) 
            // and NOT 'EventFavoriteRepository' (the class name)
            isFavorite = favoriteRepository.existsByUserIdAndEventId(currentUserId, id);
            
            // DEBUG: Add this line to see what's happening in your console
            System.out.println("DEBUG: User " + currentUserId + " | Event " + id + " | isFavorite: " + isFavorite);
        }

        // 4. Fetch and Map Reviews with Identity Logic
        List<Object[]> reviewObjects = eventRepository.findEventReviewsByEventId(eventId);
        List<EventReviewItemResponse> reviews = reviewObjects.stream()
            .map(row -> {
                String userName = (String) row[0];
                Integer rating = (Integer) row[1];
                String commentText = (String) row[2];
                OffsetDateTime createdAt = (OffsetDateTime) row[3];
                Long authorId = (Long) row[4];

                // Determine if this review belongs to the person currently viewing the page
                Boolean isMyComment = (currentUserId != null) && currentUserId.equals(authorId);

                return new EventReviewItemResponse(
                    userName, 
                    rating, 
                    REVIEW_DATE_FORMATTER.format(createdAt), 
                    commentText, 
                    isMyComment
                );
            })
            .collect(Collectors.toList());

        // 5. Fetch Image URLs
        List<String> images = eventRepository.findEventImageUrlsByEventId(eventId);
        
        // 6. Return the unified DTO
        return new EventDetailResponse(
            id, 
            title, 
            locationSummary, 
            fullAddress, 
            description, 
            price, 
            startDatetime, 
            endDatetime, 
            isFavorite, // ✅ Now correctly set from the database check
            List.of(categoryName != null ? categoryName : "General"),
            images, 
            reviews
        );
    }
}