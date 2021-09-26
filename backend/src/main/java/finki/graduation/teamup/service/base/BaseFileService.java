package finki.graduation.teamup.service.base;

import finki.graduation.teamup.model.File;
import org.springframework.core.io.FileSystemResource;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;

public interface BaseFileService<T> {
    void saveFileToEntity(T id, MultipartFile multipartFile) throws Exception;

    Set<File> getFileByEntityId(T id);
}
