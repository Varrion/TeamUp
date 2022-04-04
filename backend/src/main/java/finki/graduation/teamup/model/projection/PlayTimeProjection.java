package finki.graduation.teamup.model.projection;

import finki.graduation.teamup.model.Team;
import finki.graduation.teamup.model.projection.base.BaseIdProjection;

import java.time.LocalDateTime;
import java.util.Optional;

public interface PlayTimeProjection extends BaseIdProjection {
    String getFieldStatus();

    LocalDateTime getGameStartTime();

    LocalDateTime getGameEndTime();

    Optional<Team> getTeam();
}
