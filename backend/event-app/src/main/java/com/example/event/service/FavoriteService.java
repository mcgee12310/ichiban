package com.example.event.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.event.dto.response.EventSearchResponseItem;
import com.example.event.model.Event;
import com.example.event.model.EventFavorite;
import com.example.event.model.User;
import com.example.event.repository.EventFavoriteRepository;
import com.example.event.repository.EventRepository;
import com.example.event.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class FavoriteService {

    @Autowired
    private EventFavoriteRepository eventFavoriteRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    // Lấy danh sách sự kiện yêu thích của user
    public List<EventSearchResponseItem> getFavoriteEvents(Long userId) {
        List<EventFavorite> favorites = eventFavoriteRepository.findByUserId(userId);
        return favorites.stream()
                .map(fav -> mapToEventResponse(fav.getEvent()))
                .collect(Collectors.toList());
    }

    // Thêm sự kiện vào yêu thích
    @Transactional
    public void addFavorite(Long userId, Long eventId) {
        if (eventFavoriteRepository.existsByUserIdAndEventId(userId, eventId)) {
            throw new RuntimeException("Event already in favorites");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        EventFavorite favorite = new EventFavorite(user, event);
        eventFavoriteRepository.save(favorite);
    }

    // Xóa sự kiện khỏi yêu thích
    @Transactional
    public void removeFavorite(Long userId, Long eventId) {
        if (!eventFavoriteRepository.existsByUserIdAndEventId(userId, eventId)) {
            throw new RuntimeException("Event not in favorites");
        }
        eventFavoriteRepository.deleteByUserIdAndEventId(userId, eventId);
    }

    // Kiểm tra xem sự kiện có trong yêu thích không
    public boolean isFavorite(Long userId, Long eventId) {
        return eventFavoriteRepository.existsByUserIdAndEventId(userId, eventId);
    }

    // Helper method to map Event to EventSearchResponseItem
    private EventSearchResponseItem mapToEventResponse(Event event) {
        EventSearchResponseItem response = new EventSearchResponseItem();
        response.setId(event.getId());
        response.setTitle(event.getTitle());
        response.setShortDescription(event.getDescription()); // Use description as shortDescription
        response.setStartDate(event.getStartDatetime());
        response.setEndDate(event.getEndDatetime());
        response.setPrice(event.getPrice());
        
        // Get first image if available
        if (event.getImages() != null && !event.getImages().isEmpty()) {
            response.setImage(event.getImages().get(0).getImageUrl());
        }
        
        if (event.getLocation() != null) {
            response.setDistrict(event.getLocation().getDistrict());
            response.setCity(event.getLocation().getCity());
        }
        
        if (event.getCategory() != null) {
            response.setCategories(List.of(event.getCategory().getName()));
        }
        
        return response;
    }
}
