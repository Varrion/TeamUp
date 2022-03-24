package finki.graduation.teamup.repository;

import finki.graduation.teamup.model.PlayingField;
import finki.graduation.teamup.model.projection.PlayingFieldProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayingFieldRepository extends JpaRepository<PlayingField, Long> {
    @Query(" SELECT playingField " +
            "FROM PlayingField playingField " +
            "   INNER JOIN playingField.location location " +
            "WHERE location.id = :locationId " +
            "    AND location.deletedOn IS NULL " +
            "    AND playingField.deletedOn IS NULL ")
    List<PlayingFieldProjection> getAllPlayingFieldsByLocation(@Param("locationId") Long locationId);

    PlayingFieldProjection getById(Long terrainId);
}
