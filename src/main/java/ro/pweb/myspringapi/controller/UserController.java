package ro.pweb.myspringapi.controller;

import org.springframework.web.bind.annotation.*;
import ro.pweb.myspringapi.exceptions.UserNotFoundException;
import ro.pweb.myspringapi.service.UserService;
import ro.pweb.myspringapi.entity.User;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/v1/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(value ="api/v1/users", method = RequestMethod.GET)
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @RequestMapping(value ="api/v1/users/id", method = RequestMethod.GET)
    public Optional<User> getUserById(@PathVariable Long id) {
        return Optional.ofNullable(userService.getById(id)
                .orElseThrow(() -> new UserNotFoundException(id)));
    }

    @PostMapping
    public void createUser(@RequestBody User user) {
        userService.createUser(user);
    }

    @PutMapping(path = "{id}")
    public void updateUser(@PathVariable Long id, @RequestBody User user) {
        userService.updateUser(id, user);
    }

    @DeleteMapping(path = "{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
