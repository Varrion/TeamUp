package finki.graduation.teamup.model.base;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Lob;
import javax.persistence.MappedSuperclass;

@Getter
@Setter
@MappedSuperclass
public class BaseDescription extends BaseName {
    @Lob
    @Column
    String description;
}
