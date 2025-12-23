package com.example.event.dto.response;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

/**
 * DTO representing a simplified view of an event, suitable for listing purposes 
 * (e.g., a "My Favorites" list).
 */
public class EventSummaryResponse {
    
    private final Long id;
    private final String title;
    private final OffsetDateTime startDatetime;
    private final String locationCity;
    private final String mainImageUrl;
    private final BigDecimal price;

    // Manual Constructor (No Lombok)
    public EventSummaryResponse(
            Long id, String title, OffsetDateTime startDatetime, 
            String locationCity, String mainImageUrl, BigDecimal price) {
        this.id = id;
        this.title = title;
        this.startDatetime = startDatetime;
        this.locationCity = locationCity;
        this.mainImageUrl = mainImageUrl;
        this.price = price;
    }

    // Manual Getters (Required for JSON serialization)
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public OffsetDateTime getStartDatetime() { return startDatetime; }
    public String getLocationCity() { return locationCity; }
    public String getMainImageUrl() { return mainImageUrl; }
    public BigDecimal getPrice() { return price; }
}