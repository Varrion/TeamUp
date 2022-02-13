package finki.graduation.teamup.model.projection.base;

import finki.graduation.teamup.model.PersonalInfo;
import org.springframework.data.rest.core.config.Projection;

import java.util.Date;

@Projection(name = "personalInfo", types = {PersonalInfo.class})
public interface PersonalInfoProjection extends BaseNameDescriptionProjection {
    String getEmail();

    String getPhoneNumber();

    String getCity();

    String getAddress();

    Date getDateOfBirth();
}
