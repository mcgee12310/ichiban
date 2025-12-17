package com.example.event.service;

import com.example.event.dto.response.*;
import com.example.event.model.Event;
import com.example.event.model.EventComment;
import com.example.event.model.EventImage;
import com.example.event.repository.EventCommentRepository;
import com.example.event.repository.EventImageRepository;
import com.example.event.repository.EventRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;
import java.util.concurrent.ThreadLocalRandom;
@Service
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;
    private final EventCommentRepository eventCommentRepository;
    private final EventImageRepository eventImageRepository;

    public EventServiceImpl(EventRepository eventRepository, EventCommentRepository eventCommentRepository, EventImageRepository eventImageRepository) {
        this.eventRepository = eventRepository;
        this.eventCommentRepository = eventCommentRepository;
        this.eventImageRepository = eventImageRepository;
    }

    @Override
    public EventSearchResponse searchEvents(int page, int size) {
        Page<Event> eventPage = eventRepository.findAll(PageRequest.of(page, size));

        List<EventSearchResponseItem> items = eventPage.getContent().stream()
            .map(this::mapToResponseItem)
            .collect(Collectors.toList());

        EventSearchResponse response = new EventSearchResponse();
        response.setEvents(items);
        response.setPage(eventPage.getNumber());
        response.setSize(eventPage.getSize());
        response.setTotalPages(eventPage.getTotalPages());
        response.setTotalElements(eventPage.getTotalElements());

        return response;
    }

    @Override
    public EventReviewResponse getEventReviews(Long eventId, String sortBy) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));

        Sort sort = resolveSort(sortBy);
        List<EventComment> comments = eventCommentRepository.findByEventId(event.getId(), sort);

        long totalReviews = comments.size();
        int totalStars = comments.stream()
                .mapToInt(comment -> comment.getRating() != null ? comment.getRating() : 0)
                .sum();

        double averageRating = totalReviews == 0
                ? 0.0
                : Math.round(((double) totalStars / totalReviews) * 10.0) / 10.0;

        List<EventReviewResponseItem> reviewItems = comments.stream()
                .map(this::mapToReviewItem)
                .collect(Collectors.toList());

        EventReviewResponse response = new EventReviewResponse();
        response.setEventId(event.getId());
        response.setAverageRating(averageRating);
        response.setTotalReviews(totalReviews);
        response.setReviews(reviewItems);

        return response;
    }

    @Override
    public EventDetailResponse getEventDetail(Long eventId) {

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Event not found"));

        EventDetailResponse res = new EventDetailResponse();

        res.setId(event.getId());
        res.setTitle(event.getTitle());
        res.setDescription(event.getDescription());

        // ===== CATEGORY (1 → List) =====
        if (event.getCategory() != null) {
            res.setCategories(List.of(event.getCategory().getName()));
        }

        // ===== LOCATION =====
        if (event.getLocation() != null) {
            res.setCity(event.getLocation().getCity());
            res.setDistrict(event.getLocation().getDistrict());
            res.setAddress(event.getLocation().getAddress());
        }

        // ===== TIME =====
        res.setStartDate(event.getStartDatetime());
        res.setEndDate(event.getEndDatetime());

        // ===== PRICE =====
        res.setPrice(event.getPrice());

        // ===== IMAGES =====
        if (event.getImages() != null) {
            res.setImages(
                    event.getImages().stream()
                            .map(EventImage::getImageUrl)
                            .toList()
            );
        }

        return res;
    }

    private EventSearchResponseItem mapToResponseItem(Event event) {
        EventSearchResponseItem item = new EventSearchResponseItem();
        item.setId(event.getId());
        item.setTitle(event.getTitle());
        item.setCategories(event.getCategory() != null ? List.of(event.getCategory().getName()) : List.of());
        item.setDistrict(event.getLocation() != null ? event.getLocation().getDistrict() : null);
        item.setCity(event.getLocation() != null ? event.getLocation().getCity() : null);
        item.setStartDate(event.getStartDatetime());
        item.setEndDate(event.getEndDatetime());
        item.setShortDescription(event.getDescription());
        item.setPrice(event.getPrice());
        // ✅ LẤY ẢNH ĐẦU TIÊN
        String thumbnail = null;
        if (event.getImages() != null && !event.getImages().isEmpty()) {
            thumbnail = event.getImages().get(0).getImageUrl();
        }
        item.setImage(thumbnail);

        // ✅ TÍNH AVERAGE RATING
        Double avg = eventCommentRepository
                .findAverageRatingByEventId(event.getId());
        item.setRating(avg != null ? avg : 0.0);
        return item;
    }

    private Sort resolveSort(String sortBy) {
        if ("rating".equalsIgnoreCase(sortBy) || "highest".equalsIgnoreCase(sortBy)) {
            return Sort.by(Sort.Direction.DESC, "rating")
                    .and(Sort.by(Sort.Direction.DESC, "createdAt"));
        }

        return Sort.by(Sort.Direction.DESC, "createdAt");
    }

    private EventReviewResponseItem mapToReviewItem(EventComment comment) {
        EventReviewResponseItem item = new EventReviewResponseItem();
        item.setId(comment.getId());
        item.setUserId(comment.getUser() != null ? comment.getUser().getId() : null);
        item.setUserName(comment.getUser() != null ? comment.getUser().getFullName() : null);
        item.setRating(comment.getRating());
        item.setComment(comment.getComment());
        item.setCreatedAt(comment.getCreatedAt());
        return item;
    }
}