package finki.graduation.teamup.model.dto;

import finki.graduation.teamup.model.enums.FieldType;
import finki.graduation.teamup.model.enums.Sport;
import lombok.Data;

@Data
public class PlayingFieldDto {
    String name;

    String description;

    FieldType fieldType;

    Sport fieldFor;
}
