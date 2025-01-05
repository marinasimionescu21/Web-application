package ro.pweb.myspringapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.pweb.myspringapi.dto.CarePlanDTO;
import ro.pweb.myspringapi.entity.CarePlan;
import ro.pweb.myspringapi.entity.Employee;
import ro.pweb.myspringapi.entity.Resident;
import ro.pweb.myspringapi.repository.CarePlanRepository;
import ro.pweb.myspringapi.repository.EmployeeRepository;
import ro.pweb.myspringapi.repository.ResidentRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CarePlanService {

    @Autowired
    private CarePlanRepository carePlanRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private ResidentRepository residentRepository;

    // Fetch all care plans
    public List<CarePlan> getAllCarePlans() {
        return carePlanRepository.findAll();
    }

    // Add a single care plan
    public CarePlan addCarePlan(CarePlanDTO carePlanDTO) {
        Employee employee = employeeRepository.findById(carePlanDTO.getId_emp())
                .orElseThrow(() -> new RuntimeException("Employee not found with ID: " + carePlanDTO.getId_emp()));

        Resident resident = residentRepository.findById(carePlanDTO.getId_res())
                .orElseThrow(() -> new RuntimeException("Resident not found with ID: " + carePlanDTO.getId_res()));

        CarePlan carePlan = CarePlan.builder()
                .employee(employee)
                .resident(resident)
                .objectives(carePlanDTO.getObjectives())
                .start_date(carePlanDTO.getStart_date())
                .build();

        // Don't manually set id_plan; let the database handle it
        return carePlanRepository.save(carePlan);
    }

    // Delete a care plan by ID
    public void deleteCarePlan(Long id) {
        carePlanRepository.deleteById(id);
    }

    // Add multiple care plans
    public List<CarePlan> addMultipleCarePlans(List<CarePlanDTO> carePlanDTOs) {
        return carePlanDTOs.stream().map(this::addCarePlan).collect(Collectors.toList());
    }
}
