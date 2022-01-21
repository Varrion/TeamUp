package finki.graduation.teamup.controller;

import finki.graduation.teamup.model.dto.UserDto;
import finki.graduation.teamup.model.dto.UserLoginDto;
import finki.graduation.teamup.model.enums.Role;
import finki.graduation.teamup.model.projection.UserProjection;
import finki.graduation.teamup.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "api/users")
public class UserController extends FileController<String> {
    private final UserService userService;

    public UserController(UserService userService) {
        super(userService);
        this.userService = userService;
    }

    @GetMapping
    public List<UserProjection> getAllUsers(@RequestParam(value = "userRole", required = false) Role role) {
        return userService.getAll(role);
    }

    @GetMapping("teams/{teamId}/members")
    public List<UserProjection> getAllTeamMembers(@PathVariable Long teamId) {
        return userService.getAllMembersInTeam(teamId);
    }

    @GetMapping("teams/{teamId}/pending")
    public List<UserProjection> getAllTeamPendingMembers(@PathVariable Long teamId) {
        return userService.getAllPendingMembersForTeam(teamId);
    }

    @GetMapping("{username}")
    public UserProjection getUserDetails(@PathVariable String username) {
        return userService.getById(username);
    }

    @PostMapping
    public String registerUser(@RequestBody UserDto userDto) {
        return userService.save(userDto);
    }

    @PostMapping("login")
    public void loginUser(@RequestBody UserLoginDto userLoginDto) {
        userService.loginUser(userLoginDto);
    }

    @PutMapping("{username}")
    public void updateUser(@RequestBody UserDto userDto, @PathVariable String username) {
        userService.update(userDto, username);
    }

    @DeleteMapping("{username}")
    public void deleteUser(@PathVariable String username) {
        userService.deleteById(username);
    }
}
