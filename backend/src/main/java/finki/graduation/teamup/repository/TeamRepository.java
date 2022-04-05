package finki.graduation.teamup.repository;

import finki.graduation.teamup.model.Team;
import finki.graduation.teamup.model.enums.TeamStatus;
import finki.graduation.teamup.model.projection.TeamProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {
    @Query(" SELECT team " +
            "FROM Team team " +
            "WHERE team.deletedOn IS NULL " +
            "      AND (:status IS NULL OR team.teamStatus = :status)")
    List<TeamProjection> getAllTeams(@Param("status") TeamStatus status);

    @Query("SELECT team " +
            "FROM Team team " +
            "INNER JOIN team.teamMembers teamMember " +
            "WHERE team.deletedOn IS NULL " +
            "   AND teamMember.deletedOn IS NULL " +
            "   AND teamMember.user.username = :username ")
    List<TeamProjection> getAllTeamsByMemberUsername(@Param("username") String username);

    boolean existsByName(String name);

    @Query("SELECT team " +
            "FROM Team team " +
            "INNER JOIN team.teamMembers teamMember " +
            "INNER JOIN teamMember.user user " +
            "WHERE teamMember.deletedOn IS NULL " +
            "   AND user.deletedOn IS NULL " +
            "   AND team.deletedOn IS NULL " +
            "   AND teamMember.isTeamLead = TRUE " +
            "   AND user.username = :username ")
    TeamProjection findTeamByTeamLeadUsername(String username);
}
