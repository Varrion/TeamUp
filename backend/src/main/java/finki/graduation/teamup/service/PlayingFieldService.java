package finki.graduation.teamup.service;

import finki.graduation.teamup.model.dto.PlayingFieldDto;
import finki.graduation.teamup.model.projection.PlayingFieldProjection;
import finki.graduation.teamup.service.base.BaseGetDeleteService;

public interface PlayingFieldService extends FieldPlayTimeService, BaseGetDeleteService<PlayingFieldProjection, Long, Long> {
    PlayingFieldProjection save(PlayingFieldDto playingFieldDto, Long locationId);

    PlayingFieldProjection update(PlayingFieldDto playingFieldDto, Long fieldId);
}
