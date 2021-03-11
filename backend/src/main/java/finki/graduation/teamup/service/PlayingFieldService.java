package finki.graduation.teamup.service;

import finki.graduation.teamup.model.dto.PlayingFieldDto;
import finki.graduation.teamup.service.base.BaseGetDeleteService;

public interface PlayingFieldService extends FieldPlayTimeService, BaseGetDeleteService<PlayingFieldDto, Long, Long> {
    PlayingFieldDto save(PlayingFieldDto playingFieldDto, Long locationId);

    PlayingFieldDto update(PlayingFieldDto playingFieldDto, Long fieldId);
}
