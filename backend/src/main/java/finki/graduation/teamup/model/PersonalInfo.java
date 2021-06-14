package finki.graduation.teamup.model;

import finki.graduation.teamup.model.base.BaseCreatedOnDeletedOn;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Where(clause = "deleted_on is null")
public class PersonalInfo extends BaseCreatedOnDeletedOn {
    @Column(nullable = false)
    String email;

    String phoneNumber;

    String city;

    String address;

    @OneToOne
    User user;

    @OneToOne(fetch = FetchType.LAZY)
    Location location;
}
