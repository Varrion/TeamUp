package finki.graduation.teamup.service;

import finki.graduation.teamup.model.dto.PlayingFieldDto;
import finki.graduation.teamup.model.projection.PlayingFieldProjection;
import finki.graduation.teamup.service.base.BaseFileService;
import finki.graduation.teamup.service.base.BaseGetDeleteService;

public interface PlayingFieldService extends FieldPlayTimeService, BaseGetDeleteService<PlayingFieldProjection, Long, Long>, BaseFileService<Long> {
    Long save(PlayingFieldDto playingFieldDto, Long locationId);

    void update(PlayingFieldDto playingFieldDto, Long fieldId);
}
