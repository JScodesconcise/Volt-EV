package com.volt.store.vehicles;

import com.volt.store.config.S3Config;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.bind.Name;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class VehicleMapper {

    @Autowired
    protected FileService fileService;

    @Mapping(target="image", expression="java(src.getImage().getOriginalFilename())")
    public abstract Vehicle VechicleDTOtoVehicle(VehicleDTO src);

    @Mapping(target = "image", ignore = true)
    @Mapping(target = "imageKey", source = "image")
    public abstract VehicleDTO VehicleToDTO(Vehicle src);

    public VehicleDTO VehicleDTOattatchUrl(VehicleDTO src){
        src.setImageUrl(fileService.generateUrl(src.getImageKey()));
        return src;
    }
}
