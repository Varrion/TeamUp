package finki.graduation.teamup.model.projection;

import finki.graduation.teamup.model.projection.base.BaseNameDescriptionProjection;

import java.util.Set;

public interface PlayingFieldProjection extends BaseNameDescriptionProjection {
    String getFieldType();

    String getFieldFor();

    Set<FileProjection> getFiles();
}
