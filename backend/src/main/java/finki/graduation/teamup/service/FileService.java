package finki.graduation.teamup.service;

import finki.graduation.teamup.model.File;
import org.springframework.core.io.FileSystemResource;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {
    File save(MultipartFile multipartFile) throws Exception;

    FileSystemResource find(Long fileId);
}
