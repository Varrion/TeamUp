package finki.graduation.teamup.model.dto;

import lombok.Data;

import java.util.Date;

@Data
public class PersonalInfoDto {
    String email;

    String phoneNumber;

    String city;

    String address;

    String infoType;

    Date dateOfBirth;

    String gender;
}
