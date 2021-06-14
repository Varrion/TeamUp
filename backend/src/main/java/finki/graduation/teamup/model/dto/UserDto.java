package finki.graduation.teamup.model.dto;

import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Data
public class UserDto extends PersonalInfoDto {
    String username;

    String password;

    String name;

    String surname;

    Integer age;

    String description;

    String roleType;
}
