package com.volt.store.vehicles;

import com.fasterxml.jackson.annotation.JsonProperty;
import static com.fasterxml.jackson.annotation.JsonProperty.Access;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

public class VehicleDTO {
    @JsonProperty(access = Access.READ_ONLY)
    private String id;
    @JsonProperty(access = Access.WRITE_ONLY)
    private MultipartFile image;

    public void setBackgroundImage(MultipartFile backgroundImage) {
        this.backgroundImage = backgroundImage;
    }

    public MultipartFile getBackgroundImage() {
        return backgroundImage;
    }

    @JsonProperty(access = Access.WRITE_ONLY)
    private MultipartFile backgroundImage;
    private int price;
    private String title;
    private String colour;
    private String drivetrain;
    private int year;
    private int range;
    private int horsepower;
    private int acceleration;
    private int battery;
    private int charging;
    private int efficiency;
    @JsonProperty(access = Access.READ_ONLY)
    private String imageUrl;
    private String imageKey;
    @JsonProperty(access = Access.READ_ONLY)
    private String backgroundImageUrl;
    private String backgroundImageKey;
    private boolean deal;

    public String getBackgroundImageUrl() {
        return backgroundImageUrl;
    }

    public String getBackgroundImageKey() {
        return backgroundImageKey;
    }
    public void setBackgroundImageUrl(String backgroundImageUrl) {
        this.backgroundImageUrl = backgroundImageUrl;
    }

    public void setBackgroundImageKey(String backgroundImageKey) {
        this.backgroundImageKey = backgroundImageKey;
    }
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

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

    public String getImageUrl() {
        return imageUrl;
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

    public void setImageUrl(String imageUrl){
        this.imageUrl = imageUrl;
    }

    public String getImageKey(){
        return this.imageKey;
    }

    public void setImageKey(String imageKey){
        this.imageKey = imageKey;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public boolean isDeal() {
        return deal;
    }

    public void setDeal(boolean deal) {
        this.deal = deal;
    }
}
