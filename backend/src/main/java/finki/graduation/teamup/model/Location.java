package finki.graduation.teamup.model;

import finki.graduation.teamup.model.dto.LocationDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.Where;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.Objects;
import java.util.Set;

@Entity
@Data
@ToString
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Where(clause = "deleted_on is null")
public class Location extends PersonalInfo {
    @OneToMany(orphanRemoval = true, mappedBy = "location")
    @ToString.Exclude
    Set<PlayingField> playingFields;

    Double latitude;

    Double longitude;

    @ManyToOne
    User owner;

    @OneToMany(orphanRemoval = true)
    @ToString.Exclude
    Set<File> files;

    public void updateLocation(LocationDto locationDto) {
        setName(locationDto.getName());
        setDescription(locationDto.getDescription());
        setLongitude(locationDto.getLongitude());
        setLatitude(locationDto.getLatitude());

        updatePersonalInfo(locationDto);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Location location)) return false;
        return getLatitude().equals(location.getLatitude()) && getLongitude().equals(location.getLongitude());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getLatitude(), getLongitude());
    }
}
