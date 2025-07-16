package com.volt.store.vehicles;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
interface VehicleRepository extends MongoRepository<Vehicle, UUID> {
}
