package finki.graduation.teamup.model.projection;

import finki.graduation.teamup.model.Team;
import finki.graduation.teamup.model.projection.base.BaseNameDescriptionProjection;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "team", types = {Team.class})
public interface TeamProjection extends BaseNameDescriptionProjection {
    Integer getSize();

    String getTeamStatus();
}
