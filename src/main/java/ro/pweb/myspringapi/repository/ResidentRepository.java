package ro.pweb.myspringapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
<<<<<<< HEAD
import org.springframework.stereotype.Repository;
import ro.pweb.myspringapi.entity.Employee;
=======
>>>>>>> 7d22ca3cfb891676cf031ad47243c336d8db5674
import ro.pweb.myspringapi.entity.Resident;

import java.util.Optional;

<<<<<<< HEAD
@Repository
public interface ResidentRepository extends JpaRepository<Resident, Long> {
    Optional<Resident> findByCnp(Long cnp);
=======
public interface ResidentRepository extends JpaRepository<Resident, Long> {
    Optional<Resident> getResidentsByFirstName(String firstName);
>>>>>>> 7d22ca3cfb891676cf031ad47243c336d8db5674
}
