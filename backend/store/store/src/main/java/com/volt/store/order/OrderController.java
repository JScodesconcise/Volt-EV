package com.volt.store.order;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;


@RequestMapping("/order")
@RestController
@CrossOrigin(origins = "*")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/placeorder")
    public ResponseEntity<String> makeOrder(@RequestBody Order order){
        if( orderService.validOrder(order.getUserId()) ){
            orderService.placeOrder(order);
            return ResponseEntity.ok().build();
        }else{
            return ResponseEntity.status(402).build();
        }
    }

    @GetMapping("/sales-report")
    public ResponseEntity<Map<String, List<String>>> getSalesReport() {
        Map<String, List<String>> report = orderService.getMonthlySalesReport();
        return ResponseEntity.ok(report);
    }

}
