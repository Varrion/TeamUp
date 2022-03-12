package finki.graduation.teamup.service;

import finki.graduation.teamup.model.dto.PlayTimeDto;
import finki.graduation.teamup.model.projection.PlayTimeProjection;

import java.util.List;

public interface FieldPlayTimeService {
    List<PlayTimeProjection> getAllFieldPlayingIntervals(Long fieldId);

    PlayTimeProjection getPlayTimeInterval(Long fieldId, Long playTimeId);

    Long addFieldPlayTimeInterval(PlayTimeDto playingFieldDto, Long fieldId);

    void updatePlayTimeIntervalStatus(PlayTimeDto playTimeDto, Long playTimeId);

    void deleteFieldPlayTime(Long playTimeId);
}
