package com.volt.store.vehicles;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/addvehicle")
public class VehicleController {

    private VehicleService vehicleService;
    private FileService fileService;

    public VehicleController(
            VehicleService vehicleService
            ,FileService fileService
    ){
        this.vehicleService = vehicleService;
        this.fileService = fileService;
    }

    @PostMapping("/")
    public ResponseEntity<Void> addVehicles(@RequestBody VehicleFile vehicle) throws IOException {
        fileService.uploadFile(vehicle.getImage());
        vehicle.getImage().getName();
        vehicleService.addVehicle();
        return ResponseEntity.ok().build();
    }

    @PostMapping("/getUrl")
    public ResponseEntity<String> getUrl(String filename){
        String resp = fileService.generateUrl(filename);
        return ResponseEntity.ok(resp);
    }
}
