package finki.graduation.teamup.service.impl;

import finki.graduation.teamup.model.File;
import finki.graduation.teamup.model.enums.FileType;
import finki.graduation.teamup.repository.FileRepository;
import finki.graduation.teamup.repository.FileSystemRepository;
import finki.graduation.teamup.service.FileService;
import finki.graduation.teamup.service.base.FileUploadService;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;
import java.util.Objects;

@Service
public class FileServiceImpl implements FileService {
    private final FileRepository fileRepository;
    private final FileSystemRepository fileSystemRepository;
    private final FileUploadService fileUploadService;

    private final String[] videoExtensions = {"mov", "avi", "wmv", "flv", "3gp", "mp4", "mpg"};
    private final String[] imageExtensions = {"jpg", "jpeg", "png", "gif", "bmp"};

    public FileServiceImpl(
            FileRepository fileRepository,
            FileSystemRepository fileSystemRepository,
            FileUploadService fileUploadService
    ) {
        this.fileRepository = fileRepository;
        this.fileSystemRepository = fileSystemRepository;
        this.fileUploadService = fileUploadService;
    }

    @Override
    public File save(MultipartFile multipartFile, FileType fileType) throws Exception {
        String filePath = fileUploadService.uploadFile(multipartFile);
        File file = new File();

        String fileContentType = Objects.requireNonNull(multipartFile.getContentType());

        if (fileType == null) {

            if (Arrays.stream(imageExtensions).anyMatch(fileContentType::contains)) {
                fileType = FileType.Photo;
            } else if (Arrays.stream(videoExtensions).anyMatch(fileContentType::contains)) {
                fileType = FileType.Video;
            } else {
                fileType = FileType.Other;
            }
        }

        file.setFilePath(filePath);
        file.setContentType(fileContentType);
        file.setFileType(fileType);
        file.setName(multipartFile.getOriginalFilename());

        return fileRepository.save(file);
    }

    @Override
    public File save(File file) {
        return fileRepository.save(file);
    }

    @Override
    public File findByFilePath(String filePath) {
        return fileRepository.findByFilePath(filePath);
    }

    @Override
    public FileSystemResource find(Long fileId) {
        File file = fileRepository.findById(fileId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return fileSystemRepository.findInFileSystem(file.getFilePath());
    }
}
