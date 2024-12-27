package ro.pweb.myspringapi.entity;

import jakarta.persistence.*;
<<<<<<< HEAD
import lombok.*;
=======
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
>>>>>>> 7d22ca3cfb891676cf031ad47243c336d8db5674
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;import ro.pweb.myspringapi.token.Token;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
<<<<<<< HEAD
@Getter
@Setter
@Table(name = "users")
public class User implements UserDetails {
=======
@Table(name = "users")
public class User implements UserDetails {

>>>>>>> 7d22ca3cfb891676cf031ad47243c336d8db5674
    @Id
    @SequenceGenerator(name = "user_sequence", allocationSize = 1)
    @GeneratedValue(generator = "user_sequence", strategy = GenerationType.SEQUENCE)
    private Long id;
<<<<<<< HEAD
    private String emailAddress;
    private String password;
=======
    private String firstName;
    private String lastName;
    private int age;
    private String emailAddress;
    private String password;
    private String address;
>>>>>>> 7d22ca3cfb891676cf031ad47243c336d8db5674
    private String role;

    @OneToMany(mappedBy = "user")
    private List<Token> tokens;

<<<<<<< HEAD
=======
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "contract_id", referencedColumnName = "id")
    private Contract contract;


>>>>>>> 7d22ca3cfb891676cf031ad47243c336d8db5674
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("User"));
    }

    @Override
    public String getUsername() {
        return emailAddress;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}