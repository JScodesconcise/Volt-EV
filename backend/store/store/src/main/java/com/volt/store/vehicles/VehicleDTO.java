package com.volt.store.vehicles;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

public class VehicleDTO {
    private MultipartFile image;
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

    public MultipartFile getImage(){
        return this.image;
    }

    public void setImage(MultipartFile image) {
        this.image = image;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public void setColour(String colour) {
        this.colour = colour;
    }

    public void setDrivetrain(String drivetrain) {
        this.drivetrain = drivetrain;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public void setRange(int range) {
        this.range = range;
    }

    public void setHorsepower(int horsepower) {
        this.horsepower = horsepower;
    }

    public int getPrice() {
        return price;
    }

    public String getColour() {
        return colour;
    }

    public String getDrivetrain() {
        return drivetrain;
    }

    public int getYear() {
        return year;
    }

    public int getRange() {
        return range;
    }

    public int getHorsepower() {
        return horsepower;
    }

    public int getAcceleration() {
        return acceleration;
    }

    public int getBattery() {
        return battery;
    }

    public int getCharging() {
        return charging;
    }

    public int getEfficiency() {
        return efficiency;
    }

    public void setAcceleration(int acceleration) {
        this.acceleration = acceleration;
    }

    public void setBattery(int battery) {
        this.battery = battery;
    }

    public void setCharging(int charging) {
        this.charging = charging;
    }

    public void setEfficiency(int efficiency) {
        this.efficiency = efficiency;
    }
}