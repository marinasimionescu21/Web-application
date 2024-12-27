package ro.pweb.myspringapi.controller;

import jakarta.annotation.security.RolesAllowed;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.pweb.myspringapi.dto.ResidentDTO;
import ro.pweb.myspringapi.entity.Resident;
import ro.pweb.myspringapi.exceptions.UserNotFoundException;
import ro.pweb.myspringapi.service.ResidentService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "api/v1/residents")
public class ResidentController {

    private final ResidentService residentService;

    @Autowired
    private ModelMapper modelMapper;

    // Constructor-based injection
    public ResidentController(ResidentService residentService) {
        this.residentService = residentService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<ResidentDTO>> getResidents() {
        List<ResidentDTO> residentDTOs = residentService.getAllResidents()
                .stream()
                .map(resident -> modelMapper.map(resident, ResidentDTO.class))
                .collect(Collectors.toList());

        return ResponseEntity.ok().body(residentDTOs);
    }

    @PostMapping("/create")
    public HttpStatus createUser(@RequestBody Resident resident) throws Exception {
        try {
            residentService.createResident(resident);
            return HttpStatus.CREATED;
        } catch (Exception e) {
            throw new Exception();
        }
    }

    @DeleteMapping(path = "{id}")
    public HttpStatus deleteUser(@PathVariable Long id) {
        try {
            residentService.deleteResident(id);
            return HttpStatus.OK;
        } catch (Exception e) {
            throw new UserNotFoundException(id);
        }
    }
}
