package com.volt.store.vehicles;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface VehicleRepository extends MongoRepository<Vehicle, String> {
    Page<Vehicle> findByColour(String colour, Pageable page);
    Page<Vehicle> findByColourInAndYearBetweenAndPriceBetween(List<String> colours, int startYear, int endYear,
                                                              int startPrice, int endPrice, Pageable page);
    Page<Vehicle> findByYearBetweenAndPriceBetween(int startYear, int endYear, int startPrice, int endPrice, Pageable page);
}
