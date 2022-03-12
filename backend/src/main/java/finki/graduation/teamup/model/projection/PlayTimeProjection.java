package finki.graduation.teamup.model.projection;

import finki.graduation.teamup.model.projection.base.BaseIdProjection;

import java.time.LocalDateTime;

public interface PlayTimeProjection extends BaseIdProjection {
    String getFieldStatus();

    LocalDateTime getGameStartTime();

    LocalDateTime getGameEndTime();
}
