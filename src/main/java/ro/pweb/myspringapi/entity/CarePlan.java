
package ro.pweb.myspringapi.entity;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
@Setter
@Table(name = "care_plan")
public class CarePlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id_plan;

    @ManyToOne // Define many-to-one relationship with Employee
    @JoinColumn(name = "id_emp", referencedColumnName = "cnp", nullable = false) // id refers to the Employee primary key
    private Employee employee;

    @ManyToOne // Define many-to-one relationship with Resident
    @JoinColumn(name = "id_res", referencedColumnName = "cnp", nullable = false) // id refers to the Resident primary key
    private Resident resident;
    private String objectives;
    private LocalDate start_date;

}
