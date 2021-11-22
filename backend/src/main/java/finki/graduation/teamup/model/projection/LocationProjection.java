package finki.graduation.teamup.model.projection;

import finki.graduation.teamup.model.projection.base.BaseNameDescriptionProjection;
import finki.graduation.teamup.model.projection.base.PersonalInfoProjection;

public interface LocationProjection extends BaseNameDescriptionProjection, PersonalInfoProjection {
    Double getLatitude();

    Double getLongitude();

    String getLocationOwnerUsername();
}
