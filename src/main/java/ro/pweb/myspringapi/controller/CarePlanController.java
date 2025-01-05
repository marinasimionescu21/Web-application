package ro.pweb.myspringapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.pweb.myspringapi.dto.CarePlanDTO;
import ro.pweb.myspringapi.entity.CarePlan;
import ro.pweb.myspringapi.service.CarePlanService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "api/v1/careplans")
public class CarePlanController {

    @Autowired
    private CarePlanService carePlanService;

    // GET method to fetch all care plans
    @GetMapping("/all")
    public List<CarePlan> getAllCarePlans() {
        return carePlanService.getAllCarePlans();
    }

    // POST method to add a single care plan
    @PostMapping("/create")
    public ResponseEntity<?> createCarePlan(@RequestBody CarePlanDTO carePlanDTO) {
        try {
            CarePlan carePlan = carePlanService.addCarePlan(carePlanDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(carePlan);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    // POST method to add multiple care plans
    @PostMapping("/create-multiple")
    public ResponseEntity<?> createCarePlans(@RequestBody List<CarePlanDTO> carePlanDTOs) {
        try {
            List<CarePlan> carePlans = carePlanService.addMultipleCarePlans(carePlanDTOs);
            return ResponseEntity.status(HttpStatus.CREATED).body(carePlans);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    // Delete a care plan by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCarePlan(@PathVariable Long id) {
        carePlanService.deleteCarePlan(id);
        return ResponseEntity.noContent().build();
    }
}
