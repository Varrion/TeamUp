package finki.graduation.teamup.service.impl;

import finki.graduation.teamup.model.PersonalInfo;
import finki.graduation.teamup.model.User;
import finki.graduation.teamup.model.UserRole;
import finki.graduation.teamup.model.dto.UserDto;
import finki.graduation.teamup.model.enums.Role;
import finki.graduation.teamup.repository.UserRepository;
import finki.graduation.teamup.service.PersonalInfoFactory;
import finki.graduation.teamup.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserDetailsService, UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserServiceImpl(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        User user = userRepository.findUserByUsername(userName, Role.User)
                .orElseThrow(() -> new UsernameNotFoundException("User Name is not Found"));

//            List<Role> roleList = new ArrayList<>();
//            for (UserRole userRole : user.getRoles()) {
//                roleList.add(userRole.getRole());
//            }

        return User.builder()
                .username(user.getUsername())
                //change here to store encoded password in db
                .password(bCryptPasswordEncoder.encode(user.getPassword()))
                .disabled(user.getDisabled())
                .accountExpired(user.getAccountExpired())
                .accountLocked(user.getAccountLocked())
                .credentialsExpired(user.getCredentialsExpired())
                .userRole(user.getUserRole())
                .build();

    }

    @Override
    public List<UserDto> getAll(Role role) {
        return userRepository.findAllUsers(role);
    }

    @Override
    public UserDto getById(Long id) {
        return userRepository.findOneUserById(id);
    }

    @Override
    public void deleteById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        user.deleteUser();

        userRepository.save(user);
    }

    @Override
    public UserDto save(UserDto entityDto) {
        User user = new User();
        LocalDateTime dateTimeNow = LocalDateTime.now();

        user.setCreatedOn(dateTimeNow);
        user.setUsername(entityDto.getUsername());
        user.setPassword(entityDto.getPassword());
        user.setAge(entityDto.getAge());
        user.setName(entityDto.getName());
        user.setDescription(entityDto.getDescription());

        PersonalInfo personalInfo = PersonalInfoFactory.setPersonalInfo(entityDto, Optional.empty());
        UserRole userRole = setUserRole(entityDto, Optional.empty());

        user.setUserRole(userRole);
        user.setPersonalInfo(personalInfo);

        userRepository.save(user);
        return entityDto;
    }

    @Override
    public UserDto update(UserDto entityDto, Long entityId) {
        User user = userRepository.findById(entityId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if (user.getDeletedOn() == null) {
            user.updateUser(entityDto);
            PersonalInfo personalInfo = PersonalInfoFactory.setPersonalInfo(entityDto, Optional.ofNullable(user.getPersonalInfo()));
            UserRole userRole = setUserRole(entityDto, Optional.ofNullable(user.getUserRole()));

            user.setPersonalInfo(personalInfo);
            user.setUserRole(userRole);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        userRepository.save(user);
        return entityDto;
    }

    private UserRole setUserRole(UserDto userDto, Optional<UserRole> optionalUserRole) {
        LocalDateTime dateTimeNow = LocalDateTime.now();
        UserRole userRole = new UserRole();

        if (!optionalUserRole.isPresent()) {
            userRole.setCreatedOn(dateTimeNow);
        } else {
            userRole = optionalUserRole.get();
        }

        Role role = Role.valueOf(userDto.getRoleType());
        userRole.setCreatedOn(dateTimeNow);
        userRole.setRole(role);

        return userRole;
    }
}
