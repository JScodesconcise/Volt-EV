package com.volt.store.vehicles;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Service
public class VehicleService {

    VehicleRepository vehicleRepository;

    public VehicleService(VehicleRepository vehicleRepository){
        this.vehicleRepository = vehicleRepository;
    }

    public void addVehicle(Vehicle vehicle) {
        vehicleRepository.insert(vehicle);
    }

    public Page<Vehicle> getVehicles(int page, String sortBy, List<String> colours, int startYear,
                                     int endYear, int startPrice, int endPrice){
        if(sortBy.isEmpty() && colours.isEmpty()){
            return vehicleRepository.findByYearBetweenAndPriceBetween(startYear, endYear, startPrice, endPrice, PageRequest.of(page, 9, Sort.by("_id")));
        }else if (sortBy.isEmpty()){
            return vehicleRepository.findByColourInAndYearBetweenAndPriceBetween(colours, startYear, endYear, startPrice, endPrice, PageRequest.of(page, 9, Sort.by("_id")));
        }else if(colours.isEmpty()){
            return vehicleRepository.findByYearBetweenAndPriceBetween(startYear, endYear, startPrice, endPrice, PageRequest.of(page, 9, Sort.by(sortBy).descending()));
        }else{
            return vehicleRepository.findByColourInAndYearBetweenAndPriceBetween(colours, startYear, endYear, startPrice, endPrice, PageRequest.of(page, 9, Sort.by(sortBy)));
        }
    }
}
