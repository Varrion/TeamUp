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
    String location;

    String type;

    @Lob
    byte[] data;
}
