package finki.graduation.teamup.repository;

import finki.graduation.teamup.model.PlayTime;
import finki.graduation.teamup.model.dto.PlayTimeDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface PlayTimeRepository extends JpaRepository<PlayTime, Long> {
    @Transactional
    @Query("SELECT " +
            "   playTime.fieldStatus        AS fieldStatus, " +
            "   playTime.gameStartTime      AS gameStartTime," +
            "   playTime.gameEndTime        AS gameEndTime " +
            "FROM PlayTime playTime " +
            "   INNER JOIN playTime.playingField field " +
            "   INNER JOIN field.location location " +
            "WHERE playTime.deletedOn IS NULL " +
            "      AND field.id = :fieldId " +
            "      AND field.deletedOn IS NULL " +
            "      AND location.deletedOn IS NULL")
    List<PlayTimeDto> findAllPlayingIntervalsForGivenField(@Param("fieldId") Long fieldId);
}
