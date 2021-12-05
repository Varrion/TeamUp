package finki.graduation.teamup.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import finki.graduation.teamup.model.base.BaseDescription;
import finki.graduation.teamup.model.enums.TeamStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.Hibernate;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Where(clause = "deleted_on is null")
public class Team extends BaseDescription {
    Integer size;

    @Enumerated(EnumType.STRING)
    TeamStatus teamStatus;

    @OneToMany
    Set<Game> games;

    @OneToMany(mappedBy = "team")
    Set<TeamMember> teamMembers = new HashSet<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Team team = (Team) o;
        return id != null && Objects.equals(id, team.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
