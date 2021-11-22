package finki.graduation.teamup.service.impl;

import finki.graduation.teamup.model.File;
import finki.graduation.teamup.repository.FileRepository;
import finki.graduation.teamup.repository.FileSystemRepository;
import finki.graduation.teamup.service.FileService;
import finki.graduation.teamup.service.base.FileUploadService;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;

@Service
public class FileServiceImpl implements FileService {
    private final FileRepository fileRepository;
    private final FileSystemRepository fileSystemRepository;
    private final FileUploadService fileUploadService;

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
    public File save(MultipartFile multipartFile) throws Exception {
        String filePath = fileUploadService.uploadFile(multipartFile);
        File file = new File();

        file.setCreatedOn(LocalDateTime.now());
        file.setFilePath(filePath);
        file.setFileType(multipartFile.getContentType());
        file.setName(multipartFile.getOriginalFilename());

        return fileRepository.save(file);
    }

    @Override
    public FileSystemResource find(Long fileId) {
        File file = fileRepository.findById(fileId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return fileSystemRepository.findInFileSystem(file.getFilePath());
    }
}
