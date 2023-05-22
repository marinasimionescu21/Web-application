package ro.pweb.myspringapi.controller;

import jakarta.annotation.security.RolesAllowed;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.pweb.myspringapi.dto.UserDTO;
import ro.pweb.myspringapi.exceptions.UserNotFoundException;
import ro.pweb.myspringapi.service.UserService;
import ro.pweb.myspringapi.entity.User;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "api/v1/users")
public class UserController {

    private UserService userService;
    @Autowired
    private ModelMapper modelMapper;

    public UserController(UserService userService) {
        this.userService = userService;
}

    @GetMapping("/all")
    public ResponseEntity<List<UserDTO>> getUsers() {
        return ResponseEntity.ok().body(userService.getUsers()
                .stream().map(user -> modelMapper.map(user, UserDTO.class))
                .collect(Collectors.toList()));
    }

    @GetMapping(path = "{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        Optional<User> user = userService.getById(id);
        UserDTO userDTO = modelMapper.map(user, UserDTO.class);
        return ResponseEntity.ok().body(userDTO);
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

    @RolesAllowed("Admin")
    @PutMapping(path = "{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        User newUser = userService.updateUser(id, user);
        return ResponseEntity.ok().body(newUser).getBody();
    }

    @RolesAllowed("Admin")
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
