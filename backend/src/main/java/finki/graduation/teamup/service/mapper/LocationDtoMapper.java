package finki.graduation.teamup.service.mapper;

import finki.graduation.teamup.model.Location;
import finki.graduation.teamup.model.dto.LocationDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface LocationDtoMapper {
    LocationDtoMapper INSTANCE = Mappers.getMapper(LocationDtoMapper.class);

    LocationDto toDto(Location location);
}
