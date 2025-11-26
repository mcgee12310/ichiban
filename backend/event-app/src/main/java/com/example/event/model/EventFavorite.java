package com.example.event.model;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "event_favorites")
public class EventFavorite {

    @EmbeddedId
    private EventFavoriteId id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id", foreignKey = @ForeignKey(name = "fk_fav_user"))
    private User user;

    @ManyToOne
    @MapsId("eventId")
    @JoinColumn(name = "event_id", foreignKey = @ForeignKey(name = "fk_fav_event"))
    private Event event;

    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt = OffsetDateTime.now();

    // Constructors
    public EventFavorite() {}

    public EventFavorite(User user, Event event) {
        this.user = user;
        this.event = event;
        this.id = new EventFavoriteId(user.getId(), event.getId());
    }

    // Getters and Setters
    public EventFavoriteId getId() { return id; }
    public void setId(EventFavoriteId id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Event getEvent() { return event; }
    public void setEvent(Event event) { this.event = event; }

    public OffsetDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }
}