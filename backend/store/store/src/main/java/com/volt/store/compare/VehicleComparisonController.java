package com.volt.store.compare;

import com.volt.store.vehicles.Vehicle;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/vehicle/compare")
public class VehicleComparisonController {

    private VehicleComparisonService vehicleComparisonService;

    public VehicleComparisonController(VehicleComparisonService vehicleComparisonService) {
        this.vehicleComparisonService = vehicleComparisonService;
    }

    /**
     * Compare two specific vehicles by their IDs
     */
    @GetMapping
    public ResponseEntity<List<Vehicle>> compareVehicles(
            @RequestParam(required = false) String vehicle1Id,
            @RequestParam(required = false) String vehicle2Id) {
        
        List<Vehicle> vehicles;
        
        if (vehicle1Id != null && vehicle2Id != null) {
            // Compare specific vehicles
            vehicles = vehicleComparisonService.getVehiclesForComparison(vehicle1Id, vehicle2Id);
        } else {
            // Get random vehicles for comparison
            vehicles = vehicleComparisonService.getRandomVehiclesForComparison();
        }
        
        if (vehicles != null) {
            return ResponseEntity.ok(vehicles);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Compare specific vehicles using path parameters
     */
    @GetMapping("/{vehicle1Id}/{vehicle2Id}")
    public ResponseEntity<List<Vehicle>> compareSpecificVehicles(
            @PathVariable String vehicle1Id,
            @PathVariable String vehicle2Id) {
        
        List<Vehicle> vehicles = vehicleComparisonService.getVehiclesForComparison(vehicle1Id, vehicle2Id);
        
        if (vehicles != null) {
            return ResponseEntity.ok(vehicles);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Get all vehicles for selection in comparison page
     */
    @GetMapping("/vehicles")
    public ResponseEntity<List<Vehicle>> getAllVehiclesForComparison() {
        List<Vehicle> vehicles = vehicleComparisonService.getAllVehicles();
        return ResponseEntity.ok(vehicles);
    }

    /**
     * Get a single vehicle by ID
     */
    @GetMapping("/vehicle/{id}")
    public ResponseEntity<Vehicle> getVehicleById(@PathVariable String id) {
        Vehicle vehicle = vehicleComparisonService.getVehicleById(id);
        
        if (vehicle != null) {
            return ResponseEntity.ok(vehicle);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
} 