package finki.graduation.teamup.repository;

import finki.graduation.teamup.model.PlayingField;
import finki.graduation.teamup.model.dto.PlayingFieldDto;
import finki.graduation.teamup.model.projection.PlayingFieldProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface PlayingFieldRepository extends JpaRepository<PlayingField, Long> {
    @Transactional
    @Query(" SELECT " +
            "   playingField.name AS name, " +
            "   playingField.description AS description," +
            "   playingField.fieldType AS fieldType, " +
            "   playingField.fieldFor AS fieldFor, " +
            "   location.id AS locationId " +
            "FROM Location location " +
            "   INNER JOIN location.playingFields playingField " +
            "WHERE location.id = :locationId " +
            "    AND location.deletedOn IS NULL " +
            "    AND playingField.deletedOn IS NULL")
    List<PlayingFieldProjection> getAllPlayingFieldsByLocation(@Param("locationId") Long locationId);
}
