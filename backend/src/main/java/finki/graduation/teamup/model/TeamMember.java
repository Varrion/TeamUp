package finki.graduation.teamup.model;

import finki.graduation.teamup.model.base.BaseCreatedOnDeletedOn;
import finki.graduation.teamup.model.enums.TeamMemberStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Where(clause = "deleted_on is null")
public class TeamMember extends BaseCreatedOnDeletedOn {
    @ManyToOne(fetch = FetchType.LAZY)
    Team team;

    @ManyToOne(fetch = FetchType.LAZY)
    User teamMember;

    @Enumerated(EnumType.STRING)
    TeamMemberStatus memberStatus;

    boolean isTeamLead;
}
