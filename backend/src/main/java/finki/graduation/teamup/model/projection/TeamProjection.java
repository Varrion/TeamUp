package finki.graduation.teamup.model.projection;

import finki.graduation.teamup.model.projection.base.BaseIdNameDescriptionProjection;

public interface TeamProjection extends BaseIdNameDescriptionProjection {
    Integer getSize();

    String getTeamStatus();
}
