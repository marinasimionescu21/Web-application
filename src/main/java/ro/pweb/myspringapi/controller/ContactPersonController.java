package ro.pweb.myspringapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.pweb.myspringapi.entity.ContactPerson;
import ro.pweb.myspringapi.service.ContactPersonService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "api/v1/contact-persons")
public class ContactPersonController {

    private final ContactPersonService contactPersonService;

    @Autowired
    public ContactPersonController(ContactPersonService contactPersonService) {
        this.contactPersonService = contactPersonService;
    }

    // Create a new contact person for a resident
    @PostMapping("/{residentCnp}")
    public ResponseEntity<ContactPerson> createContactPerson(@PathVariable Long residentCnp,
                                                             @RequestBody ContactPerson contactPerson) {
        try {
            ContactPerson createdContactPerson = contactPersonService.createContactPerson(residentCnp, contactPerson);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdContactPerson);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    // Get all contact persons for a resident
    @GetMapping("/{residentCnp}")
    public ResponseEntity<List<ContactPerson>> getContactPersons(@PathVariable Long residentCnp) {
        List<ContactPerson> contactPersons = contactPersonService.getContactPersonsByResident(residentCnp);
        return ResponseEntity.ok(contactPersons);
    }

    // Get a specific contact person by ID
    @GetMapping("/id/{id}")
    public ResponseEntity<ContactPerson> getContactPersonById(@PathVariable Long id) {
        try {
            ContactPerson contactPerson = contactPersonService.getContactPersonById(id);
            return ResponseEntity.ok(contactPerson);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Update an existing contact person
    @PutMapping("/{id}")
    public ResponseEntity<ContactPerson> updateContactPerson(@PathVariable Long id,
                                                             @RequestBody ContactPerson contactPersonDetails) {
        try {
            ContactPerson updatedContactPerson = contactPersonService.updateContactPerson(id, contactPersonDetails);
            return ResponseEntity.ok(updatedContactPerson);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Delete a contact person by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteContactPerson(@PathVariable Long id) {
        contactPersonService.deleteContactPerson(id);
        return ResponseEntity.ok("Contact person deleted successfully");
    }
}
