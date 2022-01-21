package finki.graduation.teamup.service;

import finki.graduation.teamup.model.Location;
import finki.graduation.teamup.model.dto.LocationDto;
import finki.graduation.teamup.model.projection.LocationProjection;
import finki.graduation.teamup.service.base.BaseGetDeleteService;
import finki.graduation.teamup.service.base.BaseSaveUpdateService;

public interface LocationService extends BaseGetDeleteService<LocationProjection, Long, Void>, BaseSaveUpdateService<LocationDto, Long> {
    Location findLocationOrThrowException(Long id);
}
