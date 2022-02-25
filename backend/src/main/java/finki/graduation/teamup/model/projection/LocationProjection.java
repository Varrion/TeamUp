package finki.graduation.teamup.model.projection;

import finki.graduation.teamup.model.projection.base.PersonalInfoProjection;

public interface LocationProjection extends PersonalInfoProjection {
    Double getLatitude();

    Double getLongitude();

    UserProjection getOwner();
}
