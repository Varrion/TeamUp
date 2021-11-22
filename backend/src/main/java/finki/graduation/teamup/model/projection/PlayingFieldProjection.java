package finki.graduation.teamup.model.projection;

import finki.graduation.teamup.model.projection.base.BaseNameDescriptionProjection;

public interface PlayingFieldProjection extends BaseNameDescriptionProjection {
    String getFieldType();

    String getFieldFor();
}
