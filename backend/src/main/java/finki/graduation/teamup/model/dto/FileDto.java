package finki.graduation.teamup.model.dto;

import finki.graduation.teamup.model.enums.FileEntityType;
import lombok.Value;

@Value
public class FileDto {
    FileEntityType entityType;

    Long entityId;
}
