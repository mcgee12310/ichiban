package com.example.event.service;

import com.example.event.dto.response.EventSearchResponse;

public interface EventService {
    EventSearchResponse searchEvents(int page, int size);
}