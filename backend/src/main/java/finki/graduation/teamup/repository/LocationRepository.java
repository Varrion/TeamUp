package finki.graduation.teamup.repository;

import finki.graduation.teamup.model.Location;
import finki.graduation.teamup.model.projection.LocationProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
    @Query("SELECT  location.id           AS id, " +
            "       location.name         AS name, " +
            "       location.description  AS description, " +
            "       location.latitude     AS latitude, " +
            "       location.longitude    AS longitude, " +
            "       owner.username        AS locationOwnerUsername " +
            "FROM Location location " +
            "    INNER JOIN location.owner owner " +
            "WHERE location.deletedOn IS NULL " +
            "   AND owner.deletedOn IS NULL")
    List<LocationProjection> findAllLocations();

    @Query("SELECT location " +
            "FROM Location location " +
            "    INNER JOIN location.owner owner " +
            "WHERE location.deletedOn IS NULL " +
            "   AND owner.deletedOn IS NULL" +
            "   AND (location.id = :locationId OR owner.username = :username) ")
    LocationProjection findLocationByIdOrOwner(@Param("locationId") Long locationId, @Param("username") String username);
}
