package finki.graduation.teamup.service.base;

import finki.graduation.teamup.model.File;
import finki.graduation.teamup.model.enums.FileType;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;

public interface BaseFileService<T> {
    String saveFileToEntity(T id, MultipartFile multipartFile, FileType fileType) throws Exception;

    void saveMultipleFilesToEntity(T id, MultipartFile[] multipartFiles, FileType fileType) throws Exception;

    Set<File> getFileByEntityId(T id);

    File getFileByPath(String filePath);
}
