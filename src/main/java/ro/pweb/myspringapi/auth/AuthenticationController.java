package ro.pweb.myspringapi.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.pweb.myspringapi.exceptions.EmailAlreadyExistsException;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register (
            @RequestBody RegisterRequest request
    ) {
        try {
            AuthenticationResponse register = service.register(request);
            return ResponseEntity.ok(register);
        } catch (EmailAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new AuthenticationResponse(e.getMessage()));
        }
    }

    @PostMapping("/authentication")
    public ResponseEntity<AuthenticationResponse> authentication (
            @RequestBody AuthenticationRequest request
    ) {
        AuthenticationResponse authenticate = service.authenticate(request);
        return ResponseEntity.ok(authenticate);
    }
}