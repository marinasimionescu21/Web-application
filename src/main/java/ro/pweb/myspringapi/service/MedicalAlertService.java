package ro.pweb.myspringapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.pweb.myspringapi.entity.MedicalAlert;
import ro.pweb.myspringapi.entity.Resident;
import ro.pweb.myspringapi.entity.Employee;
import ro.pweb.myspringapi.repository.MedicalAlertRepository;
import ro.pweb.myspringapi.repository.ResidentRepository;
import ro.pweb.myspringapi.repository.EmployeeRepository;

import java.util.List;
import java.util.Optional;

@Service
public class MedicalAlertService {

    private final MedicalAlertRepository medicalAlertRepository;
    private final ResidentRepository residentRepository;
    private final EmployeeRepository employeeRepository;

    @Autowired
    public MedicalAlertService(MedicalAlertRepository medicalAlertRepository, ResidentRepository residentRepository, EmployeeRepository employeeRepository) {
        this.medicalAlertRepository = medicalAlertRepository;
        this.residentRepository = residentRepository;
        this.employeeRepository = employeeRepository;
    }

    // Get all medical alerts
    public List<MedicalAlert> getAllAlerts() {
        return medicalAlertRepository.findAll();
    }

    // Get medical alert by ID
    public Optional<MedicalAlert> getAlertById(Long id) {
        return medicalAlertRepository.findById(id);
    }

    // Create a new medical alert
    public MedicalAlert createMedicalAlert(MedicalAlert medicalAlert) {
        Optional<Resident> resident = residentRepository.findByCnp(medicalAlert.getResident().getCnp());
        Optional<Employee> employee = employeeRepository.findByCnp(medicalAlert.getEmployee().getCnp());

        if (resident.isPresent() && employee.isPresent()) {
            medicalAlert.setResident(resident.get());
            medicalAlert.setEmployee(employee.get());
            return medicalAlertRepository.save(medicalAlert);
        } else {
            throw new IllegalArgumentException("Invalid Resident or Employee CNP");
        }
    }

    // Update an existing medical alert
    public MedicalAlert updateMedicalAlert(Long id, MedicalAlert medicalAlert) {
        if (medicalAlertRepository.existsById(id)) {
            medicalAlert.setIdAlert(id);
            return medicalAlertRepository.save(medicalAlert);
        }
        return null; // Return null if not found
    }

    // Delete a medical alert
    public void deleteMedicalAlert(Long id) {
        medicalAlertRepository.deleteById(id);
    }

    public List<MedicalAlert> getMedicalAlertsByResidentCnp(Long residentCnp) {
        return medicalAlertRepository.findByResidentCnp(residentCnp);
    }

    public List<MedicalAlert> getMedicalAlertsByEmployeeCnp(Long employeeCnp) {
        return medicalAlertRepository.findByEmployeeCnp(employeeCnp);
    }
}
