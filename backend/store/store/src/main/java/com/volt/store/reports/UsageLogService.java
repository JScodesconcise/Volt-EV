package com.volt.store.reports;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;

@Service
public class UsageLogService {

    @Autowired
    private UsageLogRepository usageLogRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public void logPageVisit(String page) {
        usageLogRepository.save(new UsageLog(page, Instant.now()));
    }

    public List<UsageLog> getAllLogs() {
        return usageLogRepository.findAll();
    }

    public List<Map<String, Object>> getPageVisitCounts() {
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.group("page").count().as("visits"),
                Aggregation.project("visits").and("page").previousOperation()
        );

        AggregationResults<Map> results = mongoTemplate.aggregate(aggregation, "usage_logs", Map.class);

        List<Map<String, Object>> mappedResults = new ArrayList<>();
        for (Map raw : results.getMappedResults()) {
            Map<String, Object> clean = new HashMap<>();
            clean.put("page", raw.get("page"));
            clean.put("visits", raw.get("visits"));
            mappedResults.add(clean);
        }

        return mappedResults;
    }
}
