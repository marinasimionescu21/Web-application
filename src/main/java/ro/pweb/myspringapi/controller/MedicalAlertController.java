package ro.pweb.myspringapi.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.pweb.myspringapi.entity.MedicalAlert;
import ro.pweb.myspringapi.service.MedicalAlertService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "api/v1/medical-alerts")
public class MedicalAlertController {

    private final MedicalAlertService medicalAlertService;
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    public MedicalAlertController(MedicalAlertService medicalAlertService) {
        this.medicalAlertService = medicalAlertService;
    }

    // Get all medical alerts
    @GetMapping("/all")
    public ResponseEntity<List<MedicalAlert>> getAllAlerts() {
        List<MedicalAlert> medicalAlertDTOs = medicalAlertService.getAllAlerts()
                .stream()
                .map(alert -> modelMapper.map(alert, MedicalAlert.class))
                .collect(Collectors.toList());

        return ResponseEntity.ok().body(medicalAlertDTOs);
    }

    @GetMapping("/resident/{residentCnp}")
    public ResponseEntity<List<MedicalAlert>> getMedicalAlertsByResident(@PathVariable Long residentCnp) {
        List<MedicalAlert> medicalAlerts = medicalAlertService.getMedicalAlertsByResidentCnp(residentCnp);
        return ResponseEntity.ok(medicalAlerts);
    }

    @GetMapping("/employee/{employeeCnp}")
    public ResponseEntity<List<MedicalAlert>> getMedicalAlertsByEmployee(@PathVariable Long employeeCnp) {
        List<MedicalAlert> medicalAlerts = medicalAlertService.getMedicalAlertsByEmployeeCnp(employeeCnp);
        return ResponseEntity.ok(medicalAlerts);
    }

    // Create a new medical alert
    @PostMapping("/create")
    public ResponseEntity<String> createAlert(@RequestBody MedicalAlert medicalAlert) {
        try {
            medicalAlertService.createMedicalAlert(medicalAlert);
            return ResponseEntity.status(HttpStatus.CREATED).body("Medical Alert created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating medical alert: " + e.getMessage());
        }
    }

    // Update an existing medical alert
    @PutMapping("/{id}")
    public ResponseEntity<MedicalAlert> updateAlert(@PathVariable Long id, @RequestBody MedicalAlert medicalAlert) {
        MedicalAlert updatedAlert = medicalAlertService.updateMedicalAlert(id, medicalAlert);
        if (updatedAlert == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(updatedAlert);
    }

    // Delete a medical alert
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAlert(@PathVariable Long id) {
        try {
            medicalAlertService.deleteMedicalAlert(id);
            return ResponseEntity.status(HttpStatus.OK).body("Medical Alert deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Medical Alert not found");
        }
    }
}
