package finki.graduation.teamup.model.dto;

import lombok.Value;

import java.time.LocalDateTime;

@Value
public class PlayTimeDto {
    String fieldStatus;

    LocalDateTime gameStartTime;

    LocalDateTime gameEndTime;
}
