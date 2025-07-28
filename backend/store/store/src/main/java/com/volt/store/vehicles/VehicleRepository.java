package com.volt.store.vehicles;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
interface VehicleRepository extends MongoRepository<Vehicle, String> {
    Page<Vehicle> findByColour(String colour, Pageable page);
}
