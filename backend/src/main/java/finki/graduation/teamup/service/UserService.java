package finki.graduation.teamup.service;

import finki.graduation.teamup.model.dto.UserDto;
import finki.graduation.teamup.model.enums.Role;
import finki.graduation.teamup.service.base.BaseGetDeleteService;
import finki.graduation.teamup.service.base.BaseSaveUpdateService;

public interface UserService extends BaseGetDeleteService<UserDto, Long, Role>, BaseSaveUpdateService<UserDto, Long> {
}
