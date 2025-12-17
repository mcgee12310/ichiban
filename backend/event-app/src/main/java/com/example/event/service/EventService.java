package com.example.event.service;

import com.example.event.dto.response.EventDetailResponse;
import com.example.event.dto.response.EventSearchResponse;
import com.example.event.dto.response.EventReviewResponse;

public interface EventService {

    EventSearchResponse searchEvents(int page, int size);

    EventReviewResponse getEventReviews(Long eventId, String sortBy);

    EventDetailResponse getEventDetail(Long eventId);
}
