package finki.graduation.teamup.controller;

import finki.graduation.teamup.model.File;
import finki.graduation.teamup.model.enums.FileType;
import finki.graduation.teamup.service.base.BaseFileService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;

public abstract class FileController<T> {
    private final BaseFileService<T> fileService;

    protected FileController(BaseFileService<T> fileService) {
        this.fileService = fileService;
    }

    @PostMapping(value = "{id}/file")
    public String uploadFile(@RequestPart("file") MultipartFile multipartFile, @RequestParam(name = "FileType") FileType fileType, @PathVariable T id) throws Exception {
        return fileService.saveFileToEntity(id, multipartFile, fileType);
    }

    @PostMapping(value = "{id}/files")
    public void uploadBulkFiles(@RequestPart("files") MultipartFile[] multipartFiles, @RequestParam(name = "FileType", required = false) FileType fileType, @PathVariable T id) throws Exception {
        fileService.saveMultipleFilesToEntity(id, multipartFiles, fileType);
    }

    @GetMapping("{id}/files")
    public Set<File> getAllFilesForUser(@PathVariable T id) {
        return fileService.getFileByEntityId(id);
    }
}
