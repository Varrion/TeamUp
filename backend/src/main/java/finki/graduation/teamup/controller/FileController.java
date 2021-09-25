package finki.graduation.teamup.controller;

import finki.graduation.teamup.model.File;
import finki.graduation.teamup.service.FileService;
import org.springframework.core.io.FileSystemResource;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("api/files")
@CrossOrigin(value = "localhost:3000")
public class FileController {
    private final FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @GetMapping(value = "{fileId}")
    FileSystemResource findFile(@PathVariable Long fileId) {
        return fileService.find(fileId);
    }

    @PostMapping()
    File uploadFile(@RequestBody MultipartFile file) throws Exception {
        return fileService.save(file);
    }
}
