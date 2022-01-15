package finki.graduation.teamup.model.projection;

import finki.graduation.teamup.model.File;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "file", types = {File.class})
public interface FileProjection {
    String getName();

    String getFilePath();

    String getContentType();

    String getFileType();
}
