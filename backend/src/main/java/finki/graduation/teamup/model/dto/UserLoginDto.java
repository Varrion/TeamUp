package finki.graduation.teamup.model.dto;


import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter
public class UserLoginDto {
    @NonNull
    String username;

    @NonNull
    String password;
}
