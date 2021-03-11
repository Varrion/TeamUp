package finki.graduation.teamup.service;

import finki.graduation.teamup.model.dto.PlayTimeDto;

import java.util.List;

public interface FieldPlayTimeService {
    List<PlayTimeDto> getAllFieldPlayingIntervals(Long fieldId);

    PlayTimeDto addFieldPlayTime(PlayTimeDto playingFieldDto, Long fieldId);

    PlayTimeDto updatePlayTimeStatus(PlayTimeDto playTimeDto, Long playTimeId);

    void deleteFieldPlayTime(Long playTimeId);
}
