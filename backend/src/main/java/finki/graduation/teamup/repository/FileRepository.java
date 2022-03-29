package finki.graduation.teamup.repository;

import finki.graduation.teamup.model.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileRepository extends JpaRepository<File, Long> {
    File findByFilePath(String filePath);
}
