package finki.graduation.teamup.model;

import finki.graduation.teamup.model.base.BaseCreatedOnDeletedOn;
import finki.graduation.teamup.model.enums.TeamMemberStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.Objects;

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
    User user;

    @Enumerated(EnumType.STRING)
    TeamMemberStatus memberStatus;

    boolean isTeamLead;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof TeamMember)) return false;
        TeamMember that = (TeamMember) o;
        return isTeamLead() == that.isTeamLead() && getTeam().equals(that.getTeam()) && getUser().equals(that.getUser()) && getMemberStatus() == that.getMemberStatus();
    }

    @Override
    public int hashCode() {
        return Objects.hash(getTeam(), getUser(), getMemberStatus(), isTeamLead());
    }
}
