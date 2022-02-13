package finki.graduation.teamup.model.dto;

import lombok.Data;
import org.springframework.lang.Nullable;

import java.util.Date;

@Data
public class PersonalInfoDto {
    @Nullable
    String email;

    @Nullable
    String phoneNumber;

    @Nullable
    String city;

    @Nullable
    String address;

    @Nullable
    String infoType;

    @Nullable
    Date dateOfBirth;
}
