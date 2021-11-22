package finki.graduation.teamup.model;

import finki.graduation.teamup.model.base.BaseCreatedOnDeletedOn;
import finki.graduation.teamup.model.enums.TeamMemberStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Where;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Where(clause = "deleted_on is null")
public class TeamMember extends BaseCreatedOnDeletedOn {
    @ManyToOne
    Team team;

    @ManyToOne
    User teamMember;

    @Enumerated(EnumType.STRING)
    TeamMemberStatus memberStatus;

    boolean isTeamLead;
}