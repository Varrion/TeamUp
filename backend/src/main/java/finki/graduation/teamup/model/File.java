package finki.graduation.teamup.model;

import finki.graduation.teamup.model.base.BaseName;
import finki.graduation.teamup.model.enums.FileType;
import lombok.*;
import org.hibernate.Hibernate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.util.Objects;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@SQLDelete(sql = "UPDATE file SET deleted_on = NOW() WHERE id=?")
@Where(clause = "deleted_on IS NULL")
public class File extends BaseName {
    String filePath;

    String contentType;

    @Enumerated(EnumType.STRING)
    FileType fileType;

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
