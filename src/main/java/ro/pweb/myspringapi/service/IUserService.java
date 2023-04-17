package ro.pweb.myspringapi.service;

import ro.pweb.myspringapi.entity.User;

import java.util.List;

public interface IUserService {

    List<User> getUsers();
    void createUser(User user);
    void updateUser(Long id, User user);
    void deleteUser(Long id);

}
