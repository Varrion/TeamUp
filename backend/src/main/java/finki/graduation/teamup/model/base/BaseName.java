package finki.graduation.teamup.model.base;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

@Getter
@Setter
@MappedSuperclass
public class BaseName extends BaseCreatedOnDeletedOn {
    @Column(nullable = false)
    protected String name;
}
