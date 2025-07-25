package com.volt.store.vehicles;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class VehicleService {

    VehicleRepository vehicleRepository;

    public VehicleService(VehicleRepository vehicleRepository){
        this.vehicleRepository = vehicleRepository;
    }

    public void addVehicle(Vehicle vehicle) {
        vehicleRepository.insert(vehicle);
    }

    public Page<Vehicle> getVehicles(int page, String sortBy, String color){
        if(sortBy.isEmpty() && color.isEmpty()){
            return vehicleRepository.findAll(PageRequest.of(page, 9, Sort.by("id")));
        }else if (sortBy.isEmpty()){
            return vehicleRepository.findByColour(color, PageRequest.of(page, 9, Sort.by("id")));
        }else{
            return vehicleRepository.findByColour(color, PageRequest.of(page, 9, Sort.by(sortBy)));
        }
    }
}
