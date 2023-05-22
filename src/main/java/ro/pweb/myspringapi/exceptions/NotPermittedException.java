package ro.pweb.myspringapi.exceptions;

public class NotPermittedException extends RuntimeException {
    public NotPermittedException() {
        super("Not permitted");
    }
}
