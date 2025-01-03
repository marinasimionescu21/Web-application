package ro.pweb.myspringapi.service;

import org.springframework.stereotype.Service;
import ro.pweb.myspringapi.entity.Employee;
import ro.pweb.myspringapi.repository.EmployeeRepository;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService implements IEmployeeService {
    private EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository EmployeeRepository) {
        this.employeeRepository = EmployeeRepository;
    }

    @Override
    public List<Employee> getEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public void createEmployee(Employee Employee) {
        validateEmail(Employee.getEmailAddress());
        employeeRepository.save(Employee);
    }

    @Override
    public Optional<Employee> getById(Long cnp) {
        return employeeRepository.findByCnp(cnp);
    }

    @Override
    public Employee updateEmployee(Long cnp, Employee newEmployeeData) {
        Optional<Employee> existingEmployee = employeeRepository.findByCnp(cnp);
        if (existingEmployee.isEmpty()) {
            throw new IllegalStateException("Employee with id " + cnp + " doesn't exist");
        }

        Employee employee = existingEmployee.get();
        employee.setFirstName(newEmployeeData.getFirstName());
        employee.setLastName(newEmployeeData.getLastName());
        employee.setRole(newEmployeeData.getRole());
        employee.setAge(newEmployeeData.getAge());
        employee.setAddress(newEmployeeData.getAddress());
        employee.setEmailAddress(newEmployeeData.getEmailAddress());
        // Ensure all fields are updated as needed

        return employeeRepository.save(employee);
    }


    private void validateEmail(String email) {
        Optional<Employee> EmployeeOptional = employeeRepository.getEmployeeByEmailAddress(email);
        if(EmployeeOptional.isPresent() && !email.isEmpty()) {
            throw new IllegalStateException(String.format("Email address %s already exists", email));
        }
    }

    public void deleteEmployee(Long id) {
        boolean EmployeeExists = employeeRepository.existsById(id);
        if (!EmployeeExists) {
            throw new IllegalStateException(String.format("Employee with id %s does not exists"));
        }
        employeeRepository.deleteById(id);
    }

}