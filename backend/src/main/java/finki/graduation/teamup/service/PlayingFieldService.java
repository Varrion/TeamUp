package finki.graduation.teamup.service;

import finki.graduation.teamup.model.dto.PlayingFieldDto;
import finki.graduation.teamup.model.enums.FieldType;
import finki.graduation.teamup.model.projection.PlayingFieldProjection;
import finki.graduation.teamup.service.base.BaseFileService;
import finki.graduation.teamup.service.base.BaseGetDeleteService;

import java.util.List;

public interface PlayingFieldService extends FieldPlayTimeService, BaseGetDeleteService<PlayingFieldProjection, Long, Long>, BaseFileService<Long> {
    Long save(PlayingFieldDto playingFieldDto, Long locationId);

    List<PlayingFieldProjection> getAll(FieldType fieldType);

    void update(PlayingFieldDto playingFieldDto, Long fieldId);
}
