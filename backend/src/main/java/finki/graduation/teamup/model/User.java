package finki.graduation.teamup.model;

import finki.graduation.teamup.model.base.BaseDescription;
import finki.graduation.teamup.model.dto.UserDto;
import finki.graduation.teamup.model.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Where;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;
import java.util.Objects;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Where(clause = "deleted_on is null")
public class User extends BaseDescription implements UserDetails, Serializable {
    @Column(nullable = false)
    String username;

    @Column(nullable = false)
    String password;

    @Column(nullable = false)
    String surname;

    Integer age;

    @OneToOne(mappedBy = "user", orphanRemoval = true, cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    PersonalInfo personalInfo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    Role role;

    boolean isAccountNonExpired = true;

    boolean isAccountNonLocked = true;

    boolean isCredentialsNonExpired = true;

    boolean isEnabled = true;

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
        personalInfo.setDeletedOn(dateTimeNow);
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
