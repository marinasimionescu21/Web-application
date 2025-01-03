package ro.pweb.myspringapi.service;

import ro.pweb.myspringapi.entity.Employee;
import ro.pweb.myspringapi.entity.Resident;
import ro.pweb.myspringapi.entity.User;

import java.util.List;
import java.util.Optional;

public interface IResidentService {

    List<Resident> getAllResidents();
    void createResident(Resident resident) throws Exception;
    void deleteResident(Long id) throws Exception;
    Optional<Resident> getById(Long id);
    Resident updateResident(Long id, Resident resident);
}
