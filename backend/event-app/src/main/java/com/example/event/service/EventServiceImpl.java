package com.example.event.service;

import com.example.event.dto.response.EventSearchResponse;
import com.example.event.dto.response.EventSearchResponseItem;
import com.example.event.dto.response.EventReviewResponse;
import com.example.event.dto.response.EventReviewResponseItem;
import com.example.event.model.Event;
import com.example.event.model.EventComment;
import com.example.event.repository.EventCommentRepository;
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

    public EventServiceImpl(EventRepository eventRepository, EventCommentRepository eventCommentRepository) {
        this.eventRepository = eventRepository;
        this.eventCommentRepository = eventCommentRepository;
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
        double randomRating = Math.round(
                (ThreadLocalRandom.current().nextDouble(1.0, 5.0) * 10)
        ) / 10.0;

        item.setRating(randomRating);
        item.setImage(null);  // optional, add image URL field in Event if needed
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