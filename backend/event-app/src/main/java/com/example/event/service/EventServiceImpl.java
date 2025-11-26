package com.example.event.service;

import com.example.event.dto.response.EventSearchResponse;
import com.example.event.dto.response.EventSearchResponseItem;
import com.example.event.model.Event;
import com.example.event.repository.EventRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.concurrent.ThreadLocalRandom;
@Service
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;

    public EventServiceImpl(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
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
}