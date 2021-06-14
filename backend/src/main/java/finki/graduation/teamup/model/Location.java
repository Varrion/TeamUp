package finki.graduation.teamup.model;

import finki.graduation.teamup.model.base.BaseDescription;
import finki.graduation.teamup.model.dto.LocationDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Where(clause = "deleted_on is null")
public class Location extends BaseDescription {
    @OneToMany(orphanRemoval = true, mappedBy = "location")
    Set<PlayingField> playingFields;

    Double latitude;

    Double longitude;

    @OneToOne(mappedBy = "location", orphanRemoval = true, cascade = CascadeType.ALL)
    PersonalInfo locationInfo;

    @ManyToOne
    User owner;

    @OneToMany(orphanRemoval = true)
    Set<File> files;

    public void updateLocation(LocationDto locationDto) {
        setName(locationDto.getName());
        setDescription(locationDto.getDescription());
        setLongitude(locationDto.getLongitude());
    }
}
