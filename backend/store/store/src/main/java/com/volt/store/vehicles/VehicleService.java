package com.volt.store.vehicles;

import org.springframework.data.domain.*;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class VehicleService {

    VehicleRepository vehicleRepository;
    private final MongoTemplate mongoTemplate;

    public VehicleService(VehicleRepository vehicleRepository, MongoTemplate mongoTemplate){
        this.vehicleRepository = vehicleRepository;
        this.mongoTemplate = mongoTemplate;
    }

    public void addVehicle(Vehicle vehicle) {
        vehicleRepository.insert(vehicle);
    }

    public void deleteVehicleById(String id) { vehicleRepository.deleteById(id); }

    public Optional<Vehicle> getVehicleById(String id) {
        return vehicleRepository.findById(id);
    }

    public void updateVehicle(Vehicle vehicle) {
        vehicleRepository.save(vehicle); // this will update if ID exists
    }

    public Page<Vehicle> getVehicles(
            int            page,
            String         sortBy,
            List<String>   colours,
            int            startYear,
            int            endYear,
            int            startPrice,
            int            endPrice,
            boolean        deal
    ) {
        List<Criteria> criteria = new ArrayList<>();

        criteria.add(Criteria.where("year").gte(startYear).lte(endYear));
        criteria.add(Criteria.where("price").gte(startPrice).lte(endPrice));

        if (!colours.isEmpty()) {
            criteria.add(Criteria.where("colour").in(colours));
        }

        if (deal) {
            criteria.add(Criteria.where("deal").is(true));
        }

        Query query = new Query(new Criteria().andOperator(criteria.toArray(new Criteria[0])));

        long total = mongoTemplate.count(query, Vehicle.class);

        Sort sort = sortBy.isEmpty()
                ? Sort.by("_id")
                : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, 9, sort);
        query.with(pageable);

        List<Vehicle> content = mongoTemplate.find(query, Vehicle.class);
        return new PageImpl<>(content, pageable, total);
    }
}
