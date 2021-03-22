package finki.graduation.teamup.service;

import finki.graduation.teamup.model.File;
import finki.graduation.teamup.model.dto.FileDto;
import org.springframework.core.io.FileSystemResource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileService {
    File save(MultipartFile multipartFile, FileDto fileDto) throws IOException;

    FileSystemResource find(Long fileId);
}
