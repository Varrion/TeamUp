package finki.graduation.teamup.repository;

import finki.graduation.teamup.model.Team;
import finki.graduation.teamup.model.dto.TeamDto;
import finki.graduation.teamup.model.dto.UserDto;
import finki.graduation.teamup.model.enums.Role;
import finki.graduation.teamup.model.enums.TeamStatus;
import finki.graduation.teamup.model.projection.TeamProjection;
import finki.graduation.teamup.model.projection.UserProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {
    @Transactional
    @Query(" SELECT team.name          AS name, " +
            "       team.description   AS description, " +
            "       team.size          AS size, " +
            "       team.teamStatus    AS teamStatus " +
            "FROM Team team " +
            "WHERE team.deletedOn IS NULL " +
            "      AND (:status IS NULL OR team.teamStatus = :status)")
    List<TeamProjection> getAllTeams(@Param("status") TeamStatus status);
}
