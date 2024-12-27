package ro.pweb.myspringapi.service;

import ro.pweb.myspringapi.entity.Resident;
import ro.pweb.myspringapi.entity.User;

import java.util.List;
import java.util.Optional;

public interface IResidentService {

    List<Resident> getAllResidents();
    void createResident(Resident resident);
    void deleteResident(Long id);

}
