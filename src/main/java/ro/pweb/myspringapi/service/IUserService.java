package ro.pweb.myspringapi.service;

import ro.pweb.myspringapi.entity.User;

import java.util.List;
import java.util.Optional;

public interface IUserService {

    List<User> getUsers();
    void createUser(User user);
    User updateUser(Long id, User user);
    void deleteUser(Long id);
    Optional<User> getById(Long id);

}
