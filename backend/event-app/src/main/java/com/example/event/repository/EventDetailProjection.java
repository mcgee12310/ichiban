package com.example.event.repository;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

// This interface defines the exact fields expected from the query.
public interface EventDetailProjection {
    Long getId();
    String getTitle();
    String getDescription();
    BigDecimal getPrice();
    OffsetDateTime getStartDatetime();
    OffsetDateTime getEndDatetime();
    String getDistrict();
    String getAddress();
    String getCity();
    String getCategoryName();
}