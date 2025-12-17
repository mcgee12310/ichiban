package com.example.event.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.OffsetDateTime;

// Entity EventImage (Ảnh Sự kiện)
@Entity
@Table(name = "event_images")
public class EventImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private Long imageId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_id", nullable = false)
    @JsonIgnore
    private Event event;

    @Column(name = "image_url", nullable = false, length = 500)
    private String imageUrl;

    @Column(name = "created_at", nullable = false, updatable = false)
    @CreationTimestamp // Tự động điền thời gian tạo
    private OffsetDateTime createdAt;

    // Constructors, Getters và Setters (Hãy thêm chúng)

    // Getters and Setters:
    public Long getImageId() { return imageId; }
    public void setImageId(Long imageId) { this.imageId = imageId; }

    public Event getEvent() { return event; }
    public void setEvent(Event event) { this.event = event; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public OffsetDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }
}