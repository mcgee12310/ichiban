package com.example.event.model;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "event_images")
public class EventImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        name = "event_id",
        nullable = false,
        foreignKey = @ForeignKey(name = "fk_image_event")
    )
    private Event event;

    @Column(name = "image_url", nullable = false, length = 500)
    private String imageUrl;

    @Column(name = "is_main")
    private Boolean isMain;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    /* =======================
       Constructors
       ======================= */

    public EventImage() {
    }

    public EventImage(Event event, String imageUrl, Boolean isMain, OffsetDateTime createdAt) {
        this.event = event;
        this.imageUrl = imageUrl;
        this.isMain = isMain;
        this.createdAt = createdAt;
    }

    /* =======================
       Getters & Setters
       ======================= */

    public Long getId() {
        return id;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Boolean getIsMain() {
        return isMain;
    }

    public void setIsMain(Boolean isMain) {
        this.isMain = isMain;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(OffsetDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
