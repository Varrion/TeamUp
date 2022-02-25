package finki.graduation.teamup.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import finki.graduation.teamup.model.dto.UserDto;
import finki.graduation.teamup.model.enums.Gender;
import finki.graduation.teamup.model.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.Where;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.*;

@Entity
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Where(clause = "deleted_on is null")
public class User extends PersonalInfo implements UserDetails, Serializable {
    @Column(nullable = false)
    String username;

    @Column(nullable = false)
    String password;

    @Column(nullable = false)
    String surname;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    Role role;

    @Enumerated(EnumType.STRING)
    Gender gender;

    @OneToOne(orphanRemoval = true, mappedBy = "owner", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    Location ownedLocations;

    @OneToMany(orphanRemoval = true)
    Set<File> files;

    @ManyToOne
    Game game;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    Set<TeamMember> teamMembers = new HashSet<>();

    boolean isAccountNonExpired = true;

    boolean isAccountNonLocked = true;

    boolean isCredentialsNonExpired = true;

    boolean isEnabled = true;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(role);
    }

    @Override
    public boolean isAccountNonExpired() {
        return isAccountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return isAccountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return isCredentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return isEnabled;
    }

    public void deleteUser() {
        LocalDateTime dateTimeNow = LocalDateTime.now();
        setDeletedOn(dateTimeNow);
    }

    public void updateUser(UserDto userDto) {
        setName(userDto.getName());
        setSurname(userDto.getSurname());
        setDescription(userDto.getDescription());
        setPassword(userDto.getPassword());
        setGender(Gender.valueOf(userDto.getGender()));

        updatePersonalInfo(userDto);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User user)) return false;
        return getUsername().equals(user.getUsername()) && getPassword().equals(user.getPassword()) && getSurname().equals(user.getSurname());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getUsername(), getPassword(), getSurname());
    }
}
