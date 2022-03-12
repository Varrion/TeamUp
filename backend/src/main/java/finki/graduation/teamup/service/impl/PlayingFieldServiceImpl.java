package finki.graduation.teamup.service.impl;

import finki.graduation.teamup.model.File;
import finki.graduation.teamup.model.Location;
import finki.graduation.teamup.model.PlayTime;
import finki.graduation.teamup.model.PlayingField;
import finki.graduation.teamup.model.dto.PlayTimeDto;
import finki.graduation.teamup.model.dto.PlayingFieldDto;
import finki.graduation.teamup.model.enums.FieldStatus;
import finki.graduation.teamup.model.enums.FieldType;
import finki.graduation.teamup.model.enums.FileType;
import finki.graduation.teamup.model.enums.Sport;
import finki.graduation.teamup.model.projection.PlayTimeProjection;
import finki.graduation.teamup.model.projection.PlayingFieldProjection;
import finki.graduation.teamup.repository.PlayTimeRepository;
import finki.graduation.teamup.repository.PlayingFieldRepository;
import finki.graduation.teamup.service.FileService;
import finki.graduation.teamup.service.LocationService;
import finki.graduation.teamup.service.PlayingFieldService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Service
public class PlayingFieldServiceImpl implements PlayingFieldService {
    private final PlayingFieldRepository playingFieldRepository;
    private final LocationService locationService;
    private final PlayTimeRepository playTimeRepository;
    private final FileService fileService;

    public PlayingFieldServiceImpl(PlayingFieldRepository playingFieldRepository,
                                   LocationService locationService,
                                   PlayTimeRepository playTimeRepository, FileService fileService) {
        this.playingFieldRepository = playingFieldRepository;
        this.locationService = locationService;
        this.playTimeRepository = playTimeRepository;
        this.fileService = fileService;
    }

    @Override
    public List<PlayingFieldProjection> getAll(Long locationId) {
        return playingFieldRepository.getAllPlayingFieldsByLocation(locationId);
    }

    @Override
    public PlayingFieldProjection getById(Long id) {
        PlayingField playingField = findPlayingFieldOrThrowException(id);
        return (PlayingFieldProjection) playingField;
    }

    @Override
    public void deleteById(Long id) {
        PlayingField playingField = findPlayingFieldOrThrowException(id);
        playingField.setDeletedOn(LocalDateTime.now());

        playingFieldRepository.delete(playingField);
    }

    @Override
    public Long save(PlayingFieldDto entityDto, Long locationId) {
        Location location = locationService.findLocationOrThrowException(locationId);
        PlayingField playingField = new PlayingField();

        Sport sport = Sport.valueOf(entityDto.getFieldFor());
        FieldType fieldType = FieldType.valueOf(entityDto.getFieldType());

        playingField.setFieldFor(sport);
        playingField.setFieldType(fieldType);
        playingField.setName(entityDto.getName());
        playingField.setDescription(entityDto.getDescription());
        playingField.setLocation(location);

        playingFieldRepository.save(playingField);
        return playingField.getId();
    }

    @Override
    public void update(PlayingFieldDto entityDto, Long fieldId) {
        PlayingField playingField = findPlayingFieldOrThrowException(fieldId);
        playingField.updateField(entityDto);

        playingFieldRepository.save(playingField);
    }

    //FieldPlayTime
    @Override
    public List<PlayTimeProjection> getAllFieldPlayingIntervals(Long fieldId) {
        return playTimeRepository.findAllPlayingIntervalsForGivenField(fieldId);
    }

    @Override
    public PlayTimeProjection getPlayTimeInterval(Long fieldId, Long playTimeId) {
        return playTimeRepository.findPlayTimeByPlayingFieldIdAndId(fieldId, playTimeId);
    }

    @Override
    public Long addFieldPlayTimeInterval(PlayTimeDto playingFieldDto, Long fieldId) {
        PlayingField playingField = findPlayingFieldOrThrowException(fieldId);

        PlayTime playTime = new PlayTime();
        playTime.setGameStartTime(playingFieldDto.getGameStartTime());
        playTime.setGameEndTime(playingFieldDto.getGameEndTime());

        playTime.setFieldStatus(playingFieldDto.getFieldStatus());
        playTime.setPlayingField(playingField);

        playTimeRepository.save(playTime);
        return playTime.getId();
    }

    public void updatePlayTimeIntervalStatus(PlayTimeDto playTimeDto, Long playTimeId) {
        PlayTime playTime = findPlayTimeOrThrowException(playTimeId);
        playTime.setFieldStatus(playTimeDto.getFieldStatus());

        playTime.setGameStartTime(playTimeDto.getGameStartTime());
        playTime.setGameEndTime(playTimeDto.getGameEndTime());

        playTimeRepository.save(playTime);
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

    @Override
    public void saveFileToEntity(Long id, MultipartFile multipartFile, FileType fileType) throws Exception {

    }

    @Override
    public void saveMultipleFilesToEntity(Long id, MultipartFile[] multipartFiles, FileType fileType) throws Exception {
        PlayingField playingField = findPlayingFieldOrThrowException(id);
        Set<File> fieldFiles = playingField.getFiles();

        for (MultipartFile multipartFile : multipartFiles) {

            File file = fileService.save(multipartFile, fileType);
            fieldFiles.add(file);
        }

        playingField.setFiles(fieldFiles);
        playingFieldRepository.save(playingField);
    }

    @Override
    public Set<File> getFileByEntityId(Long id) {
        return null;
    }
}
