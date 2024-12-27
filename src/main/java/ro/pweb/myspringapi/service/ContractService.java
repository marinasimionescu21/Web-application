package ro.pweb.myspringapi.service;

import org.springframework.stereotype.Service;
import ro.pweb.myspringapi.entity.Contract;
import ro.pweb.myspringapi.entity.User;
import ro.pweb.myspringapi.repository.ContractRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ContractService implements IContractService{
    private final ContractRepository contractRepository;
    public ContractService(ContractRepository contractRepository) {
        this.contractRepository = contractRepository;
    }

    private void validateId(int id) {
        Optional<Contract> contractOptional = Optional.ofNullable(contractRepository.getById(id));
        if(contractOptional.isPresent()) {
            throw new IllegalStateException(String.format("Id %s already exists", id));
        }
    }


    @Override
    public List<Contract> getContracts() {
        return contractRepository.findAll();
    }

    @Override
    public void createContract(Contract contract) {
        validateId(contract.getId());
        contractRepository.save(contract);
    }

    @Override
    public Contract updateContract(int id, Contract contract) {
        Contract contract1 = contractRepository.findById(id).orElseThrow(
                () -> new IllegalStateException(String.format("Contract with id %s doesn't exist", id)));

        validateId(id);

        contract1.setResident(contract.getResident());
        contract1.setBill(contract.getBill());
        contract1.setUser(contract.getUser());
        contract1.setBillCode(contract.getBillCode());
        contract1.setResidentCode(contract.getResidentCode());

        return contractRepository.save(contract1);

    }

    @Override
    public void deleteContract(int id) {
        boolean contractExists = contractRepository.existsById(id);
        if (!contractExists) {
            throw new IllegalStateException(String.format("Contract with id %s does not exists"));
        }
        contractRepository.deleteById(id);

    }

    @Override
    public Optional<Contract> getById(int id) {
        return contractRepository.findById(id);
    }
}
