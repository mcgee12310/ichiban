package com.example.event.controller;

import com.example.event.dto.request.EventSearchRequest;
import com.example.event.dto.response.EventSearchResponse;
import com.example.event.dto.response.EventReviewResponse;
import com.example.event.service.EventService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping("/search")
    public EventSearchResponse searchEvents(@RequestBody EventSearchRequest request) {
        return eventService.searchEvents(request.getPage(), request.getSize());
    }

    @GetMapping("/{eventId}/reviews")
    public EventReviewResponse getEventReviews(
            @PathVariable Long eventId,
            @RequestParam(name = "sort", defaultValue = "recent") String sort) {
        return eventService.getEventReviews(eventId, sort);
    }
}