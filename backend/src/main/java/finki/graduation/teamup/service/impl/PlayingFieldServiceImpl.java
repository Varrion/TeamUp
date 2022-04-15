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
import finki.graduation.teamup.model.projection.PlayTimeProjection;
import finki.graduation.teamup.model.projection.PlayingFieldProjection;
import finki.graduation.teamup.repository.PlayTimeRepository;
import finki.graduation.teamup.repository.PlayingFieldRepository;
import finki.graduation.teamup.repository.TeamRepository;
import finki.graduation.teamup.service.FileService;
import finki.graduation.teamup.service.LocationService;
import finki.graduation.teamup.service.PlayingFieldService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;

@Service
public class PlayingFieldServiceImpl implements PlayingFieldService {
    private final PlayingFieldRepository playingFieldRepository;
    private final LocationService locationService;
    private final PlayTimeRepository playTimeRepository;
    private final FileService fileService;
    private final TeamRepository teamService;

    public PlayingFieldServiceImpl(PlayingFieldRepository playingFieldRepository,
                                   LocationService locationService,
                                   PlayTimeRepository playTimeRepository,
                                   FileService fileService,
                                   TeamRepository teamService
    ) {
        this.playingFieldRepository = playingFieldRepository;
        this.locationService = locationService;
        this.playTimeRepository = playTimeRepository;
        this.fileService = fileService;
        this.teamService = teamService;
    }

    @Override
    public List<PlayingFieldProjection> getAll(Long locationId) {
        return playingFieldRepository.getAllPlayingFieldsByLocation(locationId);
    }

    @Override
    public List<PlayingFieldProjection> getAll(FieldType fieldType) {
        return playingFieldRepository.getAllPlayingFields(fieldType);
    }

    @Override
    public PlayingFieldProjection getById(Long id) {
        return playingFieldRepository.getById(id);
    }

    @Override
    public void deleteById(Long id) {
        PlayingField playingField = findPlayingFieldOrThrowException(id);
        playingField.setDeletedOn(LocalDateTime.now());

        playingFieldRepository.delete(playingField);
    }

    @Override
    public Long save(PlayingFieldDto entityDto, Long locationId) {
        PlayingField playingField = new PlayingField();

        if (locationId != null) {
            Location location = locationService.findLocationOrThrowException(locationId);
            playingField.setLocation(location);
        }

        playingField.setFieldFor(entityDto.getFieldFor());
        playingField.setFieldType(entityDto.getFieldType());
        playingField.setName(entityDto.getName());
        playingField.setDescription(entityDto.getDescription());

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
    public List<PlayTimeDto> getAllFieldPlayingIntervals(Long fieldId) {
        int startingWorkingHour = 8 + 2; // 2 hours difference between UTC and Local Date Time

        LocalDateTime endDate = LocalDateTime.of(LocalDate.now(), LocalTime.of(startingWorkingHour, 0)).plusDays(14);
        List<PlayTime> allPlayingIntervalsForGivenField = playTimeRepository.findAllPlayingIntervalsForGivenField(fieldId, endDate);

        LocalDateTime startDate = LocalDateTime.of(LocalDate.now(), LocalTime.of(startingWorkingHour, 0));
        ;
        List<PlayTimeDto> response = new ArrayList<>();

        while (!startDate.equals(endDate)) {
            if (startDate.getHour() == 0) {
                startDate = startDate.plusHours(8);
                continue;
            }
            LocalDateTime finalStartDate = startDate;

            Optional<PlayTime> playTimeInterval = allPlayingIntervalsForGivenField
                    .stream()
                    .filter(x -> x.getGameStartTime().equals(finalStartDate))
                    .findFirst();

            PlayTimeDto playTimeDto = new PlayTimeDto();
            playTimeDto.setGameStartTime(startDate);
            playTimeDto.setGameEndTime(startDate.plusHours(1));
            playTimeDto.setFieldStatus(FieldStatus.Open);

            if (playTimeInterval.isPresent()) {
                playTimeDto.setId(playTimeInterval.get().getId());
                if (playTimeInterval.get().getTeam() != null) {
                    playTimeDto.setTeamId(playTimeInterval.get().getTeam().getId());
                }

                playTimeDto.setFieldStatus(playTimeInterval.get().getFieldStatus());
            }

            response.add(playTimeDto);

            startDate = startDate.plusHours(1);
        }

        return response;
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

        if (playingFieldDto.getTeamId() != null) {
            teamService.findById(playingFieldDto.getTeamId()).ifPresent(playTime::setTeam);
        }

        playTime.setFieldStatus(playingFieldDto.getFieldStatus());
        playTime.setPlayingField(playingField);

        playTimeRepository.save(playTime);
        return playTime.getId();
    }

    public void updatePlayTimeIntervalStatus(PlayTimeDto playTimeDto, Long playTimeId) {
        PlayTime playTime = findPlayTimeOrThrowException(playTimeId);
        playTime.setFieldStatus(playTimeDto.getFieldStatus());

        playTimeRepository.save(playTime);
    }

    @Override
    public void deleteFieldPlayTime(Long playTimeId) {
        PlayTime playTime = findPlayTimeOrThrowException(playTimeId);
        playTime.setDeletedOn(LocalDateTime.now());

        playTimeRepository.save(playTime);
    }

    @Override
    public List<PlayTimeProjection> getAllFuturePlayingIntervalsByTeamId(Long teamId) {
        return playTimeRepository.findAllByGameEndTimeAfterAndTeamId(LocalDateTime.now(), teamId);
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
    public String saveFileToEntity(Long id, MultipartFile multipartFile, FileType fileType) throws Exception {
        PlayingField playingField = findPlayingFieldOrThrowException(id);

        File file = fileService.save(multipartFile, fileType);
        Set<File> locationFiles = playingField.getFiles();
        locationFiles.add(file);
        playingField.setFiles(locationFiles);
        playingFieldRepository.save(playingField);

        return file.getFilePath();
    }

    @Override
    public void saveMultipleFilesToEntity(Long id, MultipartFile[] multipartFiles, FileType fileType) throws Exception {
        if (multipartFiles == null || multipartFiles.length == 0) {
            return;
        }

        PlayingField playingField = findPlayingFieldOrThrowException(id);
        Set<File> fieldFiles = playingField.getFiles();

        List<String> dbFilePaths = fieldFiles.stream()
                .map(File::getFilePath).toList();

        List<String> dtoFilePaths = Arrays.stream(multipartFiles).map(MultipartFile::getOriginalFilename).toList();

        List<File> elementsToRemove = fieldFiles.stream()
                .filter(file -> !dtoFilePaths.contains(file.getFilePath())).toList();

        List<MultipartFile> filesToAdd = Arrays.stream(multipartFiles)
                .filter(newFile -> (dtoFilePaths.stream()
                        .filter(file -> !dbFilePaths.contains(file)).toList())
                        .contains(newFile.getOriginalFilename()))
                .toList();

        for (MultipartFile multipartFile : filesToAdd) {
            File file = fileService.save(multipartFile, fileType);
            fieldFiles.add(file);
        }

        for (File file : elementsToRemove) {
            file.setDeletedOn(LocalDateTime.now());
            fileService.save(file);
        }

        playingField.setFiles(fieldFiles);
        playingFieldRepository.save(playingField);
    }

    @Override
    public Set<File> getFileByEntityId(Long id) {
        return null;
    }

    @Override
    public File getFileByPath(String filePath) {
        return fileService.findByFilePath(filePath);
    }
}
