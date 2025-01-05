package ro.pweb.myspringapi.service;

import org.springframework.stereotype.Service;
import ro.pweb.myspringapi.entity.ContactPerson;
import ro.pweb.myspringapi.entity.Resident;
import ro.pweb.myspringapi.repository.ContactPersonRepository;
import ro.pweb.myspringapi.repository.ResidentRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ContactPersonService {

    private final ContactPersonRepository contactPersonRepository;
    private final ResidentRepository residentRepository;

    public ContactPersonService(ContactPersonRepository contactPersonRepository, ResidentRepository residentRepository) {
        this.contactPersonRepository = contactPersonRepository;
        this.residentRepository = residentRepository;
    }

    // Create a new contact person for a resident
    public ContactPerson createContactPerson(Long residentCnp, ContactPerson contactPerson) throws Exception {
        Resident resident = residentRepository.findByCnp(residentCnp)
                .orElseThrow(() -> new Exception("Resident not found"));
        contactPerson.setResident(resident);
        return contactPersonRepository.save(contactPerson);
    }

    // Get all contact persons for a resident
    public List<ContactPerson> getContactPersonsByResident(Long residentCnp) {
        return contactPersonRepository.findByResidentCnp(residentCnp);
    }

    // Get a specific contact person by ID
    public ContactPerson getContactPersonById(Long id) throws Exception {
        return contactPersonRepository.findById(id)
                .orElseThrow(() -> new Exception("Contact person not found"));
    }

    // Update an existing contact person
    public ContactPerson updateContactPerson(Long id, ContactPerson contactPersonDetails) throws Exception {
        ContactPerson contactPerson = contactPersonRepository.findById(id)
                .orElseThrow(() -> new Exception("Contact person not found"));

        contactPerson.setName(contactPersonDetails.getName());
        contactPerson.setPhoneNumber(contactPersonDetails.getPhoneNumber());
        contactPerson.setEmail(contactPersonDetails.getEmail());
        contactPerson.setAddress(contactPersonDetails.getAddress());

        return contactPersonRepository.save(contactPerson);
    }

    // Delete a contact person
    public void deleteContactPerson(Long id) {
        contactPersonRepository.deleteById(id);
    }
}
