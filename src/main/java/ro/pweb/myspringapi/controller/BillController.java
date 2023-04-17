package ro.pweb.myspringapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ro.pweb.myspringapi.entity.Bill;
import ro.pweb.myspringapi.exceptions.BillNotFoundException;
import ro.pweb.myspringapi.service.BillService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/v1/bills")
public class BillController {
    private final BillService billService;

    public BillController(BillService billService) {
        this.billService = billService;
    }

    @GetMapping
    public List<Bill> getBills() {
        return billService.getBills();
    }

    @GetMapping(path = "{id}")
    public Optional<Bill> getBillById(@PathVariable int code) {
        return Optional.ofNullable(billService.getById(code)
                .orElseThrow(() -> new BillNotFoundException(code)));
    }

    @PostMapping
    public void createBill(@RequestBody Bill bill) {
        billService.createBill(bill);
    }

    @PutMapping(path = "{id}")
    public void updateBill(@PathVariable int code, @RequestBody Bill bill) {
        billService.updateBill(code, bill);
    }

    @DeleteMapping(path = "{id}")
    public void deleteBill(@PathVariable int code) {
        billService.deleteBill(code);
    }

}
