package finki.graduation.teamup.service.base;

import finki.graduation.teamup.model.File;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;

public interface BaseFileService<T> {
    void saveFileToEntity(T id, MultipartFile multipartFile, String fileType) throws Exception;

    Set<File> getFileByEntityId(T id);
}
