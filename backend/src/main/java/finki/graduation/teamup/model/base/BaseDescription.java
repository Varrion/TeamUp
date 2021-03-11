package finki.graduation.teamup.model.base;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.MappedSuperclass;

@Getter
@Setter
@MappedSuperclass
public class BaseDescription extends BaseName {
    String description;
}
