package finki.graduation.teamup.model;

import finki.graduation.teamup.model.base.BaseDescription;
import finki.graduation.teamup.model.dto.PersonalInfoDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@NoArgsConstructor
@MappedSuperclass
public class PersonalInfo extends BaseDescription {
    @Column(nullable = false)
    protected String email;

    protected String phoneNumber;

    protected String address;

    protected String city;

    protected Date dateOfBirth;

    public void updatePersonalInfo(PersonalInfoDto personalInfoDto) {
        setAddress(personalInfoDto.getAddress());
        setCity(personalInfoDto.getCity());
        setEmail(personalInfoDto.getEmail());
        setDateOfBirth(personalInfoDto.getDateOfBirth());
        setPhoneNumber(personalInfoDto.getPhoneNumber());
    }
}
