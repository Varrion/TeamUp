package finki.graduation.teamup.model;

import finki.graduation.teamup.model.base.BaseCreatedOnDeletedOn;
import finki.graduation.teamup.model.enums.Role;
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
public class UserRole extends BaseCreatedOnDeletedOn {
    @Enumerated(EnumType.STRING)
    Role role;

    @OneToOne
    User user;
}
