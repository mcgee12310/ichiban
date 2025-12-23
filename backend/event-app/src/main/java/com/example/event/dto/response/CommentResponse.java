package com.example.event.dto.response;

import java.time.OffsetDateTime;

public class CommentResponse {
    private Long id;
    private String content;
    private Integer rating;
    private OffsetDateTime createdAt;
    private String userName;
    private Boolean isMyComment;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }

    public OffsetDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public Boolean getIsMyComment() { return isMyComment; }
    public void setIsMyComment(Boolean isMyComment) { this.isMyComment = isMyComment; }
}