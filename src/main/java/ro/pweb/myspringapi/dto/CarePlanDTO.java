package ro.pweb.myspringapi.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class CarePlanDTO {
    private Long id_emp; // Employee ID
    private Long id_res; // Resident ID
    private String objectives; // Objectives of the care plan
    private LocalDate start_date; // Start date of the care plan
}
