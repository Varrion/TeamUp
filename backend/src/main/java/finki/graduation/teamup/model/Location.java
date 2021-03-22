package finki.graduation.teamup.model;

import finki.graduation.teamup.model.base.BaseDescription;
import finki.graduation.teamup.model.dto.LocationDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Location extends BaseDescription {
    @OneToMany(orphanRemoval = true, mappedBy = "location")
    Set<PlayingField> playingFields;

    Double latitude;

    Double longitude;

    @OneToOne(mappedBy = "location", orphanRemoval = true)
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
