package finki.graduation.teamup.service.impl;

import finki.graduation.teamup.model.Location;
import finki.graduation.teamup.model.PlayTime;
import finki.graduation.teamup.model.PlayingField;
import finki.graduation.teamup.model.dto.PlayTimeDto;
import finki.graduation.teamup.model.dto.PlayingFieldDto;
import finki.graduation.teamup.model.enums.FieldStatus;
import finki.graduation.teamup.model.enums.FieldType;
import finki.graduation.teamup.model.enums.Sport;
import finki.graduation.teamup.repository.PlayTimeRepository;
import finki.graduation.teamup.repository.PlayingFieldRepository;
import finki.graduation.teamup.service.LocationService;
import finki.graduation.teamup.service.PlayingFieldService;
import finki.graduation.teamup.service.mapper.PlayTimeDtoMapper;
import finki.graduation.teamup.service.mapper.PlayingFieldDtoMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PlayingFieldServiceImpl implements PlayingFieldService {
    private final PlayingFieldRepository playingFieldRepository;
    private final LocationService locationService;
    private final PlayTimeRepository playTimeRepository;

    public PlayingFieldServiceImpl(PlayingFieldRepository playingFieldRepository,
                                   LocationService locationService,
                                   PlayTimeRepository playTimeRepository) {
        this.playingFieldRepository = playingFieldRepository;
        this.locationService = locationService;
        this.playTimeRepository = playTimeRepository;
    }

    @Override
    public List<PlayingFieldDto> getAll(Long locationId) {
        return playingFieldRepository.getAllPlayingFieldsByLocation(locationId);
    }

    @Override
    public PlayingFieldDto getById(Long id) {
        PlayingField playingField = findPlayingFieldOrThrowException(id);
        return PlayingFieldDtoMapper.INSTANCE.toDto(playingField);
    }

    @Override
    public void deleteById(Long id) {
        PlayingField playingField = findPlayingFieldOrThrowException(id);
        playingField.setDeletedOn(LocalDateTime.now());

        playingFieldRepository.save(playingField);
    }

    @Override
    public PlayingFieldDto save(PlayingFieldDto entityDto, Long locationId) {
        Location location = locationService.findLocationOrThrowException(locationId);

        PlayingField playingField = new PlayingField();
        playingField.setCreatedOn(LocalDateTime.now());

        Sport sport = Sport.valueOf(entityDto.getFieldFor());
        FieldType fieldType = FieldType.valueOf(entityDto.getFieldType());

        playingField.setFieldFor(sport);
        playingField.setFieldType(fieldType);
        playingField.setName(entityDto.getName());
        playingField.setDescription(entityDto.getDescription());
        playingField.setLocation(location);

        playingFieldRepository.save(playingField);
        return PlayingFieldDtoMapper.INSTANCE.toDto(playingField);
    }

    @Override
    public PlayingFieldDto update(PlayingFieldDto entityDto, Long fieldId) {
        PlayingField playingField = findPlayingFieldOrThrowException(fieldId);
        playingField.updateField(entityDto);

        playingFieldRepository.save(playingField);
        return PlayingFieldDtoMapper.INSTANCE.toDto(playingField);
    }

    //FieldPlayTime
    @Override
    public List<PlayTimeDto> getAllFieldPlayingIntervals(Long fieldId) {
        return playTimeRepository.findAllPlayingIntervalsForGivenField(fieldId);
    }

    @Override
    public PlayTimeDto addFieldPlayTime(PlayTimeDto playingFieldDto, Long fieldId) {
        PlayingField playingField = findPlayingFieldOrThrowException(fieldId);

        PlayTime playTime = new PlayTime();
        playTime.setCreatedOn(LocalDateTime.now());

        playTime.setGameStartTime(playingFieldDto.getGameStartTime());
        playTime.setGameEndTime(playingFieldDto.getGameEndTime());

        FieldStatus fieldStatus = FieldStatus.valueOf(playingFieldDto.getFieldStatus());
        playTime.setFieldStatus(fieldStatus);
        playTime.setPlayingField(playingField);

        playTimeRepository.save(playTime);
        return PlayTimeDtoMapper.INSTANCE.toDto(playTime);
    }

    public PlayTimeDto updatePlayTimeStatus(PlayTimeDto playTimeDto, Long playTimeId) {
        PlayTime playTime = findPlayTimeOrThrowException(playTimeId);
        FieldStatus status = FieldStatus.valueOf(playTimeDto.getFieldStatus());
        playTime.setFieldStatus(status);

        playTime.setGameStartTime(playTimeDto.getGameStartTime());
        playTime.setGameEndTime(playTimeDto.getGameEndTime());

        playTimeRepository.save(playTime);
        return PlayTimeDtoMapper.INSTANCE.toDto(playTime);
    }

    @Override
    public void deleteFieldPlayTime(Long playTimeId) {
        PlayTime playTime = findPlayTimeOrThrowException(playTimeId);
        playTime.setDeletedOn(LocalDateTime.now());

        playTimeRepository.save(playTime);
    }

    private PlayingField findPlayingFieldOrThrowException(Long id) {
        PlayingField playingField = playingFieldRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if (playingField.getDeletedOn() != null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        return playingField;
    }

    private PlayTime findPlayTimeOrThrowException(Long id) {
        PlayTime playTime = playTimeRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if (playTime.getDeletedOn() != null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        return playTime;
    }
}
