package ro.pweb.myspringapi.service;

import org.springframework.stereotype.Service;
import ro.pweb.myspringapi.entity.ContactPerson;
import ro.pweb.myspringapi.entity.Resident;
import ro.pweb.myspringapi.entity.Room;
import ro.pweb.myspringapi.repository.ContactPersonRepository;
import ro.pweb.myspringapi.repository.ResidentRepository;
import ro.pweb.myspringapi.repository.RoomRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ResidentService implements IResidentService {

    private final ResidentRepository residentRepository;
    private final RoomRepository roomRepository;
    private final ContactPersonRepository contactPersonRepository;

    // Constructor-based dependency injection
    public ResidentService(ResidentRepository residentRepository, RoomRepository roomRepository,
                           ContactPersonRepository contactPersonRepository) {
        this.residentRepository = residentRepository;
        this.roomRepository = roomRepository;
        this.contactPersonRepository = contactPersonRepository;
    }

    // Get all residents
    public List<Resident> getAllResidents() {
        return residentRepository.findAll();
    }

    // Create a new resident and assign to room
    public void createResident(Resident resident) throws Exception {
        if (resident.getId_room() != null) {
            Room room = roomRepository.findById(String.valueOf(resident.getId_room()))
                    .orElseThrow(() -> new Exception("Room not found"));

            if (room.getFreeBeds() > 0) {
                room.decreaseFreeBeds();
            } else {
                throw new Exception("No free beds available in the room");
            }
            roomRepository.save(room);
            resident.assignToRoom(room);
        }

        residentRepository.save(resident);
    }

    @Override
    public Optional<Resident> getById(Long cnp) {
        return residentRepository.findByCnp(cnp);
    }

    @Override
    public Resident updateResident(Long cnp, Resident newResidentData) {
        Optional<Resident> existingResident = residentRepository.findByCnp(cnp);
        if (existingResident.isEmpty()) {
            throw new IllegalStateException("Resident with id " + cnp + " doesn't exist");
        }

        Resident resident = existingResident.get();
        resident.setFirstName(newResidentData.getFirstName());
        resident.setLastName(newResidentData.getLastName());
        resident.setAge(newResidentData.getAge());
        resident.setId_room(newResidentData.getId_room());
        resident.setMedical_history(newResidentData.getMedical_history());
        resident.setAdmission_date(newResidentData.getAdmission_date());
        resident.setBirth_date(newResidentData.getBirth_date());
        resident.setCnp(newResidentData.getCnp());

        return residentRepository.save(resident);
    }

    public void deleteResident(Long cnp) throws Exception {
        Optional<Resident> residentOptional = residentRepository.findByCnp(cnp);
        if (residentOptional.isEmpty()) {
            throw new IllegalStateException("Resident with CNP " + cnp + " does not exist");
        }

        Resident resident = residentOptional.get();

        if (resident.getId_room() != null) {
            Room room = roomRepository.findById(String.valueOf(resident.getId_room()))
                    .orElseThrow(() -> new Exception("Room not found"));

            room.setFreeBeds(room.getFreeBeds() + 1);
            roomRepository.save(room);
        }

        residentRepository.deleteById(cnp);
    }

    public void assignResidentToRoom(Long residentId, Long roomId) throws Exception {
        Resident resident = residentRepository.findById(residentId)
                .orElseThrow(() -> new Exception("Resident not found"));
        Room room = roomRepository.findById(String.valueOf(roomId))
                .orElseThrow(() -> new Exception("Room not found"));

        resident.assignToRoom(room);
        residentRepository.save(resident);
        roomRepository.save(room);
    }

    // Add a new contact person for a resident
    public ContactPerson addContactPerson(Long residentCnp, ContactPerson contactPerson) throws Exception {
        Resident resident = residentRepository.findByCnp(residentCnp)
                .orElseThrow(() -> new Exception("Resident not found"));
        contactPerson.setResident(resident);
        return contactPersonRepository.save(contactPerson);
    }

    // Get all contact persons for a resident
    public List<ContactPerson> getContactPersonsByResident(Long residentCnp) {
        return contactPersonRepository.findByResidentCnp(residentCnp);
    }

    // Delete contact person
    public void deleteContactPerson(Long contactPersonId) {
        contactPersonRepository.deleteById(contactPersonId);
    }
}
