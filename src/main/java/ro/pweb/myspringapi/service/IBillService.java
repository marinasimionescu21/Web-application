package ro.pweb.myspringapi.service;

import ro.pweb.myspringapi.entity.Bill;

import java.util.List;
import java.util.Optional;

public interface IBillService {
    List<Bill> getBills();
    void createBill(Bill bill);
    Bill updateBill(int code, Bill bill);
    void deleteBill(int code);
    Optional<Bill> getById(int id);

}
