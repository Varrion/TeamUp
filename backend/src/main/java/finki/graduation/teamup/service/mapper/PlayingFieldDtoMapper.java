package finki.graduation.teamup.service.mapper;

import finki.graduation.teamup.model.PlayingField;
import finki.graduation.teamup.model.dto.PlayingFieldDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface PlayingFieldDtoMapper {
    PlayingFieldDtoMapper INSTANCE = Mappers.getMapper(PlayingFieldDtoMapper.class);

    PlayingFieldDto toDto(PlayingField playingField);
}
