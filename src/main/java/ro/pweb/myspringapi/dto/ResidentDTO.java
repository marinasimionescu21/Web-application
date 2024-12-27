package ro.pweb.myspringapi.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class ResidentDTO {

    private String firstName;
    private String lastName;
    private Integer age;
    private String medical_history;
    private Long cnp;
    private LocalDate birth_date;
    private Long id_room;  // This will now match the field in Resident entity
    private Long id_plan;  // This will now match the field in Resident entity
    private LocalDate admission_date;
}
