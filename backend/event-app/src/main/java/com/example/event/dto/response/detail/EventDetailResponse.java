package com.example.event.dto.response.detail;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;

public class EventDetailResponse {

    private Long id;
    private String title;

    // Location Data
    private String locationSummary; // e.g., "District 1 • Hanoi • Price $10.00"
    private String address;         // e.g., "Addr 1, District 1, Hanoi"
    // Core Event Data
    private String description;
    private BigDecimal price;
    private OffsetDateTime startDatetime;
    private OffsetDateTime endDatetime;
    private Boolean isFavorite;
    // Related Data
    private List<String> categories; // Based on category name
    private List<String> images;     // List of image URLs
    private List<EventReviewItemResponse> reviews;

    /* =======================
       Constructors
       ======================= */

    public EventDetailResponse() {
    }

    public EventDetailResponse(
            Long id,
            String title,
            String locationSummary,
            String address,
            String description,
            BigDecimal price,
            OffsetDateTime startDatetime,
            OffsetDateTime endDatetime,
            Boolean isFavorite,
            List<String> categories,
            List<String> images,
            List<EventReviewItemResponse> reviews
    ) {
        this.id = id;
        this.title = title;
        this.locationSummary = locationSummary;
        this.address = address;
        this.description = description;
        this.price = price;
        this.startDatetime = startDatetime;
        this.endDatetime = endDatetime;
        this.isFavorite=isFavorite;
        this.categories = categories;
        this.images = images;
        this.reviews = reviews;
    }

    /* =======================
       Getters & Setters
       ======================= */

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLocationSummary() {
        return locationSummary;
    }

    public void setLocationSummary(String locationSummary) {
        this.locationSummary = locationSummary;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public OffsetDateTime getStartDatetime() {
        return startDatetime;
    }

    public void setStartDatetime(OffsetDateTime startDatetime) {
        this.startDatetime = startDatetime;
    }

    public OffsetDateTime getEndDatetime() {
        return endDatetime;
    }

    public void setEndDatetime(OffsetDateTime endDatetime) {
        this.endDatetime = endDatetime;
    }

    public List<String> getCategories() {
        return categories;
    }

    public void setCategories(List<String> categories) {
        this.categories = categories;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public List<EventReviewItemResponse> getReviews() {
        return reviews;
    }

    public void setReviews(List<EventReviewItemResponse> reviews) {
        this.reviews = reviews;
    }

	public Boolean getIsFavorite() {
		return isFavorite;
	}

	public void setIsFavorite(Boolean isFavorite) {
		this.isFavorite = isFavorite;
	}
}