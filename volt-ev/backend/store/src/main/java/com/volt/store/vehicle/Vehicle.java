package com.volt.store.vehicle;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;

@Document(collection = "vehicle")
public class Vehicle {
    @Id
    private UUID id;
    private byte[] image;
    private String price;
    private String color;
    private String drivetrain;
    private int Year;
    private int range;
    private int horsepower;
    private int acceleration;
    private int battery;
    private int charging;
    private int efficiency;
}
