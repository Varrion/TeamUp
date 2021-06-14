package finki.graduation.teamup.model.projection;

import finki.graduation.teamup.model.projection.base.BaseIdNameDescriptionProjection;
import finki.graduation.teamup.model.projection.base.PersonalInfoProjection;

public interface LocationProjection extends BaseIdNameDescriptionProjection, PersonalInfoProjection {
    Double getLatitude();

    Double getLongitude();

    String getLocationOwnerUsername();
}
