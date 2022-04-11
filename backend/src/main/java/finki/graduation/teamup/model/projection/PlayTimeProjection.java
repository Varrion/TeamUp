package finki.graduation.teamup.model.projection;

import finki.graduation.teamup.model.PlayTime;
import finki.graduation.teamup.model.projection.base.BaseIdProjection;
import org.springframework.data.rest.core.config.Projection;

import java.time.LocalDateTime;

@Projection(name = "playTime", types = {PlayTime.class})
public interface PlayTimeProjection extends BaseIdProjection {
    String getFieldStatus();

    LocalDateTime getGameStartTime();

    LocalDateTime getGameEndTime();

    TeamProjection getTeam();

    PlayingFieldProjection getPlayingField();
}
