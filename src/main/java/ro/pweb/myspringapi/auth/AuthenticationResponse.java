package ro.pweb.myspringapi.auth;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    private String token;
    private String message;

    public AuthenticationResponse(String message) {
        this.message = message;
    }

}
