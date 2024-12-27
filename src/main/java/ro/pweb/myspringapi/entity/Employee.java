package ro.pweb.myspringapi.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import ro.pweb.myspringapi.token.Token;

import java.util.Collection;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
@Setter
@Table(name = "employee")
public class Employee {
    @Id
    @Column(unique = true, nullable = false)
    private Long cnp;

    private String firstName;
    private String lastName;
    private int age;
    private String emailAddress;
    private String address;
    private String role;

}