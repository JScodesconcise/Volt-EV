package com.volt.store.vehicle;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
interface VehicleRepository extends MongoRepository<Vehicle, UUID> {

}
