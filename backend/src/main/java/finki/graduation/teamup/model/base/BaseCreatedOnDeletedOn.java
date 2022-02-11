package finki.graduation.teamup.model.base;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@NoArgsConstructor
@MappedSuperclass
public class BaseCreatedOnDeletedOn extends BaseId {
    @CreatedDate
    protected LocalDateTime createdOn = LocalDateTime.now();

    @LastModifiedDate
    protected LocalDateTime deletedOn;
}
