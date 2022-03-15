package finki.graduation.teamup.service.impl;

import finki.graduation.teamup.service.base.FileUploadService;
import io.minio.MinioClient;
import io.minio.UploadObjectArgs;
import io.minio.errors.MinioException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Objects;

@Service
public class FileUploadServiceImpl implements FileUploadService {
    @Value("${spring.minio.url}")
    private String minIOUrl;

    @Value("${spring.minio.bucket}")
    private String bucketName;

    @Value("${spring.minio.access-key}")
    private String accessKey;

    @Value("${spring.minio.secret-key}")
    private String accessSecret;

    @Override
    public String uploadFile(MultipartFile file) throws IOException, NoSuchAlgorithmException, InvalidKeyException {
        try {
            MinioClient minioClient =
                    MinioClient
                            .builder()
                            .endpoint(minIOUrl)
                            .credentials(accessKey, accessSecret)
                            .build();


            File tempFile = File.createTempFile("file_", Objects.requireNonNull(file.getOriginalFilename()));
            file.transferTo(tempFile);

            minioClient.uploadObject(
                    UploadObjectArgs.builder()
                            .bucket(bucketName)
                            .object(tempFile.getName())
                            .filename(tempFile.getAbsolutePath())
                            .build());

            return minIOUrl + "/" + bucketName + "/" + tempFile.getName();

        } catch (MinioException e) {
            System.out.println("Error occurred: " + e);
        }

        return null;
    }
}
