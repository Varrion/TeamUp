package finki.graduation.teamup.model.projection;

import finki.graduation.teamup.model.TeamMember;
import finki.graduation.teamup.model.enums.TeamMemberStatus;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "teamMember", types = {TeamMember.class})
public interface TeamMemberProjection {
    boolean getIsTeamLead();

    TeamMemberStatus getMemberStatus();

    UserProjection getUser();
}
