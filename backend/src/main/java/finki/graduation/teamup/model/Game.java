package finki.graduation.teamup.model;

import finki.graduation.teamup.model.base.BaseCreatedOnDeletedOn;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;
import org.hibernate.annotations.Where;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import java.util.Objects;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Where(clause = "deleted_on is null")
public class Game extends BaseCreatedOnDeletedOn {
    Integer numberPlayers;

    @OneToOne
    PlayingField playingField;

    @ManyToOne
    Team team;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Game game = (Game) o;
        return id != null && Objects.equals(id, game.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
