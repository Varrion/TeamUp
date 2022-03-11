package finki.graduation.teamup.model.projection;

import finki.graduation.teamup.model.projection.base.PersonalInfoProjection;

import java.util.Set;

public interface LocationProjection extends PersonalInfoProjection {
    Double getLatitude();

    Double getLongitude();

    UserProjection getOwner();

    Set<FileProjection> getFiles();
}
