package ro.pweb.myspringapi.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        AuthenticationResponse register = service.register(request);
        return ResponseEntity.ok(register);
    }

    @PostMapping("/authentication")
    public ResponseEntity<AuthenticationResponse> authentication (
            @RequestBody AuthenticationRequest request
    ) {
        AuthenticationResponse authenticate = service.authenticate(request);
        return ResponseEntity.ok(authenticate);
    }
}
