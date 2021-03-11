package finki.graduation.teamup.service.mapper;

import finki.graduation.teamup.model.Team;
import finki.graduation.teamup.model.dto.TeamDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface TeamDtoMapper {
    TeamDtoMapper INSTANCE = Mappers.getMapper(TeamDtoMapper.class);

    TeamDto toDto(Team team);
}
