package ro.pweb.myspringapi.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class VisitRequest {
    private Long residentCnp;
    private String visitorName;
    private LocalDateTime visitDate;
}
