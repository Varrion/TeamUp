package finki.graduation.teamup.service;

import finki.graduation.teamup.model.dto.PlayTimeDto;
import finki.graduation.teamup.model.projection.PlayTimeProjection;

import java.util.List;

public interface FieldPlayTimeService {
    List<PlayTimeProjection> getAllFieldPlayingIntervals(Long fieldId);

    PlayTimeProjection addFieldPlayTime(PlayTimeDto playingFieldDto, Long fieldId);

    PlayTimeProjection updatePlayTimeStatus(PlayTimeDto playTimeDto, Long playTimeId);

    void deleteFieldPlayTime(Long playTimeId);
}
