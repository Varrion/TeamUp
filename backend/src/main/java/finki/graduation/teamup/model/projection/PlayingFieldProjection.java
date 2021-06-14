package finki.graduation.teamup.model.projection;

import finki.graduation.teamup.model.projection.base.BaseIdNameDescriptionProjection;

public interface PlayingFieldProjection extends BaseIdNameDescriptionProjection {
    String getFieldType();

    String getFieldFor();
}
