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

    private void validateId(int code) {
        Optional<Bill> billOptional = billRepository.getBillById(code);
        if(billOptional.isPresent()) {
            throw new IllegalStateException(String.format("Id %s already exists", code));
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
    public void updateBill(int code, Bill bill) {
        Bill billToUpdate = billRepository.findById(code).orElseThrow(
                () -> new BillNotFoundException(code));
        validateId(bill.getId());

        billToUpdate.setAmount(bill.getAmount());
        billToUpdate.setContracts(bill.getContracts());

        billRepository.save(billToUpdate);
    }

    @Override
    public void deleteBill(int code) {
        boolean billExists = billRepository.existsById(code);
        if(!billExists) {
            throw new BillNotFoundException(code);
        }
        billRepository.deleteById(code);
    }

    @Override
    public Optional<Bill> getById(int code) {
        return billRepository.findById(code);
    }
}
