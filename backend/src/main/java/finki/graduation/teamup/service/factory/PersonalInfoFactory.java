package finki.graduation.teamup.service.factory;

import finki.graduation.teamup.model.PersonalInfo;
import finki.graduation.teamup.model.dto.PersonalInfoDto;

import java.time.LocalDateTime;

public class PersonalInfoFactory {
    public static PersonalInfo setPersonalInfo(PersonalInfoDto userDto, PersonalInfo personalInfoOrNull) {
        LocalDateTime dateTimeNow = LocalDateTime.now();
        PersonalInfo personalInfo = new PersonalInfo();

        if (personalInfoOrNull == null) {
            personalInfo.setCreatedOn(dateTimeNow);
        } else {
            personalInfo = personalInfoOrNull;
        }

        personalInfo.setAddress(userDto.getAddress());
        personalInfo.setCity(userDto.getCity());
        personalInfo.setEmail(userDto.getEmail());

        return personalInfo;
    }
}
