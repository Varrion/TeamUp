package finki.graduation.teamup.service.impl;

import finki.graduation.teamup.model.File;
import finki.graduation.teamup.model.Location;
import finki.graduation.teamup.model.PlayingField;
import finki.graduation.teamup.model.User;
import finki.graduation.teamup.model.dto.FileDto;
import finki.graduation.teamup.repository.FileRepository;
import finki.graduation.teamup.repository.LocationRepository;
import finki.graduation.teamup.repository.PlayingFieldRepository;
import finki.graduation.teamup.repository.UserRepository;
import finki.graduation.teamup.service.FileService;
import finki.graduation.teamup.service.PlayingFieldService;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Set;

@Service
public class FileServiceImpl implements FileService {
    private final FileRepository fileRepository;
    private final UserRepository userRepository;
    private final LocationRepository locationRepository;
    private final PlayingFieldRepository playingFieldRepository;

    public FileServiceImpl(FileRepository fileRepository, UserRepository userRepository, LocationRepository locationRepository, PlayingFieldRepository playingFieldRepository) {
        this.fileRepository = fileRepository;
        this.userRepository = userRepository;
        this.locationRepository = locationRepository;
        this.playingFieldRepository = playingFieldRepository;
    }

    @Override
    public File save(MultipartFile multipartFile, FileDto fileDto) throws IOException {
        String fileName = multipartFile.getName();
        String filePath = String.format("%s/%d", fileDto.getEntityType().toString(), fileDto.getEntityId());

        Path newFile = Paths.get(filePath + new Date().getTime() + "-" + fileName);
        Files.createDirectories(newFile.getParent());

        Files.write(newFile, multipartFile.getBytes());
        String fileLocation = newFile.toAbsolutePath()
                .toString();

        File file = new File();

        file.setCreatedOn(LocalDateTime.now());
        file.setFileLocation(fileLocation);
        file.setName(fileName);

        switch (fileDto.getEntityType()) {
            case User:
                User user = userRepository.findById(fileDto.getEntityId()).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
                Set<File> userFiles = user.getFiles();
                userFiles.add(file);
                user.setFiles(userFiles);
                break;
            case Field:
                PlayingField playingField = playingFieldRepository.findById(fileDto.getEntityId()).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
                Set<File> fieldFiles = playingField.getFiles();
                fieldFiles.add(file);
                playingField.setFiles(fieldFiles);
                break;
            case Location:
                Location location = locationRepository.findById(fileDto.getEntityId()).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
                Set<File> locationFiles = location.getFiles();
                locationFiles.add(file);
                location.setFiles(locationFiles);
                break;
        }

        return fileRepository.save(file);
    }

    @Override
    public FileSystemResource find(Long fileId) {
        File file = fileRepository.findById(fileId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return findInFileSystem(file.getFileLocation());
    }

    private FileSystemResource findInFileSystem(String location) {
        try {
            return new FileSystemResource(Paths.get(location));
        } catch (Exception e) {
            // Handle access or file not found problems.
            throw new RuntimeException();
        }
    }
}
