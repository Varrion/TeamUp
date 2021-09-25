package finki.graduation.teamup.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import finki.graduation.teamup.model.base.BaseCreatedOnDeletedOn;
import finki.graduation.teamup.model.enums.Gender;
import lombok.*;
import org.hibernate.Hibernate;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Entity
@Getter
@Setter
@ToString
@Where(clause = "deleted_on is null")
public class PersonalInfo extends BaseCreatedOnDeletedOn {
    @Column(nullable = false)
    String email;

    String phoneNumber;

    String city;

    String address;

    Date dateOfBirth;

    @Enumerated(EnumType.STRING)
    Gender gender;

    @OneToOne
    @JsonIgnore
    User user;

    @OneToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    Location location;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        PersonalInfo that = (PersonalInfo) o;

        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return 691437475;
    }
}
