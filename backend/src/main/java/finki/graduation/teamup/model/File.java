package finki.graduation.teamup.model;

import finki.graduation.teamup.model.base.BaseName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class File extends BaseName {
    @ManyToOne
    Location location;

    @ManyToOne
    PlayingField playingField;

    @ManyToOne
    User user;

    String fileLocation;

    String type;

    @Lob
    byte[] data;
}
