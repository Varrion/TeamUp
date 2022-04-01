package finki.graduation.teamup.repository;

import finki.graduation.teamup.model.PlayTime;
import finki.graduation.teamup.model.dto.PlayTimeDto;
import finki.graduation.teamup.model.projection.PlayTimeProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface PlayTimeRepository extends JpaRepository<PlayTime, Long> {
    @Query("SELECT playTime " +
            "FROM PlayTime playTime " +
            "   INNER JOIN playTime.playingField field " +
            "   LEFT JOIN field.location location " +
            "WHERE playTime.deletedOn IS NULL " +
            "      AND field.id = :fieldId " +
            "      AND field.deletedOn IS NULL " +
            "      AND location.deletedOn IS NULL")
    List<PlayTimeProjection> findAllPlayingIntervalsForGivenField(@Param("fieldId") Long fieldId);

    PlayTimeProjection findPlayTimeByPlayingFieldIdAndId(Long playingFieldId, Long intervalId);
}
