package com.example.event.dto.response;


import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;

import java.util.List;

public class EventSearchResponse {

    private List<EventSearchResponseItem> events;
    private int page;
    private int size;
    private int totalPages;
    private long totalElements;

    // Getters and Setters
    public List<EventSearchResponseItem> getEvents() { return events; }
    public void setEvents(List<EventSearchResponseItem> events) { this.events = events; }

    public int getPage() { return page; }
    public void setPage(int page) { this.page = page; }

    public int getSize() { return size; }
    public void setSize(int size) { this.size = size; }

    public int getTotalPages() { return totalPages; }
    public void setTotalPages(int totalPages) { this.totalPages = totalPages; }

    public long getTotalElements() { return totalElements; }
    public void setTotalElements(long totalElements) { this.totalElements = totalElements; }
}
