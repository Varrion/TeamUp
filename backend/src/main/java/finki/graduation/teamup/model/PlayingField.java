package finki.graduation.teamup.model;

import finki.graduation.teamup.model.base.BaseDescription;
import finki.graduation.teamup.model.dto.PlayingFieldDto;
import finki.graduation.teamup.model.enums.FieldType;
import finki.graduation.teamup.model.enums.Sport;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlayingField extends BaseDescription {
    @OneToOne(mappedBy = "playingField", orphanRemoval = true, fetch = FetchType.LAZY)
    Game game;

    @Enumerated(EnumType.STRING)
    FieldType fieldType;

    @Enumerated(EnumType.STRING)
    Sport fieldFor;

    @ManyToOne
    Location location;

    @ManyToMany
    Set<PlayTime> playIntervals;

    @OneToMany(orphanRemoval = true)
    Set<File> files;

    public void updateField(PlayingFieldDto fieldDto) {
        Sport sport = Sport.valueOf(fieldDto.getFieldFor());
        FieldType fieldType = FieldType.valueOf(fieldDto.getFieldType());

        setFieldFor(sport);
        setFieldType(fieldType);
        setName(fieldDto.getName());
        setDescription(fieldDto.getDescription());
    }
}
