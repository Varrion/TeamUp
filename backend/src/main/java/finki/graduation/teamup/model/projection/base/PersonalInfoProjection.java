package finki.graduation.teamup.model.projection.base;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "personalInfo", types = { PersonalInfoProjection.class })
public interface PersonalInfoProjection {
    String getEmail();

    String getPhoneNumber();

    String getCity();

    String getAddress();
}
