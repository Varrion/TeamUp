package finki.graduation.teamup.model;

import finki.graduation.teamup.model.base.BaseCreatedOnDeletedOn;
import finki.graduation.teamup.model.enums.FieldStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@SQLDelete(sql = "UPDATE play_time SET deleted_on = NOW() WHERE id=?")
@Where(clause = "deleted_on IS NULL")
public class PlayTime extends BaseCreatedOnDeletedOn {
    @Enumerated(EnumType.STRING)
    FieldStatus fieldStatus;

    LocalDateTime gameStartTime;

    LocalDateTime gameEndTime;

    @ManyToOne
    PlayingField playingField;

    @ManyToOne
    Team team;
}
