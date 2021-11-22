package finki.graduation.teamup.model.base;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@Getter
@Setter
@MappedSuperclass
public abstract class BaseCreatedOnDeletedOn extends BaseId {
    @CreatedDate
    protected LocalDateTime createdOn = LocalDateTime.now();

    @LastModifiedDate
    protected LocalDateTime deletedOn;
}
