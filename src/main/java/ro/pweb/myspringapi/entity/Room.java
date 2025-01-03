package ro.pweb.myspringapi.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
@Setter
@Table(name = "room")
public class Room {
    @Id
    @Column(unique = true, nullable = false)
    private Long roomNumber;
    private int capacity;
    private int freeBeds;
    private int floor;

    public void decreaseFreeBeds() {
        if (freeBeds > 0) {
            freeBeds -= 1;
        }
    }
}
