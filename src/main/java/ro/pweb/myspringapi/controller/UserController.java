package ro.pweb.myspringapi.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.pweb.myspringapi.exceptions.UserNotFoundException;
import ro.pweb.myspringapi.service.UserService;
import ro.pweb.myspringapi.entity.User;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/v1/users")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = userService.getUsers();
        return ResponseEntity.ok().body(users);
    }

    @GetMapping(path = "{id}")
    public Optional<User> getUserById(@PathVariable Long id) {
        Optional<User> user = userService.getById(id);
        return ResponseEntity.ok().body(user).getBody();
    }

    @PostMapping("/create")
    public HttpStatus createUser(@RequestBody User user) throws Exception {
        try {
            userService.createUser(user);
            return HttpStatus.CREATED;
        } catch (Exception e) {
            throw new Exception();
        }
    }

    @PutMapping(path = "{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        User newUser = userService.updateUser(id, user);
        return ResponseEntity.ok().body(newUser).getBody();
    }

    @DeleteMapping(path = "{id}")
    public HttpStatus deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return HttpStatus.OK;
        } catch (Exception e) {
            throw new UserNotFoundException(id);
        }
    }
}
