package finki.graduation.teamup.model.projection;

import finki.graduation.teamup.model.User;
import finki.graduation.teamup.model.projection.base.BaseIdNameDescriptionProjection;
import finki.graduation.teamup.model.projection.base.PersonalInfoProjection;
import org.springframework.data.rest.core.config.Projection;

import java.util.Set;

@Projection(name = "user", types = {User.class})
public interface UserProjection extends BaseIdNameDescriptionProjection {
    String getUsername();

    String getPassword();

    String getSurname();

    PersonalInfoProjection getPersonalInfo();

    Set<TeamProjection> getTeam();

    Set<FileProjection> getFiles();
}
