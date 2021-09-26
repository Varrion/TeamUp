package finki.graduation.teamup.repository;

import finki.graduation.teamup.model.User;
import finki.graduation.teamup.model.enums.Role;
import finki.graduation.teamup.model.projection.UserProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Transactional
    Optional<User> findByUsername(String username);

    @Transactional
    @Query(value = "SELECT user " +
                   "FROM User user " +
                   "INNER JOIN FETCH user.personalInfo personalInfo " +
                   "WHERE user.deletedOn IS NULL " +
                   "   AND personalInfo.deletedOn IS NULL " +
                   "   AND (user.role = :role OR :role IS NULL) ")
    List<UserProjection> findAllUsers(@Param("role") Role role);

    @Transactional
    @Query("SELECT user " +
            "FROM Team team " +
            "   INNER JOIN team.members user " +
            "   INNER JOIN FETCH user.personalInfo personalInfo " +
            "WHERE user.deletedOn IS NULL " +
            "      AND team.id = :teamId " +
            "      AND personalInfo.deletedOn IS NULL" +
            "      AND team.deletedOn IS NULL ")
    List<UserProjection> findAllMembersInTeam(@Param("teamId") Long teamId);

    @Transactional
    @Query("SELECT user " +
            "FROM Team team " +
            "   INNER JOIN team.pendingMembers user " +
            "   INNER JOIN FETCH user.personalInfo personalInfo " +
            "WHERE user.deletedOn IS NULL " +
            "      AND team.id = :teamId " +
            "      AND personalInfo.deletedOn IS NULL" +
            "      AND team.deletedOn IS NULL ")
    List<UserProjection> findAllPendingMembersForTeam(@Param("teamId") Long teamId);

    @Transactional
    @Query(value = "SELECT user " +
            "FROM User user " +
            "   INNER JOIN FETCH user.personalInfo personalInfo " +
            "WHERE user.username = :username " +
            "   AND user.deletedOn IS NULL " +
            "   AND personalInfo.deletedOn IS NULL")
    UserProjection takeUserByUsername(@Param("username") String username);

    @Transactional
    @Query("SELECT COUNT(user.id) " +
            "FROM User user " +
            "INNER JOIN user.personalInfo personalInfo " +
            "WHERE user.deletedOn IS NULL " +
            "   AND personalInfo.deletedOn IS NULL " +
            "   AND (user.username = :username or personalInfo.email = :email) ")
    int checkIfUsernameAndEmailAreUnique(@Param("username") String username, @Param("email") String email);
}