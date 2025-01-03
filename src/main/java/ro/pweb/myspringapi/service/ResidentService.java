package ro.pweb.myspringapi.service;

import org.springframework.stereotype.Service;
import ro.pweb.myspringapi.entity.Resident;
import ro.pweb.myspringapi.entity.Room;
import ro.pweb.myspringapi.repository.ResidentRepository;
import ro.pweb.myspringapi.repository.RoomRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ResidentService implements IResidentService{

    private ResidentRepository residentRepository;
    private final RoomRepository roomRepository;

    // Constructor-based dependency injection
    public ResidentService(ResidentRepository residentRepository, RoomRepository roomRepository) {
        this.residentRepository = residentRepository;
        this.roomRepository = roomRepository;
    }

    // Get all residents
    public List<Resident> getAllResidents() {
        return residentRepository.findAll();
    }

    public void createResident(Resident resident) throws Exception {
        if (resident.getId_room() != null) {
            // Retrieve the room by its id
            Room room = roomRepository.findById(String.valueOf(resident.getId_room()))
                    .orElseThrow(() -> new Exception("Room not found"));

            // Decrease the free beds in the room if it's available
            if (room.getFreeBeds() > 0) {
                room.decreaseFreeBeds();
            } else {
                throw new Exception("No free beds available in the room");
            }

            // Save the updated room with decreased free beds
            roomRepository.save(room);

            // Assign the resident to the room and set their room ID
            resident.assignToRoom(room);
        }

        // Save the resident after handling the room assignment
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
        resident.setId_plan(newResidentData.getId_plan());
        // Ensure all fields are updated as needed

        return residentRepository.save(resident);
    }


    public void deleteResident(Long cnp) throws Exception {
        Optional<Resident> residentOptional = residentRepository.findByCnp(cnp);
        if (residentOptional.isEmpty()) {
            throw new IllegalStateException("Resident with CNP " + cnp + " does not exist");
        }

        Resident resident = residentOptional.get();

        // Retrieve the room that the resident is currently assigned to
        if (resident.getId_room() != null) {
            Room room = roomRepository.findById(String.valueOf(resident.getId_room()))
                    .orElseThrow(() -> new Exception("Room not found"));

            // Increase the free beds in the room
            room.setFreeBeds(room.getFreeBeds() + 1);

            // Save the updated room with the increased free beds
            roomRepository.save(room);
        }

        // Delete the resident
        residentRepository.deleteById(cnp);
    }


    public void assignResidentToRoom(Long residentId, Long roomId) throws Exception {
        // Retrieve the resident and room from their respective repositories
        Resident resident = residentRepository.findById(residentId)
                .orElseThrow(() -> new Exception("Resident not found"));
        Room room = roomRepository.findById(String.valueOf(roomId))
                .orElseThrow(() -> new Exception("Room not found"));

        // Assign the resident to the room
        resident.assignToRoom(room);  // This calls room.decreaseFreeBeds()

        // Save the updated resident and room
        residentRepository.save(resident);
        roomRepository.save(room);
    }


}
