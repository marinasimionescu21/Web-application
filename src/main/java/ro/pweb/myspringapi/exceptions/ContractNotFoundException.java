package ro.pweb.myspringapi.exceptions;

public class ContractNotFoundException extends RuntimeException {
    public ContractNotFoundException(Integer id) {
        super("Could not found the bill id " + id);
    }
}
