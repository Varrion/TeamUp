package finki.graduation.teamup.model;

import finki.graduation.teamup.model.dto.LocationDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Data
@ToString
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@SQLDelete(sql = "UPDATE location SET deleted_on = NOW() WHERE id=1")
@Where(clause = "deleted_on IS NULL")
public class Location extends PersonalInfo implements Serializable {
    @OneToMany(orphanRemoval = true, mappedBy = "location")
    @ToString.Exclude
    Set<PlayingField> playingFields;

    Double latitude;

    Double longitude;

    @OneToOne
    User owner;

    @OneToMany(orphanRemoval = true)
    @ToString.Exclude
    Set<File> files = new HashSet<>();

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
