package finki.graduation.teamup.service.impl;

import finki.graduation.teamup.service.base.FileUploadService;
import io.minio.MinioClient;
import io.minio.UploadObjectArgs;
import io.minio.errors.MinioException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Objects;

@Service
public class FileUploadServiceImpl implements FileUploadService {
    private static final String minIOUrl = "http://127.0.0.1:9000";
    private static final String bucketName = "teamup";

    @Override
    public String uploadFile(MultipartFile file) throws IOException, NoSuchAlgorithmException, InvalidKeyException {

        System.out.println("Original File name" + file.getOriginalFilename());
        try {
            MinioClient minioClient =
                    MinioClient
                            .builder()
                            .endpoint(minIOUrl)
                            .credentials("simeon", "simeon1234")
                            .build();


            File tempFile = File.createTempFile("file", Objects.requireNonNull(file.getOriginalFilename()));
            file.transferTo(tempFile);

            minioClient.uploadObject(
                    UploadObjectArgs.builder()
                            .bucket(bucketName)
                            .object(file.getOriginalFilename())
                            .filename(tempFile.getAbsolutePath())
                            .build());

        } catch (MinioException e) {
            System.out.println("Error occurred: " + e);
        }

        return minIOUrl + "/" +bucketName + "/" + file.getOriginalFilename();
    }
}
