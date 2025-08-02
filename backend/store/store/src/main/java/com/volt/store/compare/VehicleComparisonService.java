package com.volt.store.compare;

import com.volt.store.vehicles.Vehicle;
import com.volt.store.vehicles.VehicleRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class VehicleComparisonService {

    private VehicleRepository vehicleRepository;

    public VehicleComparisonService(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    /**
     * Get two specific vehicles for comparison by their IDs
     */
    public List<Vehicle> getVehiclesForComparison(String vehicle1Id, String vehicle2Id) {
        System.out.println("Looking for vehicles with IDs: " + vehicle1Id + " and " + vehicle2Id);
        
        Optional<Vehicle> vehicle1Opt = vehicleRepository.findById(vehicle1Id);
        Optional<Vehicle> vehicle2Opt = vehicleRepository.findById(vehicle2Id);
        
        if (vehicle1Opt.isPresent() && vehicle2Opt.isPresent()) {
            System.out.println("Found both vehicles for comparison");
            return List.of(vehicle1Opt.get(), vehicle2Opt.get());
        } else {
            System.out.println("One or both vehicles not found");
            if (!vehicle1Opt.isPresent()) {
                System.out.println("Vehicle 1 not found: " + vehicle1Id);
            }
            if (!vehicle2Opt.isPresent()) {
                System.out.println("Vehicle 2 not found: " + vehicle2Id);
            }
        }
        
        return null;
    }

    /**
     * Get two random vehicles for comparison
     */
    public List<Vehicle> getRandomVehiclesForComparison() {
        System.out.println("Getting random vehicles for comparison...");
        
        List<Vehicle> allVehicles = vehicleRepository.findAll();
        System.out.println("Total vehicles in database: " + allVehicles.size());
        
        if (allVehicles.size() >= 2) {
            // Get first two vehicles for comparison
            System.out.println("Returning first two vehicles for comparison");
            return List.of(allVehicles.get(0), allVehicles.get(1));
        } else {
            System.out.println("Not enough vehicles in database for comparison");
        }
        
        return null;
    }

    /**
     * Get a single vehicle by ID
     */
    public Vehicle getVehicleById(String id) {
        System.out.println("Looking for vehicle with ID: " + id);
        Vehicle vehicle = vehicleRepository.findById(id).orElse(null);
        if (vehicle != null) {
            System.out.println("Found vehicle: " + vehicle.getColour() + " " + vehicle.getYear());
        } else {
            System.out.println("Vehicle not found with ID: " + id);
        }
        return vehicle;
    }

    /**
     * Get all vehicles for selection
     */
    public List<Vehicle> getAllVehicles() {
        System.out.println("Getting all vehicles from database...");
        List<Vehicle> vehicles = vehicleRepository.findAll();
        System.out.println("Retrieved " + vehicles.size() + " vehicles from database");
        return vehicles;
    }
} 