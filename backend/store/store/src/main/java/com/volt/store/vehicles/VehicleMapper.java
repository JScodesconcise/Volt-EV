package com.volt.store.vehicles;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface VehicleMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target="image", expression="java(src.getImage().getOriginalFilename())")
    public Vehicle VechicleDTOtoVehicle(VehicleDTO src);
}
