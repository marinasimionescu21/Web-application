package ro.pweb.myspringapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.pweb.myspringapi.entity.Bill;

import java.util.List;

public interface BillRepository extends JpaRepository<Bill, Integer> {
    List<Bill> findAll();
    Bill findById(int billId);
}
