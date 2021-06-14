package finki.graduation.teamup.service.impl;

import finki.graduation.teamup.model.PersonalInfo;
import finki.graduation.teamup.model.User;
import finki.graduation.teamup.model.dto.UserDto;
import finki.graduation.teamup.model.enums.Role;
import finki.graduation.teamup.model.projection.UserProjection;
import finki.graduation.teamup.repository.UserRepository;
import finki.graduation.teamup.service.factory.PersonalInfoFactory;
import finki.graduation.teamup.service.UserService;
import org.springframework.data.projection.ProjectionFactory;
import org.springframework.data.projection.SpelAwareProxyProjectionFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
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
    public List<UserProjection> getAllMembersInTeam(Long teamId) {
        return userRepository.findAllMembersInTeam(teamId);
    }

    @Override
    public List<UserProjection> getAllPendingMembersForTeam(Long teamId) {
        return userRepository.findAllPendingMembersForTeam(teamId);
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
        LocalDateTime dateTimeNow = LocalDateTime.now();

        user.setCreatedOn(dateTimeNow);
        user.setUsername(entityDto.getUsername());
        user.setPassword(entityDto.getPassword());
        user.setAge(entityDto.getAge());
        user.setName(entityDto.getName());
        user.setSurname(entityDto.getSurname());
        user.setDescription(entityDto.getDescription());

        PersonalInfo personalInfo = PersonalInfoFactory.setPersonalInfo(entityDto, null);
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
            PersonalInfo personalInfo = PersonalInfoFactory.setPersonalInfo(entityDto, user.getPersonalInfo());
            user.setPersonalInfo(personalInfo);

            Role role = Role.valueOf(entityDto.getRoleType());
            user.setRole(role);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        userRepository.save(user);

        ProjectionFactory pf = new SpelAwareProxyProjectionFactory();
        return pf.createProjection(UserProjection.class, user);
    }
}
