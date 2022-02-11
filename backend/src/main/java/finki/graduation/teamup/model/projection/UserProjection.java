package finki.graduation.teamup.model.projection;

import finki.graduation.teamup.model.User;
import finki.graduation.teamup.model.enums.Role;
import finki.graduation.teamup.model.projection.base.BaseNameDescriptionProjection;
import finki.graduation.teamup.model.projection.base.PersonalInfoProjection;
import org.springframework.data.rest.core.config.Projection;

import java.util.Set;

@Projection(name = "user", types = {User.class})
public interface UserProjection extends PersonalInfoProjection {
    String getUsername();

    String getPassword();

    String getSurname();

    Role getRole();

    Set<FileProjection> getFiles();
}
