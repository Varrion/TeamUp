package finki.graduation.teamup.model.base;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

@MappedSuperclass
public class BaseId {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
}
