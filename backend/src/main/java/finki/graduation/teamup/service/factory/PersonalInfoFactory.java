package finki.graduation.teamup.service.factory;

import finki.graduation.teamup.model.PersonalInfo;
import finki.graduation.teamup.model.dto.PersonalInfoDto;
import finki.graduation.teamup.model.enums.Gender;

import java.time.LocalDateTime;

public class PersonalInfoFactory {
    public static PersonalInfo setPersonalInfo(PersonalInfoDto infoDto, PersonalInfo personalInfoOrNull, boolean isLocation) {
        PersonalInfo personalInfo = new PersonalInfo();

        if (personalInfoOrNull == null) {
        } else {
            personalInfo = personalInfoOrNull;
        }

        personalInfo.setAddress(infoDto.getAddress());
        personalInfo.setCity(infoDto.getCity());
        personalInfo.setEmail(infoDto.getEmail());
        personalInfo.setDateOfBirth(infoDto.getDateOfBirth());
        personalInfo.setPhoneNumber(infoDto.getPhoneNumber());

        return personalInfo;
    }
}
