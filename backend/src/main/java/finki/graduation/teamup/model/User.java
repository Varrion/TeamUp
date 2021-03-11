package finki.graduation.teamup.model;

import finki.graduation.teamup.model.base.BaseDescription;
import finki.graduation.teamup.model.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Objects;
import java.util.Set;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseDescription implements UserDetails {
    String username;

    String password;

    String surname;

    Integer age;

    @OneToOne(mappedBy = "user", orphanRemoval = true)
    PersonalInfo personalInfo;

    @OneToOne(mappedBy = "user", orphanRemoval = true)
    UserRole userRole;

    Boolean disabled;

    Boolean accountExpired;

    Boolean accountLocked;

    Boolean credentialsExpired;

    @OneToMany(orphanRemoval = true, mappedBy = "owner")
    Set<Location> ownedLocations;

    @OneToMany(orphanRemoval = true)
    Set<File> files;

    @OneToOne(mappedBy = "teamLead")
    Team teamLead;

    @ManyToMany
    @JoinTable(name = "team_join",
            joinColumns = @JoinColumn(name = "member_id"),
            inverseJoinColumns = @JoinColumn(name = "team_id"))
    Set<Team> joiningTeams;

    @ManyToOne
    Game game;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return accountExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !accountLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return !disabled;
    }

    public void deleteUser() {
        LocalDateTime dateTimeNow = LocalDateTime.now();

        setDeletedOn(dateTimeNow);
        personalInfo.setDeletedOn(dateTimeNow);
        userRole.setDeletedOn(dateTimeNow);
    }

    public void updateUser(UserDto userDto) {
        setName(userDto.getName());
        setSurname(userDto.getSurname());
        setDescription(userDto.getDescription());
        setAge(userDto.getAge());
        setPassword(userDto.getPassword());
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User)) return false;
        User user = (User) o;
        return getUsername().equals(user.getUsername()) && getPassword().equals(user.getPassword()) && getSurname().equals(user.getSurname()) && getAge().equals(user.getAge());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getUsername(), getPassword(), getSurname(), getAge());
    }
}
