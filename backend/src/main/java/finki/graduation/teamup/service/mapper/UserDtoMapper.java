package finki.graduation.teamup.service.mapper;

import finki.graduation.teamup.model.User;
import finki.graduation.teamup.model.dto.UserDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserDtoMapper {
    UserDtoMapper INSTANCE = Mappers.getMapper(UserDtoMapper.class);

//    @Mapping(target = "personalInfo.email", source = "email")
//    @Mapping(target = "personalInfo.phoneNumber", source = "phoneNumber")
//    @Mapping(target = "personalInfo.city", source = "city")
//    @Mapping(target = "personalInfo.address", source = "address")
//    @Mapping(source = "roleType", target = "userRole.role")
    UserDto toDto(User user);
}
