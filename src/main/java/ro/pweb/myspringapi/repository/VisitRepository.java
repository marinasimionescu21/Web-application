package ro.pweb.myspringapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ro.pweb.myspringapi.entity.Visit;

import java.util.List;

@Repository
public interface VisitRepository extends JpaRepository<Visit, Long> {
    List<Visit> findByResident_Cnp(Long cnp);
}
