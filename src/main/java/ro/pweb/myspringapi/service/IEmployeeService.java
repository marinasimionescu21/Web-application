package ro.pweb.myspringapi.service;

import ro.pweb.myspringapi.entity.Employee;

import java.util.List;
import java.util.Optional;

public interface IEmployeeService {

    List<Employee> getEmployees();
    void createEmployee(Employee Employee);
    Employee updateEmployee(Long id, Employee Employee);
    void deleteEmployee(Long id);
    Optional<Employee> getById(Long id);

}
