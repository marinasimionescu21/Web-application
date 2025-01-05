package ro.pweb.myspringapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ro.pweb.myspringapi.entity.ContactPerson;

import java.util.List;

@Repository
public interface ContactPersonRepository extends JpaRepository<ContactPerson, Long> {
    List<ContactPerson> findByResidentCnp(Long residentCnp);
}
