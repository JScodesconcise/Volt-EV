package com.volt.store.order;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "orders")
public class Order {

    @Id
    private String id;

    private String userId;
    private String fName;
    private String lName;
    private String address;
    private int apt;
    private String city;
    private String province;
    private String postalCode;
    private String cardNumber;
    private String expiryDate;
    private int cvv;

    private List<String> vehicleNames;
    private LocalDateTime createdAt;

    // Getters
    public String getId() { return id; }
    public String getUserId() { return userId; }
    public String getfName() { return fName; }
    public String getlName() { return lName; }
    public String getAddress() { return address; }
    public int getApt() { return apt; }
    public String getCity() { return city; }
    public String getProvince() { return province; }
    public String getPostalCode() { return postalCode; }
    public String getCardNumber() { return cardNumber; }
    public String getExpiryDate() { return expiryDate; }
    public int getCvv() { return cvv; }
    public List<String> getVehicleNames() { return vehicleNames; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    // Setters
    public void setId(String id) { this.id = id; }
    public void setUserId(String userId) { this.userId = userId; }
    public void setfName(String fName) { this.fName = fName; }
    public void setlName(String lName) { this.lName = lName; }
    public void setAddress(String address) { this.address = address; }
    public void setApt(int apt) { this.apt = apt; }
    public void setCity(String city) { this.city = city; }
    public void setProvince(String province) { this.province = province; }
    public void setPostalCode(String postalCode) { this.postalCode = postalCode; }
    public void setCardNumber(String cardNumber) { this.cardNumber = cardNumber; }
    public void setExpiryDate(String expiryDate) { this.expiryDate = expiryDate; }
    public void setCvv(int cvv) { this.cvv = cvv; }
    public void setVehicleNames(List<String> vehicleNames) { this.vehicleNames = vehicleNames; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
