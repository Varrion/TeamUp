package finki.graduation.teamup.model.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PlayTimeDto {
    String fieldStatus;

    LocalDateTime gameStartTime;

    LocalDateTime gameEndTime;
}
