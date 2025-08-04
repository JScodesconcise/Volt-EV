package com.volt.store.chatbot;

import com.volt.store.vehicles.Vehicle;
import com.volt.store.vehicles.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/chatbot")
@CrossOrigin(origins = "*")
public class ChatbotController {

    @Autowired
    private VehicleRepository vehicleRepository;

    @PostMapping("/query")
    public ResponseEntity<Map<String, Object>> handleQuery(@RequestBody Map<String, String> request) {
        String userMessage = request.get("message");
        String response = generateResponse(userMessage);

        Map<String, Object> result = new HashMap<>();
        result.put("response", response);

        return ResponseEntity.ok(result);
    }

    private String generateResponse(String userMessage) {
        String lowerMessage = userMessage.toLowerCase();

        // Vehicle count
        if (lowerMessage.contains("how many") && (lowerMessage.contains("car") || lowerMessage.contains("vehicle") || lowerMessage.contains("stock"))) {
            long count = vehicleRepository.count();
            return "We currently have " + count + " electric vehicles in stock! You can browse our full inventory on the inventory page.";
        }

        // Price questions
        if (lowerMessage.contains("price") || lowerMessage.contains("cost") || lowerMessage.contains("expensive")) {
            List<Vehicle> vehicles = vehicleRepository.findAll();
            if (vehicles.isEmpty()) {
                return "We're currently updating our inventory. Please check back soon!";
            }

            double minPrice = vehicles.stream().mapToDouble(Vehicle::getPrice).min().orElse(0);
            double maxPrice = vehicles.stream().mapToDouble(Vehicle::getPrice).max().orElse(0);

            return String.format("Our electric vehicles start at $%.0f and go up to $%.0f. We also have a loan calculator to help you with financing!", minPrice, maxPrice);
        }

        // Range questions
        if (lowerMessage.contains("range") || lowerMessage.contains("mileage") || lowerMessage.contains("far")) {
            List<Vehicle> vehicles = vehicleRepository.findAll();
            if (vehicles.isEmpty()) {
                return "We're currently updating our inventory. Please check back soon!";
            }

            double maxRange = vehicles.stream().mapToDouble(Vehicle::getRange).max().orElse(0);

            return String.format("Our vehicles can travel up to %.0fkm on a single charge!", maxRange);
        }

        // Charging questions
        if (lowerMessage.contains("charge") || lowerMessage.contains("charging") || lowerMessage.contains("plug")) {
            return "Our vehicles support fast charging up to 250kW. You can charge from 10% to 80% in about 30 minutes.";
        }

        // Inventory/available vehicles
        if (lowerMessage.contains("available") || lowerMessage.contains("inventory") || lowerMessage.contains("show me")) {
            List<Vehicle> vehicles = vehicleRepository.findAll();
            if (vehicles.isEmpty()) {
                return "We're currently updating our inventory. Please check back soon!";
            }
            return "We have " + vehicles.size() + " amazing electric vehicles available! Head over to our inventory page to see all the details and compare them.";
        }

        // Support
        if (lowerMessage.contains("help") || lowerMessage.contains("support") || lowerMessage.contains("contact")) {
            return "I'm here to help! You can ask me about:\n" +
                    "Vehicle availability and pricing, " +
                    "Range and charging info, " +
                    "General questions about our EVs, " +
                    "For more detailed support, you can also visit our main page.";
        }

        // Default response
        return "I'd be happy to help you find the perfect electric vehicle!You can ask me about pricing, availability, features, or anything else about our cars. What interests you most?";
    }
}