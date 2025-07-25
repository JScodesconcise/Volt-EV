package com.volt.store.vehicles;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

public class Vehicle {
    @Id
    private UUID id;
    private String image;
    private int price;
    private String colour;
    private String drivetrain;
    private int year;
    private int range;
    private int horsepower;
    private int acceleration;
    private int battery;
    private int charging;
    private int efficiency;

    public String getColour() {
        return this.colour;
    }
    public String getDrivetrain(){
        return this.drivetrain;
    }

    public void setColour(String colour) {
        this.colour = colour;
    }
    public void setDrivetrain(String drivetrain){
        this.drivetrain = drivetrain;
    }
}
