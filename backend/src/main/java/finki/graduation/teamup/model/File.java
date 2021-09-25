package finki.graduation.teamup.model;

import finki.graduation.teamup.model.base.BaseName;
import lombok.*;
import org.hibernate.Hibernate;
import org.hibernate.annotations.Where;

import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import java.util.Objects;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Where(clause = "deleted_on is null")
public class File extends BaseName {
    String type;

    String filePath;

    String fileType;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        File file = (File) o;

        return Objects.equals(id, file.id);
    }

    @Override
    public int hashCode() {
        return 1061864188;
    }
}
