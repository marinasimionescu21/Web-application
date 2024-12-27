package ro.pweb.myspringapi.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
<<<<<<< HEAD
public class
RegisterRequest {
=======
public class RegisterRequest {
    private String firstname;
    private String lastname;
>>>>>>> 7d22ca3cfb891676cf031ad47243c336d8db5674
    private String email;
    private String password;
    private String role;
}
