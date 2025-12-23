package com.example.event.model;

import jakarta.persistence.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "event_id")
    private Long id;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToOne
    @JoinColumn(name = "category_id", foreignKey = @ForeignKey(name = "fk_events_category"))
    private EventCategory category;

    @ManyToOne
    @JoinColumn(name = "location_id", foreignKey = @ForeignKey(name = "fk_events_location"))
    private EventLocation location;

    @OneToMany(mappedBy = "event", fetch = FetchType.LAZY)
    private List<EventImage> images;

    @OneToMany(mappedBy = "event")
    private List<EventComment> reviews;

    @Column(name = "start_datetime", nullable = false)
    private OffsetDateTime startDatetime;

    @Column(name = "end_datetime", nullable = false)
    private OffsetDateTime endDatetime;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price = BigDecimal.ZERO;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(nullable = false, length = 20)
    private String status;

    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt = OffsetDateTime.now();

    @Column(name = "updated_at")
    private OffsetDateTime updatedAt;

    // --- FIX: ADDED NO-ARG CONSTRUCTOR (MANDATORY FOR JPA) ---
    public Event() {
    }

    // Custom Constructor
    public Event(Long id, String title, String description, String imageUrl, BigDecimal price) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = price;
    }

    // --- GETTERS AND SETTERS ---

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public EventCategory getCategory() { return category; }
    public void setCategory(EventCategory category) { this.category = category; }

    public EventLocation getLocation() { return location; }
    public void setLocation(EventLocation location) { this.location = location; }

    public OffsetDateTime getStartDatetime() { return startDatetime; }
    public void setStartDatetime(OffsetDateTime startDatetime) { this.startDatetime = startDatetime; }

    public OffsetDateTime getEndDatetime() { return endDatetime; }
    public void setEndDatetime(OffsetDateTime endDatetime) { this.endDatetime = endDatetime; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public OffsetDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }

    public OffsetDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(OffsetDateTime updatedAt) { this.updatedAt = updatedAt; }

    public List<EventImage> getImages() {
        return images;
    }
    public void setImages(List<EventImage> images) {
        this.images = images;
    }
}