package ro.pweb.myspringapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.pweb.myspringapi.entity.Resident;

import java.util.Optional;

public interface ResidentRepository extends JpaRepository<Resident, Long> {
    Optional<Resident> getResidentsByFirstName(String firstName);
}
