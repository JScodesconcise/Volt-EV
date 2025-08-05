package com.volt.store.usage;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class UsageService {

    private final UsageLogRepository usageLogRepository;

    public UsageService(UsageLogRepository usageLogRepository) {
        this.usageLogRepository = usageLogRepository;
    }

    public void logPageVisit(String page) {
        UsageLog log = new UsageLog(page, LocalDateTime.now());
        usageLogRepository.save(log);
    }

    public List<Map<String, Object>> getUsageReport() {
        List<UsageLog> logs = usageLogRepository.findAll();

        Map<String, Long> pageVisitCounts = logs.stream()
                .collect(Collectors.groupingBy(UsageLog::getPage, Collectors.counting()));

        List<Map<String, Object>> result = new ArrayList<>();
        pageVisitCounts.forEach((page, count) -> {
            Map<String, Object> entry = new HashMap<>();
            entry.put("page", page);
            entry.put("visits", count);
            result.add(entry);
        });

        return result;
    }
}
