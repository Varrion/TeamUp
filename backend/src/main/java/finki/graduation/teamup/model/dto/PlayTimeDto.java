package finki.graduation.teamup.model.dto;

import finki.graduation.teamup.model.enums.FieldStatus;
import lombok.Data;
import org.springframework.lang.Nullable;

import java.time.LocalDateTime;

@Data
public class PlayTimeDto {
    @Nullable
    Long id;

    FieldStatus fieldStatus;

    LocalDateTime gameStartTime;

    LocalDateTime gameEndTime;

    Long teamId;
}
