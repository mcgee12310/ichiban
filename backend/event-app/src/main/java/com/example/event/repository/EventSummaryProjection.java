package com.example.event.repository;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

/**
 * Projection for retrieving the required fields for the EventSummaryResponse.
 */
public interface EventSummaryProjection {
    Long getId();
    String getTitle();
    OffsetDateTime getStartDatetime();
    String getLocationCity(); // maps to el.city
    String getMainImageUrl(); // maps to i.imageUrl
    BigDecimal getPrice();
}