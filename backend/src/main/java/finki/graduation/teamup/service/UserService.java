package finki.graduation.teamup.service;

import finki.graduation.teamup.model.dto.UserDto;
import finki.graduation.teamup.model.dto.UserLoginDto;
import finki.graduation.teamup.model.enums.Role;
import finki.graduation.teamup.model.projection.UserProjection;
import finki.graduation.teamup.service.base.BaseFileService;
import finki.graduation.teamup.service.base.BaseGetDeleteService;
import finki.graduation.teamup.service.base.BaseSaveUpdateService;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService, BaseGetDeleteService<UserProjection, String, Role>, BaseSaveUpdateService<UserProjection, UserDto, String>, BaseFileService<String> {
    void loginUser(UserLoginDto userLoginDto);

    List<UserProjection> getAllMembersInTeam(Long teamId);

    List<UserProjection> getAllPendingMembersForTeam(Long teamId);
}
