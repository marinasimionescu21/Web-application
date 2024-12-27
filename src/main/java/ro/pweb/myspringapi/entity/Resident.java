package ro.pweb.myspringapi.entity;


import jakarta.persistence.*;
<<<<<<< HEAD
import lombok.*;

import java.time.LocalDate;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
@Setter
@Table(name = "resident")
public class Resident {
    @Id
    @Column(unique = true, nullable = false)
    private Long cnp;

=======

import java.util.Set;

@Entity
@Table(name = "resident")
public class Resident {
    @Id
    @SequenceGenerator(name = "resident_sequence", allocationSize = 1)
    @GeneratedValue(generator = "resident_sequence", strategy = GenerationType.SEQUENCE)
    private Long id;
>>>>>>> 7d22ca3cfb891676cf031ad47243c336d8db5674
    private String firstName;
    private String lastName;
    private Integer age;
    private String medical_history;
<<<<<<< HEAD
    private Long id_room;
    private Long id_plan;
    private LocalDate admission_date;
    private LocalDate birth_date;

=======

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "contract_id", referencedColumnName = "id")
    private Contract contract;

    @ManyToMany
    @JoinTable(
            name = "resident_nurses",
            joinColumns = @JoinColumn(name = "resident_id"),
            inverseJoinColumns = @JoinColumn(name = "nurses_id")
    )
    Set<Nurses> nurses;

    public Resident() {}

    public Resident(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
>>>>>>> 7d22ca3cfb891676cf031ad47243c336d8db5674
}
