package ro.pweb.myspringapi.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.pweb.myspringapi.dto.EmployeeDTO;
import ro.pweb.myspringapi.entity.Employee;
import ro.pweb.myspringapi.exceptions.UserNotFoundException;
import ro.pweb.myspringapi.service.EmployeeService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "api/v1/employees")
public class EmployeeController {

    private EmployeeService employeeService;
    @Autowired
    private ModelMapper modelMapper;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
}

    @GetMapping("/all")
    public ResponseEntity<List<EmployeeDTO>> getEmployees() {
        return ResponseEntity.ok().body(employeeService.getEmployees()
                .stream().map(Employee -> modelMapper.map(Employee, EmployeeDTO.class))
                .collect(Collectors.toList()));
    }

    @GetMapping(path = "/{cnp}")
    public ResponseEntity<Optional<Employee>> getEmployeeById(@PathVariable Long cnp) {
        Optional<Employee> Employee = employeeService.getById(cnp);
        //EmployeeDTO EmployeeDTO = modelMapper.map(Employee, EmployeeDTO.class);
        return ResponseEntity.ok().body(Employee);
    }

    @PostMapping("/create")
    public ResponseEntity<String> createEmployee(@RequestBody Employee employee) {
        try {
            employeeService.createEmployee(employee);
            return ResponseEntity.status(HttpStatus.CREATED).body("Employee created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating employee: " + e.getMessage());
        }
    }

    //@RolesAllowed("Admin")
    @PutMapping(path = "{cnp}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long cnp, @RequestBody Employee employee) {
        try {
            Optional<Employee> existingEmployee = employeeService.getById(cnp);
            if (existingEmployee.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(null); // Employee not found
            }
            Employee updatedEmployee = employeeService.updateEmployee(cnp, employee);
            return ResponseEntity.ok(updatedEmployee);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null); // Handle other errors
        }
    }


    //@RolesAllowed("Admin")
    @DeleteMapping(path = "{id}")
    public HttpStatus deleteEmployee(@PathVariable Long id) {
        try {
            employeeService.deleteEmployee(id);
            return HttpStatus.OK;
        } catch (Exception e) {
            throw new UserNotFoundException(id);
        }
    }
}
