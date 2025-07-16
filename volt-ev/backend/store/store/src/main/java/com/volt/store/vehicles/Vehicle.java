package com.volt.store.vehicles;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Document("collection = Vehicle")
public class Vehicle {
    private MultipartFile image;
    private int price;
    private String colour;
    private String driveTrain;
    private int year;
    private int range;
    private int horsepower;
    private int acceleration;
    private int battery;
    private int charging;
    private int efficiency;
}
