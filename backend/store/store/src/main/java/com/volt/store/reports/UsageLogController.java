package com.volt.store.reports;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/usage")
@CrossOrigin(origins = "http://localhost:3000")
public class UsageLogController {

    @Autowired
    private UsageLogService usageLogService;

    @PostMapping("/log")
    public void logPageVisit(@RequestBody Map<String, String> payload) {
        String page = payload.get("page");
        if (page != null && !page.isEmpty()) {
            usageLogService.logPageVisit(page);
        }
    }

    @GetMapping("/logs")
    public List<UsageLog> getLogs() {
        return usageLogService.getAllLogs();
    }

    @GetMapping("/report/chart")
    public List<Map<String, Object>> getPageVisitReport() {
        return usageLogService.getPageVisitCounts();
    }
}
