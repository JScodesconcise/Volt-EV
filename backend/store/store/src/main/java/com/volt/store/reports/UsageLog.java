package com.volt.store.reports;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.Instant;

@Document(collection = "usage_logs")
public class UsageLog {
    @Id
    private String id;
    private String page;
    private Instant timestamp;

    public UsageLog() {}

    public UsageLog(String page, Instant timestamp) {
        this.page = page;
        this.timestamp = timestamp;
    }

    public String getId() { return id; }
    public String getPage() { return page; }
    public void setPage(String page) { this.page = page; }
    public Instant getTimestamp() { return timestamp; }
    public void setTimestamp(Instant timestamp) { this.timestamp = timestamp; }
}
