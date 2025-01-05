package ro.pweb.myspringapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.pweb.myspringapi.entity.CarePlan;

public interface CarePlanRepository extends JpaRepository<CarePlan, Long> {
    // Custom queries (if needed) can go here
}
