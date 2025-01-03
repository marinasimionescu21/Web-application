package ro.pweb.myspringapi.entity;

import jakarta.persistence.*;
import lombok.*;

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