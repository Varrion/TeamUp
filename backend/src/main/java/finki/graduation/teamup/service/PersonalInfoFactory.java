package finki.graduation.teamup.service;

import finki.graduation.teamup.model.PersonalInfo;
import finki.graduation.teamup.model.dto.PersonalInfoDto;
import finki.graduation.teamup.model.enums.InfoType;

import java.time.LocalDateTime;
import java.util.Optional;

public class PersonalInfoFactory {
    public static PersonalInfo setPersonalInfo(PersonalInfoDto userDto, Optional<PersonalInfo> optionalPersonalInfo) {
        LocalDateTime dateTimeNow = LocalDateTime.now();
        PersonalInfo personalInfo = new PersonalInfo();

        if (!optionalPersonalInfo.isPresent()) {
            personalInfo.setCreatedOn(dateTimeNow);
        } else {
            personalInfo = optionalPersonalInfo.get();
        }

        personalInfo.setAddress(userDto.getAddress());
        personalInfo.setCity(userDto.getCity());
        personalInfo.setEmail(userDto.getEmail());

        InfoType infoType = InfoType.valueOf(userDto.getInfoType());
        personalInfo.setType(infoType);

        return personalInfo;
    }
}
