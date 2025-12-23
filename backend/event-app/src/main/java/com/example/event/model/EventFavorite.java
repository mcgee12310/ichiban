package com.example.event.model;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "event_favorites")
public class EventFavorite {

    @EmbeddedId
    private EventFavoriteId id;

    // ADDITION 1: Added FetchType.LAZY for performance
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "user_id", foreignKey = @ForeignKey(name = "fk_fav_user"))
    private User user;

    // ADDITION 2: Added FetchType.LAZY for performance
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("eventId")
    @JoinColumn(name = "event_id", foreignKey = @ForeignKey(name = "fk_fav_event"))
    private Event event;

    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt = OffsetDateTime.now();

    // Constructors
    public EventFavorite() {}

    // Original Constructor: This constructor is risky as it manually sets 'id' using entity IDs.
    // public EventFavorite(User user, Event event) {
    //     this.user = user;
    //     this.event = event;
    //     this.id = new EventFavoriteId(user.getId(), event.getId());
    // }

    // ADDITION 3: A safer, more explicit constructor for use in the Service layer (if preferred over the original).
    // This signature matches what the corrected EventFavoriteService needed.
    public EventFavorite(EventFavoriteId id, User user, Event event, OffsetDateTime createdAt) {
        this.id = id;
        this.user = user;
        this.event = event;
        this.createdAt = createdAt;
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