package com.volt.store.vehicle;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vehicles")
@CrossOrigin
public class VehicleController {

    private VehicleService vehicleService;

    public VehicleController(VehicleService vehicleService){
        this.vehicleService = vehicleService;
    }

    @PostMapping("/addvehicles")
    public ResponseEntity<Void> insertVehicle(@RequestBody Vehicle vehicle){
        Vehicle saved = vehicleService.insertVehicle(vehicle);
        return ResponseEntity.ok().build();
    }
}
