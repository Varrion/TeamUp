package finki.graduation.teamup.service.impl;

import finki.graduation.teamup.model.File;
import finki.graduation.teamup.model.User;
import finki.graduation.teamup.model.dto.UserDto;
import finki.graduation.teamup.model.dto.UserLoginDto;
import finki.graduation.teamup.model.enums.FileType;
import finki.graduation.teamup.model.enums.Gender;
import finki.graduation.teamup.model.enums.Role;
import finki.graduation.teamup.model.enums.TeamMemberStatus;
import finki.graduation.teamup.model.exceptions.InvalidArgumentsException;
import finki.graduation.teamup.model.projection.UserProjection;
import finki.graduation.teamup.repository.UserRepository;
import finki.graduation.teamup.service.FileService;
import finki.graduation.teamup.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.authority.AuthorityUtils;
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
        User user = userRepository.findByUsername(userName)
                .orElseGet(() -> userRepository.findByEmail(userName)
                        .orElseThrow(() -> new UsernameNotFoundException("User Name is not Found")));

        AuthorityUtils.createAuthorityList(String.valueOf(user.getRole()));
        return user;
    }

    @Override
    public List<UserProjection> getAll(Role role) {
        return userRepository.findAllUsers(role);
    }


    @Override
    public UserDetails loginUser(UserLoginDto userLoginDto) {
        if (userLoginDto.getUsername().isEmpty() || userLoginDto.getPassword().isEmpty()) {
            throw new InvalidArgumentsException();
        }

        return loadUserByUsername(userLoginDto.getUsername());
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
    public String save(UserDto entityDto) {
        if (userRepository.existsUserByUsernameOrEmail(entityDto.getUsername(), entityDto.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT);
        }

        if (entityDto.getRoleType() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        User user = User.builder()
                .name(entityDto.getName())
                .surname(entityDto.getSurname())
                .description(entityDto.getDescription())
                .username(entityDto.getUsername())
                .password(entityDto.getPassword())
                .gender(Gender.valueOf(entityDto.getGender()))
                .role(Role.valueOf(entityDto.getRoleType()))
                .address(entityDto.getAddress())
                .city(entityDto.getCity())
                .email(entityDto.getEmail())
                .dateOfBirth(entityDto.getDateOfBirth())
                .phoneNumber(entityDto.getPhoneNumber())
                .build();

        userRepository.save(user);
        return user.getUsername();
    }

    @Override
    public void update(UserDto entityDto, String username) {
        User user = (User) loadUserByUsername(username);

        if (!user.getUsername().equals(entityDto.getUsername())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        user.updateUser(entityDto);
        userRepository.save(user);
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
