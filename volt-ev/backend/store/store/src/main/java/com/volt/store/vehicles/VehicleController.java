package com.volt.store.vehicles;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/addvehicle")
public class VehicleController {

    public VehicleService vehicleService;

    public VehicleController(VehicleService vehicleService){
        this.vehicleService = vehicleService;
    }
    @PostMapping("/")
    public ResponseEntity<Void> addVehicles(@RequestBody Vehicle vehicle){
        System.out.println("hello");
        vehicleService.addVehicle(vehicle);
        return ResponseEntity.ok().build();
    }
}
