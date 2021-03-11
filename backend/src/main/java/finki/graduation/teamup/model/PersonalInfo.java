package finki.graduation.teamup.model;

import finki.graduation.teamup.model.base.BaseCreatedOnDeletedOn;
import finki.graduation.teamup.model.enums.InfoType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.OneToOne;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PersonalInfo extends BaseCreatedOnDeletedOn {
    @Enumerated(EnumType.ORDINAL)
    InfoType type;

    String email;

    String phoneNumber;

    String city;

    String address;

    @OneToOne
    User user;

    @OneToOne
    Location location;
}
