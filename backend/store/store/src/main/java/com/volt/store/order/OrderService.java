package com.volt.store.order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

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
}
