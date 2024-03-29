package finki.graduation.teamup.service;

import finki.graduation.teamup.model.File;
import finki.graduation.teamup.model.enums.FileType;
import org.springframework.core.io.FileSystemResource;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {
    File save(MultipartFile multipartFile, FileType fileType) throws Exception;

    File save(File file);

    File findByFilePath(String filePath);

    FileSystemResource find(Long fileId);
}
