package finki.graduation.teamup.model.dto;

import lombok.EqualsAndHashCode;
import lombok.Value;

@EqualsAndHashCode(callSuper = true)
@Value
public class UserDto extends PersonalInfoDto {
    String username;

    String password;

    String name;

    String surname;

    Integer age;

    String description;

    String roleType;
}
