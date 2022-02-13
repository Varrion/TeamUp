package finki.graduation.teamup.model.dto;

import lombok.*;
import org.springframework.lang.Nullable;

@EqualsAndHashCode(callSuper = true)
@Data
public class UserDto extends PersonalInfoDto {
    String username;

    String password;

    String name;

    String surname;

    String description;

    String gender;

    @Nullable
    String roleType;
}
