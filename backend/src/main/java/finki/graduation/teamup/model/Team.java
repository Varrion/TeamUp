package finki.graduation.teamup.model;

import finki.graduation.teamup.model.base.BaseDescription;
import finki.graduation.teamup.model.enums.TeamStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Where(clause = "deleted_on is null")
public class Team extends BaseDescription {
    Integer size;

    @Enumerated(EnumType.STRING)
    TeamStatus teamStatus;

    @OneToOne
    User teamLead;

    @OneToMany
    Set<Game> games;

    @OneToMany
    Set<User> members;

    @ManyToMany(mappedBy = "joiningTeams")
    Set<User> pendingMembers;
}
