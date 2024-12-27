package ro.pweb.myspringapi.controller;

import jakarta.annotation.security.RolesAllowed;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.pweb.myspringapi.dto.ContractDTO;
import ro.pweb.myspringapi.dto.UserDTO;
import ro.pweb.myspringapi.entity.Contract;
import ro.pweb.myspringapi.entity.User;
import ro.pweb.myspringapi.exceptions.ContractNotFoundException;
import ro.pweb.myspringapi.service.ContractService;
import ro.pweb.myspringapi.service.UserService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "api/v1/contracts")
public class ContractController {
    private ContractService contractService;
    @Autowired
    private ModelMapper modelMapper;

    public ContractController(ContractService contractService) {
        this.contractService = contractService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<ContractDTO>> getContracts() {
        return ResponseEntity.ok().body(contractService.getContracts()
                .stream().map(contract -> modelMapper.map(contract, ContractDTO.class))
                .collect(Collectors.toList()));
    }

    @GetMapping(path = "{id}")
    public ResponseEntity<ContractDTO> getContractById(@PathVariable int id) throws ContractNotFoundException {
        Optional<Contract> contract = contractService.getById(id);
        ContractDTO contractDTO = modelMapper.map(contract, ContractDTO.class);
        return ResponseEntity.ok().body(contractDTO);
    }

    @RolesAllowed("Admin")
    @PostMapping("/create")
    public HttpStatus createContract(@RequestBody Contract contract) throws Exception {
        try {
            contractService.createContract(contract);
            return HttpStatus.CREATED;
        } catch (Exception e) {
            throw new Exception();
        }
    }


}
