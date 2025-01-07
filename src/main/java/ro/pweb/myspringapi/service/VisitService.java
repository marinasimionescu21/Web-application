package ro.pweb.myspringapi.service;

import org.springframework.stereotype.Service;
import ro.pweb.myspringapi.entity.Resident;
import ro.pweb.myspringapi.entity.Visit;
import ro.pweb.myspringapi.repository.ResidentRepository;
import ro.pweb.myspringapi.repository.VisitRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class VisitService {

    private final VisitRepository visitRepository;
    private final ResidentRepository residentRepository;

    public VisitService(VisitRepository visitRepository, ResidentRepository residentRepository) {
        this.visitRepository = visitRepository;
        this.residentRepository = residentRepository;
    }

    // Create a visit
    public Visit createVisit(Long residentCnp, String visitorName, LocalDateTime visitDate) throws Exception {
        Resident resident = residentRepository.findByCnp(residentCnp)
                .orElseThrow(() -> new Exception("Resident not found"));

        Visit visit = new Visit();
        visit.setResident(resident);
        visit.setVisitorName(visitorName);
        visit.setVisitDate(visitDate);

        return visitRepository.save(visit);
    }

    // Get all visits
    public List<Visit> getAllVisits() {
        return visitRepository.findAll();
    }

    // Get visits by resident
    public List<Visit> getVisitsByResident(Long residentCnp) {
        return visitRepository.findByResident_Cnp(residentCnp);
    }

    // Update a visit
    public Visit updateVisit(Long idVisit, String visitorName, LocalDateTime visitDate) throws Exception {
        Optional<Visit> visitOptional = visitRepository.findById(idVisit);
        if (visitOptional.isEmpty()) {
            throw new Exception("Visit not found");
        }

        Visit visit = visitOptional.get();
        visit.setVisitorName(visitorName);
        visit.setVisitDate(visitDate);

        return visitRepository.save(visit);
    }

    // Delete a visit
    public void deleteVisit(Long idVisit) throws Exception {
        Optional<Visit> visitOptional = visitRepository.findById(idVisit);
        if (visitOptional.isEmpty()) {
            throw new Exception("Visit not found");
        }

        visitRepository.deleteById(idVisit);
    }
}
