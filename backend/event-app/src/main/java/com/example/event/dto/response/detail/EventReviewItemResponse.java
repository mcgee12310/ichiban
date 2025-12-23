package com.example.event.dto.response.detail;

public class EventReviewItemResponse {
    private String userName;
    private int rating;
    private String date;    // This will hold the formatted date string
    private String comment; // This will hold the actual text
    private Boolean isMyComment;

    /* =======================
       Constructors
       ======================= */

    public EventReviewItemResponse() {
    }

    // Ensure this order matches your Service mapping logic exactly
    public EventReviewItemResponse(String userName, int rating, String date, String comment, Boolean isMyComment) {
        this.userName = userName;
        this.rating = rating;
        this.date = date;
        this.comment = comment;
        this.isMyComment = isMyComment;
    }

    /* =======================
       Getters & Setters
       ======================= */

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    // FIXED: Capitalized 'I' so Jackson can find the field properly
    public Boolean getIsMyComment() {
        return isMyComment;
    }

    public void setIsMyComment(Boolean isMyComment) {
        this.isMyComment = isMyComment;
    }
}