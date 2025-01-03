package ro.pweb.myspringapi.controller;

import jakarta.annotation.security.RolesAllowed;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.pweb.myspringapi.dto.ResidentDTO;
import ro.pweb.myspringapi.entity.Employee;
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
    public ResponseEntity<String> createUser(@RequestBody Resident resident) {
        try {
            residentService.createResident(resident);
            return ResponseEntity.status(HttpStatus.CREATED).body("Resident created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    //@RolesAllowed("Admin")
    @PutMapping(path = "{cnp}")
    public ResponseEntity<Resident> updateResident(@PathVariable Long cnp, @RequestBody Resident resident) {
        try {
            Optional<Resident> existingResident = residentService.getById(cnp);
            if (existingResident.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(null); // Employee not found
            }
            Resident updatedResident = residentService.updateResident(cnp, resident);
            return ResponseEntity.ok(updatedResident);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null); // Handle other errors
        }
    }

    @DeleteMapping(path = "{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        try {
            residentService.deleteResident(id);
            return ResponseEntity.status(HttpStatus.OK).body("Resident deleted successfully and room's free beds updated.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("/assign/{residentId}/toRoom/{roomId}")
    public ResponseEntity<String> assignResidentToRoom(@PathVariable Long residentId, @PathVariable Long roomId) {
        try {
            residentService.assignResidentToRoom(residentId, roomId);
            return ResponseEntity.status(HttpStatus.OK).body("Resident successfully assigned to room.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error assigning resident to room.");
        }
    }
}
