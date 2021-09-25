package finki.graduation.teamup.model;

import finki.graduation.teamup.model.base.BaseDescription;
import finki.graduation.teamup.model.dto.LocationDto;
import lombok.*;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.Objects;
import java.util.Set;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@Where(clause = "deleted_on is null")
public class Location extends BaseDescription {
    @OneToMany(orphanRemoval = true, mappedBy = "location")
    @ToString.Exclude
    Set<PlayingField> playingFields;

    Double latitude;

    Double longitude;

    @OneToOne(mappedBy = "location", orphanRemoval = true, cascade = CascadeType.ALL)
    PersonalInfo locationInfo;

    @ManyToOne
    User owner;

    @OneToMany(orphanRemoval = true)
    @ToString.Exclude
    Set<File> files;

    public void updateLocation(LocationDto locationDto) {
        setName(locationDto.getName());
        setDescription(locationDto.getDescription());
        setLongitude(locationDto.getLongitude());
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Location)) return false;
        Location location = (Location) o;
        return getLatitude().equals(location.getLatitude()) && getLongitude().equals(location.getLongitude());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getLatitude(), getLongitude());
    }
}
