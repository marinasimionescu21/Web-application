package ro.pweb.myspringapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.pweb.myspringapi.entity.Contract;

import java.util.List;

public interface ContractRepository extends JpaRepository<Contract, Integer> {
    List<Contract> findAll();

    Contract getById(Integer id);

    List<Contract> getContractByResidentId(Integer id);
}
