package ro.pweb.myspringapi.exceptions;

public class EmailAlreadyExistsException extends RuntimeException {
    public EmailAlreadyExistsException(String message) {
        //System.out.println(message);
            super(message);
    }
}
