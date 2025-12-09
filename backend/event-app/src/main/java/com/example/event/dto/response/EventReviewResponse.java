package com.example.event.dto.response;

import java.util.List;

public class EventReviewResponse {

    private Long eventId;
    private double averageRating;
    private long totalReviews;
    private List<EventReviewResponseItem> reviews;

    public Long getEventId() {
        return eventId;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

    public double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(double averageRating) {
        this.averageRating = averageRating;
    }

    public long getTotalReviews() {
        return totalReviews;
    }

    public void setTotalReviews(long totalReviews) {
        this.totalReviews = totalReviews;
    }

    public List<EventReviewResponseItem> getReviews() {
        return reviews;
    }

    public void setReviews(List<EventReviewResponseItem> reviews) {
        this.reviews = reviews;
    }
}

