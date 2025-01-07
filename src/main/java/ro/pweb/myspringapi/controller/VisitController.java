package ro.pweb.myspringapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.pweb.myspringapi.dto.VisitRequest;
import ro.pweb.myspringapi.entity.Visit;
import ro.pweb.myspringapi.service.VisitService;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "api/v1/visits")
public class VisitController {

    private final VisitService visitService;

    @Autowired
    public VisitController(VisitService visitService) {
        this.visitService = visitService;
    }

    // Get all visits
    @GetMapping("/all")
    public ResponseEntity<List<Visit>> getAllVisits() {
        List<Visit> visits = visitService.getAllVisits();
        return ResponseEntity.ok(visits);
    }

    // Get visits by resident CNP
    @GetMapping("/resident/{cnp}")
    public ResponseEntity<List<Visit>> getVisitsByResident(@PathVariable Long cnp) {
        List<Visit> visits = visitService.getVisitsByResident(cnp);
        return ResponseEntity.ok(visits);
    }

    // Create a new visit
    @PostMapping("/create")
    public ResponseEntity<Visit> createVisit(@RequestBody VisitRequest visitRequest) {
        try {
            Visit visit = visitService.createVisit(
                    visitRequest.getResidentCnp(),
                    visitRequest.getVisitorName(),
                    visitRequest.getVisitDate()
            );
            return ResponseEntity.status(HttpStatus.CREATED).body(visit);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    // Update a visit
    @PutMapping("/{idVisit}")
    public ResponseEntity<Visit> updateVisit(@PathVariable Long idVisit,
                                             @RequestParam String visitorName,
                                             @RequestParam String visitDate) {
        try {
            Visit updatedVisit = visitService.updateVisit(idVisit, visitorName, LocalDateTime.parse(visitDate));
            return ResponseEntity.ok(updatedVisit);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    // Delete a visit
    @DeleteMapping("/{idVisit}")
    public ResponseEntity<String> deleteVisit(@PathVariable Long idVisit) {
        try {
            visitService.deleteVisit(idVisit);
            return ResponseEntity.status(HttpStatus.OK).body("Visit deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Visit not found");
        }
    }
}
