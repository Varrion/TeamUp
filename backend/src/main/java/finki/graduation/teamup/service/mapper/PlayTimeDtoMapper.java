package finki.graduation.teamup.service.mapper;

import finki.graduation.teamup.model.PlayTime;
import finki.graduation.teamup.model.dto.PlayTimeDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface PlayTimeDtoMapper {
    PlayTimeDtoMapper INSTANCE = Mappers.getMapper(PlayTimeDtoMapper.class);

    PlayTimeDto toDto(PlayTime playTime);
}
