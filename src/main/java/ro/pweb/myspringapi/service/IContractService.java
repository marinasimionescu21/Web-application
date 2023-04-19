package ro.pweb.myspringapi.service;

import ro.pweb.myspringapi.entity.Bill;
import ro.pweb.myspringapi.entity.Contract;

import java.util.List;
import java.util.Optional;

public interface IContractService {
    List<Contract> getContracts();
    void createContract(Contract contract);
    Contract updateContract(int id, Contract contract);
    void deleteContract(int id);
    Optional<Contract> getById(int id);
}
