package finki.graduation.teamup.repository;

import finki.graduation.teamup.model.Team;
import finki.graduation.teamup.model.dto.TeamDto;
import finki.graduation.teamup.model.dto.UserDto;
import finki.graduation.teamup.model.enums.Role;
import finki.graduation.teamup.model.enums.TeamStatus;
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
    List<TeamDto> getAllTeams(@Param("status") TeamStatus status);

    @Transactional
    @Query("SELECT " +
            "   user.username        AS username, " +
            "   user.password        AS password," +
            "   user.name            AS name," +
            "   user.surname         AS surname," +
            "   user.age             AS age," +
            "   userInfo.email       AS email," +
            "   userInfo.phoneNumber AS phoneNumber," +
            "   userInfo.city        AS city," +
            "   userInfo.address     AS address," +
            "   user.description     AS description," +
            "   userRole.role        AS roleType " +
            "FROM Team team " +
            "   INNER JOIN team.members user " +
            "   INNER JOIN user.personalInfo userInfo " +
            "   INNER JOIN user.userRole userRole " +
            "WHERE user.deletedOn IS NULL " +
            "      AND team.id = :teamId " +
            "      AND userInfo.deletedOn IS NULL" +
            "      AND userRole.deletedOn IS NULL" +
            "      AND team.deletedOn IS NULL ")
    List<UserDto> findAllMembersInTeam(@Param("teamId") Long teamId);

    @Transactional
    @Query("SELECT " +
            "   user.username        AS username, " +
            "   user.password        AS password," +
            "   user.name            AS name," +
            "   user.surname         AS surname," +
            "   user.age             AS age," +
            "   userInfo.email       AS email," +
            "   userInfo.phoneNumber AS phoneNumber," +
            "   userInfo.city        AS city," +
            "   userInfo.address     AS address," +
            "   user.description     AS description," +
            "   userRole.role        AS roleType " +
            "FROM Team team " +
            "   INNER JOIN team.pendingMembers user " +
            "   INNER JOIN user.personalInfo userInfo " +
            "   INNER JOIN user.userRole userRole " +
            "WHERE user.deletedOn IS NULL " +
            "      AND team.id = :teamId " +
            "      AND userInfo.deletedOn IS NULL" +
            "      AND userRole.deletedOn IS NULL" +
            "      AND team.deletedOn IS NULL ")
    List<UserDto> findAllPendingMembersForTeam(@Param("teamId") Long teamId);
}
