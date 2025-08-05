package com.volt.store.usage;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/usage")
@CrossOrigin(origins = "http://localhost:3000")
public class UsageController {

    private final UsageService usageService;

    public UsageController(UsageService usageService) {
        this.usageService = usageService;
    }

    @PostMapping("/log")
    public void logVisit(@RequestBody Map<String, String> payload) {
        String page = payload.get("page");
        usageService.logPageVisit(page);
    }

    @GetMapping("/report/chart")
    public List<Map<String, Object>> getUsageReport() {
        return usageService.getUsageReport();
    }
}
