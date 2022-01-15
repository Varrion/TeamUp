package finki.graduation.teamup.service.impl;

import finki.graduation.teamup.model.File;
import finki.graduation.teamup.model.PersonalInfo;
import finki.graduation.teamup.model.User;
import finki.graduation.teamup.model.dto.UserDto;
import finki.graduation.teamup.model.dto.UserLoginDto;
import finki.graduation.teamup.model.enums.FileType;
import finki.graduation.teamup.model.enums.Role;
import finki.graduation.teamup.model.enums.TeamMemberStatus;
import finki.graduation.teamup.model.exceptions.InvalidArgumentsException;
import finki.graduation.teamup.model.projection.UserProjection;
import finki.graduation.teamup.repository.UserRepository;
import finki.graduation.teamup.service.FileService;
import finki.graduation.teamup.service.UserService;
import finki.graduation.teamup.service.factory.PersonalInfoFactory;
import org.springframework.data.projection.ProjectionFactory;
import org.springframework.data.projection.SpelAwareProxyProjectionFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final FileService fileService;

    public UserServiceImpl(UserRepository userRepository, FileService fileService) {
        this.userRepository = userRepository;
        this.fileService = fileService;
    }

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        return userRepository.findByUsername(userName)
                .orElseThrow(() -> new UsernameNotFoundException("User Name is not Found"));
    }

    @Override
    public List<UserProjection> getAll(Role role) {
        return userRepository.findAllUsers(role);
    }


    @Override
    public void loginUser(UserLoginDto userLoginDto) {
        if (userLoginDto.getUsername() == null || userLoginDto.getUsername().isEmpty() || userLoginDto.getPassword() == null || userLoginDto.getPassword().isEmpty()) {
            throw new InvalidArgumentsException();
        }

        loadUserByUsername(userLoginDto.getUsername());
    }

    @Override
    public List<UserProjection> getAllMembersInTeam(Long teamId) {
        return userRepository.findAllMembersInTeamByStatus(teamId, TeamMemberStatus.Accepted);
    }

    @Override
    public List<UserProjection> getAllPendingMembersForTeam(Long teamId) {
        return userRepository.findAllMembersInTeamByStatus(teamId, TeamMemberStatus.PendingToBeAcceptedInTeam);
    }

    @Override
    public UserProjection getById(String username) {
        return userRepository.takeUserByUsername(username);
    }

    @Override
    public void deleteById(String username) {
        User user = (User) loadUserByUsername(username);
        user.deleteUser();
    }

    @Override
    public UserProjection save(UserDto entityDto) {
        if (userRepository.checkIfUsernameAndEmailAreUnique(entityDto.getUsername(), entityDto.getEmail()) != 0) {
            throw new ResponseStatusException(HttpStatus.CONFLICT);
        }

        User user = new User();

        user.setUsername(entityDto.getUsername());
        user.setPassword(entityDto.getPassword());
        user.setName(entityDto.getName());
        user.setSurname(entityDto.getSurname());
        user.setDescription(entityDto.getDescription());

        PersonalInfo personalInfo = PersonalInfoFactory.setPersonalInfo(entityDto, null, false);
        personalInfo.setUser(user);
        user.setPersonalInfo(personalInfo);

        if (entityDto.getRoleType() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        Role role = Role.valueOf(entityDto.getRoleType());
        user.setRole(role);

        userRepository.save(user);

        ProjectionFactory pf = new SpelAwareProxyProjectionFactory();
        return pf.createProjection(UserProjection.class, user);
    }

    @Override
    public UserProjection update(UserDto entityDto, String username) {
        User user = (User) loadUserByUsername(username);
        if (user.getDeletedOn() == null) {
            user.updateUser(entityDto);
            PersonalInfo personalInfo = PersonalInfoFactory.setPersonalInfo(entityDto, user.getPersonalInfo(), false);
            user.setPersonalInfo(personalInfo);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        userRepository.save(user);

        ProjectionFactory pf = new SpelAwareProxyProjectionFactory();
        return pf.createProjection(UserProjection.class, user);
    }

    @Override
    public void saveFileToEntity(String id, MultipartFile multipartFile, String fileType) throws Exception {
        User user = (User) loadUserByUsername(id);
        FileType type = FileType.valueOf(fileType);

        File file = fileService.save(multipartFile, type);
        Set<File> userFiles = user.getFiles();
        userFiles.add(file);
        user.setFiles(userFiles);

        userRepository.save(user);
    }

    @Override
    public Set<File> getFileByEntityId(String id) {
        User user = (User) loadUserByUsername(id);
        return user.getFiles();
    }
}
