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
@Table(name = "medical_alert")
public class MedicalAlert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long idAlert;

    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "id_res", nullable = false)
    private Resident resident; // Foreign key to Resident

    @ManyToOne
    @JoinColumn(name = "id_emp", nullable = false)
    private Employee employee; // Foreign key to Employee

    private String details;
}
