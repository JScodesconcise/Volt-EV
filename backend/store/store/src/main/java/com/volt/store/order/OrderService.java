package com.volt.store.order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import org.bson.types.ObjectId;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.TextStyle;
import java.util.*;


@Service
public class OrderService {

    @Autowired
    OrderRepository orderRepository;
    ConcurrentHashMap<String, AtomicInteger> map = new ConcurrentHashMap<>();

    public Boolean validOrder(String userId){
        map.computeIfAbsent(userId, k -> {
            return new AtomicInteger(0);
        });
        int res = map.get(userId).incrementAndGet();

        res = res % 3;

        return res == 0 ? false : true;
    }

    public void placeOrder(Order order){
        orderRepository.insert(order);
        System.out.println("ABCDFSADF");
    }

    public Map<String, List<String>> getMonthlySalesReport() {
        List<Order> orders = orderRepository.findAll();
        Map<String, List<String>> report = new HashMap<>();

        for (Order order : orders) {
            // Extract the month from the MongoDB ObjectId timestamp
            ObjectId objectId = new ObjectId(order.getId());
            Instant instant = Instant.ofEpochSecond(objectId.getTimestamp());
            LocalDate date = instant.atZone(ZoneId.systemDefault()).toLocalDate();
            String month = date.getMonth().getDisplayName(TextStyle.FULL, Locale.ENGLISH);

            // Initialize if month doesn't exist
            report.computeIfAbsent(month, k -> new ArrayList<>());

            // Add vehicle names (skip if null)
            if (order.getVehicleNames() != null) {
                report.get(month).addAll(order.getVehicleNames());
            }
        }

        return report;
    }
}
