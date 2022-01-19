package finki.graduation.teamup.repository;

import finki.graduation.teamup.model.User;
import finki.graduation.teamup.model.enums.Role;
import finki.graduation.teamup.model.enums.TeamMemberStatus;
import finki.graduation.teamup.model.projection.UserProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long>, PagingAndSortingRepository<User,Long> {

    Optional<User> findByUsername(String username);

    @Query("SELECT user " +
            "FROM User user " +
            "INNER JOIN FETCH user.personalInfo personalInfo " +
            "WHERE user.deletedOn IS NULL " +
            "   AND personalInfo.deletedOn IS NULL " +
            "   AND (user.role = :role OR :role IS NULL) ")
    List<UserProjection> findAllUsers(@Param("role") Role role);

    @Query("SELECT user " +
            "FROM Team team " +
            "   INNER JOIN team.teamMembers teamMembers " +
            "   INNER JOIN teamMembers.user user " +
            "   INNER JOIN FETCH user.personalInfo personalInfo " +
            "WHERE user.deletedOn IS NULL " +
            "      AND team.id = :teamId " +
            "      AND personalInfo.deletedOn IS NULL" +
            "      AND teamMembers.memberStatus = :memberStatus " +
            "      AND team.deletedOn IS NULL ")
    List<UserProjection> findAllMembersInTeamByStatus(@Param("teamId") Long teamId, @Param("memberStatus") TeamMemberStatus memberStatus);

    @Query("SELECT user " +
            "FROM User user " +
            "   INNER JOIN FETCH user.personalInfo personalInfo " +
            "   LEFT JOIN FETCH user.files userFile " +
            "WHERE user.username = :username " +
            "   AND user.deletedOn IS NULL " +
            "   AND personalInfo.deletedOn IS NULL")
    UserProjection takeUserByUsername(@Param("username") String username);

    boolean existsByUsernameAndPersonalInfoEmail(String username, String email);
}
