package ro.pweb.myspringapi.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
@Setter
@Table(name = "visit")
public class Visit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idVisit;

    @ManyToOne
    @JoinColumn(name = "id_resident", referencedColumnName = "cnp", nullable = false)
    private Resident resident;

    @Column(nullable = false)
    private String visitorName;

    @Column(nullable = false)
    private LocalDateTime visitDate;

    public Long getResidentCnp() {
        return resident.getCnp();
    }
}
