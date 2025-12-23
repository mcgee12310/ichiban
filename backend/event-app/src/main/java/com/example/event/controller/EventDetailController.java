package com.example.event.controller;

import com.example.event.dto.response.detail.EventDetailResponse;
import com.example.event.service.EventDetailService;
import com.example.event.util.SecurityUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/events") // Base path for event details
public class EventDetailController {

    private final EventDetailService eventDetailService;

    public EventDetailController(EventDetailService eventDetailService) {
        this.eventDetailService = eventDetailService;
    }

    @GetMapping("/{eventId}")
    public ResponseEntity<EventDetailResponse> getEventDetails(@PathVariable Long eventId) {
        // ✅ This is where we get the user ID from the JWT
        Long currentUserId = SecurityUtils.getCurrentUserId();

        // ✅ This calls the service that checks 'isFavorite' in the database
        EventDetailResponse response = eventDetailService.getEventDetails(eventId, currentUserId);

        return ResponseEntity.ok(response);
    }
}