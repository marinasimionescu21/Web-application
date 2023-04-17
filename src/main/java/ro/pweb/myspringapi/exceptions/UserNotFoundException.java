package ro.pweb.myspringapi.exceptions;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(Long id) {
        super("Could not found the user id " + id);
    }
}
