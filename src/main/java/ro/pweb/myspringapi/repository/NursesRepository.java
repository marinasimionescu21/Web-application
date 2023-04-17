package ro.pweb.myspringapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.pweb.myspringapi.entity.Nurses;

import java.util.Optional;

public interface NursesRepository extends JpaRepository<Nurses, Long> {
    Optional<Nurses> getNursesByFirstName(String firstName);
}
