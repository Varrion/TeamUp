package finki.graduation.teamup.model.projection;

import finki.graduation.teamup.model.Team;
import finki.graduation.teamup.model.projection.base.BaseNameDescriptionProjection;
import org.springframework.data.rest.core.config.Projection;

import java.util.Set;

@Projection(name = "team", types = {Team.class})
public interface TeamProjection extends BaseNameDescriptionProjection {
    Long getId();

    Integer getSize();

    String getTeamStatus();

    Set<TeamMemberProjection> getTeamMembers();

    FileProjection getLogo();
}
