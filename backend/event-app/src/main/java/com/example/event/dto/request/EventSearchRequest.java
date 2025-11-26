package com.example.event.dto.request;

public class EventSearchRequest {

    private int page;
    private int size;

    public EventSearchRequest() {
    }

    public EventSearchRequest(int page, int size) {
        this.page = page;
        this.size = size;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }
}