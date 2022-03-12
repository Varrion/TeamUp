package finki.graduation.teamup.model.dto;

import finki.graduation.teamup.model.enums.FieldStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PlayTimeDto {
    FieldStatus fieldStatus;

    LocalDateTime gameStartTime;

    LocalDateTime gameEndTime;
}
