package ro.pweb.myspringapi.dto;

import lombok.Data;

@Data
public class EmployeeDTO {
    private String firstName;
    private String lastName;
    private String role;
    private int age;
    private String address;
    private String emailAddress;
    private Long cnp;

}
