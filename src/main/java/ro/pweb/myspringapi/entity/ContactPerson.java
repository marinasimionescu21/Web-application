package ro.pweb.myspringapi.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "contact_person")
public class ContactPerson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    private String email;
    private String address;

    @ManyToOne
    @JoinColumn(name = "id_resident", nullable = false)
    private Resident resident;
}
