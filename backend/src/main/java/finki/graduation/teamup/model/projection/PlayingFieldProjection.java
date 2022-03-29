package finki.graduation.teamup.model.projection;

import finki.graduation.teamup.model.PlayingField;
import finki.graduation.teamup.model.projection.base.BaseNameDescriptionProjection;
import org.springframework.data.rest.core.config.Projection;

import java.util.Set;

@Projection(name = "playingField", types = {PlayingField.class})
public interface PlayingFieldProjection extends BaseNameDescriptionProjection {
    String getFieldType();

    String getFieldFor();

    Set<FileProjection> getFiles();

    LocationProjection getLocation();
}
