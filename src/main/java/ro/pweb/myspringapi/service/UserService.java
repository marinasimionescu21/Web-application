package ro.pweb.myspringapi.service;

import org.springframework.stereotype.Service;
import ro.pweb.myspringapi.entity.User;
import ro.pweb.myspringapi.repository.UserRepository;

import java.util.List;
import java.util.Optional;
@Service
public class UserService implements IUserService {
    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public void createUser(User user) {
        validateEmail(user.getEmailAddress());
        userRepository.save(user);
    }

    @Override
    public Optional<User> getById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public User updateUser(Long id, User user) {
        User userToUpdate = userRepository.findById(id).orElseThrow(
                () -> new IllegalStateException(String.format("User with id %s doesn't exist", id)));

        if(!user.getEmailAddress().isEmpty()) {
            userToUpdate.setEmailAddress(user.getEmailAddress());
        }
        if(!user.getRole().isEmpty()) {
            userToUpdate.setRole(user.getRole());
        }

        return userRepository.save(userToUpdate);
    }

    private void validateEmail(String email) {
        Optional<User> userOptional = userRepository.getUserByEmailAddress(email);
        if(userOptional.isPresent() && !email.isEmpty()) {
            throw new IllegalStateException(String.format("Email address %s already exists", email));
        }
    }

    public void deleteUser(Long id) {
        boolean userExists = userRepository.existsById(id);
        if (!userExists) {
            throw new IllegalStateException(String.format("User with id %s does not exists"));
        }
        userRepository.deleteById(id);
    }

}