package finki.graduation.teamup.service.impl;

import finki.graduation.teamup.model.User;
import finki.graduation.teamup.model.enums.Role;
import finki.graduation.teamup.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LocationOwnerServiceImpl implements UserDetailsService {
    private final UserRepository usersRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public LocationOwnerServiceImpl(UserRepository usersRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.usersRepository = usersRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        User user = usersRepository.findUserByUsername(userName, Role.LocationOwner)
                .orElseThrow(() -> new UsernameNotFoundException("User Name is not Found"));

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
}
