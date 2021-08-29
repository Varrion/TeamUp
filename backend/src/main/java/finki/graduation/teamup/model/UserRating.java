package finki.graduation.teamup.model;

import finki.graduation.teamup.model.base.BaseCreatedOnDeletedOn;
import finki.graduation.teamup.model.enums.Rating;
import lombok.*;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Where(clause = "deleted_on is null")
public class UserRating extends BaseCreatedOnDeletedOn {
    String comment;

    @Enumerated(EnumType.STRING)
    Rating rating;

    @OneToOne
    User commenter;

    @ManyToOne
    User user;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserRating)) return false;
        UserRating that = (UserRating) o;
        return Objects.equals(getComment(), that.getComment()) && getRating() == that.getRating();
    }

    @Override
    public int hashCode() {
        return Objects.hash(getComment(), getRating());
    }
}
