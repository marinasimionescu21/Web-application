package ro.pweb.myspringapi.service;

import org.springframework.stereotype.Service;
import ro.pweb.myspringapi.entity.Employee;
import ro.pweb.myspringapi.entity.Resident;
import ro.pweb.myspringapi.entity.User;
import ro.pweb.myspringapi.repository.ResidentRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ResidentService implements IResidentService{

    private ResidentRepository residentRepository;

    // Constructor-based dependency injection
    public ResidentService(ResidentRepository residentRepository) {
        this.residentRepository = residentRepository;
    }

    // Get all residents
    public List<Resident> getAllResidents() {
        return residentRepository.findAll();
    }

    public void createResident(Resident resident) {
        residentRepository.save(resident);
    }


    public void deleteResident(Long id) {
        boolean residentExists = residentRepository.existsById(id);
        if (!residentExists) {
            throw new IllegalStateException("User with id %s does not exists");
        }
        residentRepository.deleteById(id);
    }

}
