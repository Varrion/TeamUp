package finki.graduation.teamup.service.mapper;

import finki.graduation.teamup.model.PlayTime;
import finki.graduation.teamup.model.dto.PlayTimeDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface PlayTimeDtoMapper {
    PlayTimeDtoMapper INSTANCE = Mappers.getMapper(PlayTimeDtoMapper.class);

    @Mapping(target = "playingField.id", source = "fieldId")
    PlayTimeDto toDto(PlayTime playTime);
}
