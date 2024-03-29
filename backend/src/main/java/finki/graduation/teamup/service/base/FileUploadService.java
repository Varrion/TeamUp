package finki.graduation.teamup.service.base;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;


public interface FileUploadService {
    String uploadFile(MultipartFile file) throws IOException, NoSuchAlgorithmException, InvalidKeyException;
}
