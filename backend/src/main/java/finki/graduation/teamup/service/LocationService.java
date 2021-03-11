package finki.graduation.teamup.service;

import finki.graduation.teamup.model.Location;
import finki.graduation.teamup.model.dto.LocationDto;
import finki.graduation.teamup.service.base.BaseGetDeleteService;
import finki.graduation.teamup.service.base.BaseSaveUpdateService;

public interface LocationService extends BaseGetDeleteService<LocationDto, Long, Void>, BaseSaveUpdateService<LocationDto, Long> {
    Location findLocationOrThrowException(Long id);
}
