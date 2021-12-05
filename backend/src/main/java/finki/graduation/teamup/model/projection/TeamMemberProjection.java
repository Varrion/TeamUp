package finki.graduation.teamup.model.projection;

import finki.graduation.teamup.model.TeamMember;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "teamMember", types = {TeamMember.class})
public interface TeamMemberProjection {
    TeamProjection getTeam();

    UserProjection getTeamMember();
}
