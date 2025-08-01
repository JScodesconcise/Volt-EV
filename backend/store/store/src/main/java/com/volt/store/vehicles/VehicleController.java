package com.volt.store.vehicles;

import org.apache.tomcat.util.http.fileupload.impl.FileCountLimitExceededException;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/vehicle")
public class VehicleController {

    private VehicleService vehicleService;
    private FileService fileService;
    private VehicleMapperImpl vehicleMapper;

    public VehicleController(
            VehicleService vehicleService, FileService fileService, VehicleMapperImpl vehicleMapper
    ){
        this.vehicleService = vehicleService;
        this.fileService = fileService;
        this.vehicleMapper = vehicleMapper;
    }

    @PostMapping("/upload")
    public ResponseEntity<Void> addVehicles(@ModelAttribute VehicleDTO vehicle) throws IOException {
        fileService.uploadFile(vehicle.getImage());
        Vehicle res = vehicleMapper.VechicleDTOtoVehicle(vehicle);
        vehicleService.addVehicle(res);

        return ResponseEntity.ok().build();
    }
    @PostMapping("/getUrl")
    public ResponseEntity<String> getUrl(@RequestBody FileDTO filename){
        System.out.println(filename.getFileName());
        String resp = fileService.generateUrl(filename.getFileName());
        return ResponseEntity.ok(resp);
    }
    @GetMapping("/getVehicles")
    public ResponseEntity<List<VehicleDTO>> getVehicles(@RequestParam(defaultValue = "0") int page,
                                                        @RequestParam(defaultValue = "") String sortBy,
                                                        @RequestParam(defaultValue = "") Optional<List<String>> colours,
                                                        @RequestParam(defaultValue = "2000") int startYear,
                                                        @RequestParam(defaultValue = "2025") int endYear,
                                                        @RequestParam(defaultValue = "30000") int startPrice,
                                                        @RequestParam(defaultValue = "100000") int endPrice){


        List<String> colourList = colours.isEmpty() ? new ArrayList<>() : colours.get();

        List<VehicleDTO> res = vehicleService.getVehicles(page, sortBy, colourList, startYear, endYear, startPrice, endPrice)
                                .map(v -> vehicleMapper.VehicleToDTO(v))
                                .map(v -> vehicleMapper.VehicleDTOattatchUrl(v))
                                .getContent();

        return ResponseEntity.ok(res);
    }
}
