package ro.pweb.myspringapi.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.pweb.myspringapi.dto.ResidentDTO;
import ro.pweb.myspringapi.entity.ContactPerson;
import ro.pweb.myspringapi.entity.Resident;
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

    // Get all residents
    @GetMapping("/all")
    public ResponseEntity<List<ResidentDTO>> getResidents() {
        List<ResidentDTO> residentDTOs = residentService.getAllResidents()
                .stream()
                .map(resident -> modelMapper.map(resident, ResidentDTO.class))
                .collect(Collectors.toList());

        return ResponseEntity.ok().body(residentDTOs);
    }

    // Create a new resident
    @PostMapping("/create")
    public ResponseEntity<String> createUser(@RequestBody Resident resident) {
        try {
            residentService.createResident(resident);
            return ResponseEntity.status(HttpStatus.CREATED).body("Resident created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // Update an existing resident
    @PutMapping(path = "{cnp}")
    public ResponseEntity<Resident> updateResident(@PathVariable Long cnp, @RequestBody Resident resident) {
        try {
            Optional<Resident> existingResident = residentService.getById(cnp);
            if (existingResident.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            Resident updatedResident = residentService.updateResident(cnp, resident);
            return ResponseEntity.ok(updatedResident);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Delete a resident
    @DeleteMapping(path = "{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        try {
            residentService.deleteResident(id);
            return ResponseEntity.status(HttpStatus.OK).body("Resident deleted successfully and room's free beds updated.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // Assign resident to room
    @PutMapping("/assign/{residentId}/toRoom/{roomId}")
    public ResponseEntity<String> assignResidentToRoom(@PathVariable Long residentId, @PathVariable Long roomId) {
        try {
            residentService.assignResidentToRoom(residentId, roomId);
            return ResponseEntity.status(HttpStatus.OK).body("Resident successfully assigned to room.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error assigning resident to room.");
        }
    }

    // Add contact person for resident
    @PostMapping("/{cnp}/contact-person")
    public ResponseEntity<ContactPerson> addContactPerson(@PathVariable Long cnp, @RequestBody ContactPerson contactPerson) {
        try {
            ContactPerson savedContact = residentService.addContactPerson(cnp, contactPerson);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedContact);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    // Get all contact persons for a resident
    @GetMapping("/{cnp}/contact-persons")
    public ResponseEntity<List<ContactPerson>> getContactPersons(@PathVariable Long cnp) {
        List<ContactPerson> contacts = residentService.getContactPersonsByResident(cnp);
        return ResponseEntity.ok(contacts);
    }

    // Delete a contact person
    @DeleteMapping("/contact-person/{id}")
    public ResponseEntity<String> deleteContactPerson(@PathVariable Long id) {
        residentService.deleteContactPerson(id);
        return ResponseEntity.ok("Contact person deleted successfully");
    }
}
