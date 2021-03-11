package finki.graduation.teamup.model;

import finki.graduation.teamup.model.base.BaseCreatedOnDeletedOn;
import finki.graduation.teamup.model.enums.Rating;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRating extends BaseCreatedOnDeletedOn {
    String comment;

    @Enumerated(EnumType.STRING)
    Rating rating;

    @OneToOne
    User commenter;

    @ManyToOne
    User user;
}
