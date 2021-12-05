package finki.graduation.teamup.controller;

import finki.graduation.teamup.model.File;
import finki.graduation.teamup.model.dto.UserDto;
import finki.graduation.teamup.model.dto.UserLoginDto;
import finki.graduation.teamup.model.enums.Role;
import finki.graduation.teamup.model.projection.UserProjection;
import finki.graduation.teamup.service.UserService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
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
    public UserProjection registerUser(@RequestBody UserDto userDto) {
        return userService.save(userDto);
    }

    @PostMapping("login")
    public void loginUser(@RequestBody UserLoginDto userLoginDto) {
        userService.loginUser(userLoginDto);
    }

    @PutMapping("{username}")
    public UserProjection updateUser(@RequestBody UserDto userDto, @PathVariable String username) {
        return userService.update(userDto, username);
    }

    @PostMapping(value = "{username}/files")
    public void uploadFile(@RequestPart("file") MultipartFile multipartFile, @PathVariable String username) throws Exception {
        userService.saveFileToEntity(username, multipartFile);
    }

    @GetMapping("{username}/files")
    public Set<File> getAllFilesForUser(@PathVariable String username) {
        return userService.getFileByEntityId(username);
    }

    @DeleteMapping("{username}")
    public void deleteUser(@PathVariable String username) {
        userService.deleteById(username);
    }
}
