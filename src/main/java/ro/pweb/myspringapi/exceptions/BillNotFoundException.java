package ro.pweb.myspringapi.exceptions;

public class BillNotFoundException extends RuntimeException{
    public BillNotFoundException(Integer id) {
        super("Could not found the user id " + id);
    }
}
