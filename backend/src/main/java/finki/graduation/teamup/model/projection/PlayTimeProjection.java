package finki.graduation.teamup.model.projection;

import java.time.LocalDateTime;

public interface PlayTimeProjection {
    String getFieldStatus();

    LocalDateTime getGameStartTime();

    LocalDateTime getGameEndTime();
}
