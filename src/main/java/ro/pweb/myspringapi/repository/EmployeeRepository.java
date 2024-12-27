package ro.pweb.myspringapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ro.pweb.myspringapi.entity.Employee;

import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> getEmployeeByEmailAddress(String emailAddress);
    Optional<Employee> findByCnp(Long cnp);

}
