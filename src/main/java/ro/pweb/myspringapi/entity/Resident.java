package ro.pweb.myspringapi.entity;


import jakarta.persistence.*;
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

    private String firstName;
    private String lastName;
    private Integer age;
    private String medical_history;
    private Long id_room;
    private Long id_plan;
    private LocalDate admission_date;
    private LocalDate birth_date;

}