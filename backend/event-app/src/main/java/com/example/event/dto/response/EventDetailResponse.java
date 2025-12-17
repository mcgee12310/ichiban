package com.example.event.dto.response;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;

public class EventDetailResponse {

    private Long id;
    private String title;
    private String description;
    private List<String> categories;

    private String city;
    private String district;
    private String address;

    private OffsetDateTime startDate;
    private OffsetDateTime endDate;

    private Double price;

    private List<String> images;

    // ===== GETTERS =====
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public List<String> getCategories() {
        return categories;
    }

    public String getCity() {
        return city;
    }

    public String getDistrict() {
        return district;
    }

    public String getAddress() {
        return address;
    }

    public OffsetDateTime getStartDate() {
        return startDate;
    }

    public OffsetDateTime getEndDate() {
        return endDate;
    }

    public Double getPrice() {
        return price;
    }

    public List<String> getImages() {
        return images;
    }

    // ===== SETTERS =====
    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCategories(List<String> categories) {
        this.categories = categories;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setStartDate(OffsetDateTime startDate) {
        this.startDate = startDate;
    }

    public void setEndDate(OffsetDateTime endDate) {
        this.endDate = endDate;
    }

    public void setPrice(BigDecimal price) {
        this.price = price != null ? price.doubleValue() : 0.0;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }
}
