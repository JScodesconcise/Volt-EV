package com.volt.store.vehicles;

import com.volt.store.vehicles.Vehicle;
import com.volt.store.vehicles.VehicleDTO;
import com.volt.store.vehicles.VehicleMapper;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.web.multipart.MultipartFile;

import java.nio.charset.StandardCharsets;
import java.util.UUID;

@SpringBootTest
public class VehicleMappingTest {

    VehicleMapper vehicleMapper = Mappers.getMapper(VehicleMapper.class);

    @Test
    public void VehicleDTOtoVehicleTest(){
        MockMultipartFile file = new MockMultipartFile("abc", new byte[0]);
        Vehicle testVehicle = new Vehicle();
        testVehicle.setAcceleration(0);
        testVehicle.setBattery(0);
        testVehicle.setCharging(0);
        testVehicle.setEfficiency(0);
        testVehicle.setHorsepower(0);
        testVehicle.setImage("abc");
        testVehicle.setPrice(0);
        testVehicle.setRange(0);
        testVehicle.setYear(0);
        testVehicle.setColour("blue");
        testVehicle.setDrivetrain("RWD");

        VehicleDTO testVehicleDTO = new VehicleDTO();
        testVehicleDTO.setAcceleration(0);
        testVehicleDTO.setBattery(0);
        testVehicleDTO.setCharging(0);
        testVehicleDTO.setEfficiency(0);
        testVehicleDTO.setHorsepower(0);
        testVehicleDTO.setImage(file);
        testVehicleDTO.setPrice(0);
        testVehicleDTO.setRange(0);
        testVehicleDTO.setYear(0);
        testVehicleDTO.setColour("blue");
        testVehicleDTO.setDrivetrain("RWD");

        Vehicle testVehicleMapped = vehicleMapper.VechicleDTOtoVehicle(testVehicleDTO);

        Assert.assertEquals(testVehicle.getAcceleration(), testVehicleMapped.getAcceleration());
        Assert.assertEquals(testVehicle.getImage(), testVehicleMapped.getImage());
        Assert.assertEquals(testVehicle.getColour(), testVehicleMapped.getColour());
        Assert.assertEquals(testVehicle.getPrice(), testVehicleMapped.getPrice());
        Assert.assertEquals(testVehicle.getDrivetrain(), testVehicleMapped.getDrivetrain());
        Assert.assertEquals(testVehicle.getCharging(), testVehicleMapped.getCharging());
        Assert.assertEquals(testVehicle.getBattery(), testVehicleMapped.getBattery());
        Assert.assertEquals(testVehicle.getEfficiency(), testVehicleMapped.getEfficiency());
        Assert.assertEquals(testVehicle.getHorsepower(), testVehicleMapped.getHorsepower());
        Assert.assertEquals(testVehicle.getYear(), testVehicleMapped.getYear());
        Assert.assertEquals(testVehicle.getRange(), testVehicleMapped.getRange());
    }
}
