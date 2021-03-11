package finki.graduation.teamup.repository;

import finki.graduation.teamup.model.Location;
import finki.graduation.teamup.model.dto.LocationDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
    @Transactional
    @Query("SELECT  location.name         AS name, " +
            "       location.description  AS description, " +
            "       location.latitude     AS latitude, " +
            "       location.longitude    AS longitude " +
            "FROM Location location " +
            "WHERE location.deletedOn IS NULL")
    List<LocationDto> findAllLocations();

    @Transactional
    @Query("SELECT  location.name         AS name, " +
            "       location.description  AS description, " +
            "       location.latitude     AS latitude, " +
            "       location.longitude    AS longitude " +
            "FROM Location location " +
            "WHERE location.deletedOn IS NULL " +
            "       AND location.id = :locationId ")
    LocationDto findLocationById(@Param("locationId") Long locationId);
}
