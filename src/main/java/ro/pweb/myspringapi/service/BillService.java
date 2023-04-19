package ro.pweb.myspringapi.service;

import org.springframework.stereotype.Service;
import ro.pweb.myspringapi.entity.Bill;
import ro.pweb.myspringapi.exceptions.BillNotFoundException;
import ro.pweb.myspringapi.repository.BillRepository;

import java.util.List;
import java.util.Optional;

@Service
public class BillService implements IBillService{
    private final BillRepository billRepository;
    public BillService (BillRepository billRepository){
        this.billRepository = billRepository;
    }

    private void validateId(int id) {
        Optional<Bill> billOptional = billRepository.getBillById(id);
        if(billOptional.isPresent()) {
            throw new IllegalStateException(String.format("Id %s already exists", id));
        }
    }


    @Override
    public List<Bill> getBills() {
        return billRepository.findAll();
    }

    @Override
    public void createBill(Bill bill) {
        validateId(bill.getId());
        billRepository.save(bill);
    }

    @Override
    public Bill updateBill(int id, Bill bill) {
        Bill billToUpdate = billRepository.findById(id).orElseThrow(
                () -> new BillNotFoundException(id));
        validateId(bill.getId());

        billToUpdate.setAmount(bill.getAmount());
        billToUpdate.setContracts(bill.getContracts());

        return billRepository.save(billToUpdate);
    }

    @Override
    public void deleteBill(int id) {
        boolean billExists = billRepository.existsById(id);
        if(!billExists) {
            throw new BillNotFoundException(id);
        }
        billRepository.deleteById(id);
    }

    @Override
    public Optional<Bill> getById(int id) {
        return billRepository.getBillById(id);
    }

}
