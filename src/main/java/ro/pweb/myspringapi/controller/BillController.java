package ro.pweb.myspringapi.controller;

import jakarta.annotation.security.RolesAllowed;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.pweb.myspringapi.dto.BillDTO;
import ro.pweb.myspringapi.entity.Bill;
import ro.pweb.myspringapi.exceptions.BillNotFoundException;
import ro.pweb.myspringapi.service.BillService;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "api/v1/bills")
public class BillController {
    private final BillService billService;
    @Autowired
    private ModelMapper modelMapper;

    public BillController(BillService billService) {
        this.billService = billService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<BillDTO>> getBills() {
        return ResponseEntity.ok().body(billService.getBills()
                .stream().map(bill -> modelMapper.map(bill, BillDTO.class))
                .collect(Collectors.toList()));
    }

    @RolesAllowed("Admin")
    @PostMapping("/create")
    public HttpStatus createBill(@RequestBody Bill bill) throws Exception {
        try {
            billService.createBill(bill);
            return HttpStatus.CREATED;
        } catch (Exception e) {
            throw new Exception();
        }
    }

    @PutMapping(path = "{id}")
    public Bill updateBill(@PathVariable int id, @RequestBody Bill bill) {
        Bill newBill = billService.updateBill(id, bill);
        return ResponseEntity.ok().body(newBill).getBody();
    }

    @RolesAllowed("Admin")
    @DeleteMapping(path = "{id}")
    public HttpStatus deleteBill(@PathVariable int id) {
        try {
            billService.deleteBill(Math.toIntExact(id));
            return HttpStatus.OK;
        } catch (Exception e) {
            throw new BillNotFoundException(id);
        }
    }

    @GetMapping(path = "{id}")
    public ResponseEntity<BillDTO> getBillById(@PathVariable int id) {
        Optional<Bill> bill = billService.getById(id);
        BillDTO billDTO = modelMapper.map(bill, BillDTO.class);
        return ResponseEntity.ok().body(billDTO);
    }

}
