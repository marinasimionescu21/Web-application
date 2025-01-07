package ro.pweb.myspringapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ro.pweb.myspringapi.entity.MedicalAlert;

import java.util.List;

@Repository
public interface MedicalAlertRepository extends JpaRepository<MedicalAlert, Long> {
    List<MedicalAlert> findByResidentCnp(Long residentCnp);
    List<MedicalAlert> findByEmployeeCnp(Long employeeCnp);
}
