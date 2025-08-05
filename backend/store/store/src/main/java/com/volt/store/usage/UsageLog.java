package com.volt.store.usage;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "usage_logs")
public class UsageLog {

    @Id
    private String id;
    private String page;
    private LocalDateTime timestamp;

    public UsageLog() {}

    public UsageLog(String page, LocalDateTime timestamp) {
        this.page = page;
        this.timestamp = timestamp;
    }

    public String getId() { return id; }
    public String getPage() { return page; }
    public void setPage(String page) { this.page = page; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
