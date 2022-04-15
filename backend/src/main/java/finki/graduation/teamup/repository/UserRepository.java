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

    @Query("SELECT user " +
            "FROM User user " +
            "WHERE user.deletedOn IS NULL " +
            "   AND (user.username = :username OR user.email = :username)" +
            "   AND user.password = :password ")
    Optional<User> findByUsernameOrEmailAndPassword(String username, String password);

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    @Query("SELECT user " +
            "FROM User user " +
            "WHERE user.deletedOn IS NULL " +
            "   AND (user.role = :role OR :role IS NULL) ")
    List<UserProjection> findAllUsers(@Param("role") Role role);

    @Query("SELECT user " +
            "FROM User user " +
            "   INNER JOIN user.teamMembers teamMembers " +
            "   INNER JOIN teamMembers.team team " +
            "WHERE user.deletedOn IS NULL " +
            "      AND team.id = :teamId " +
            "      AND teamMembers.memberStatus = :memberStatus " +
            "      AND team.deletedOn IS NULL ")
    List<UserProjection> findAllMembersInTeamByStatus(@Param("teamId") Long teamId, @Param("memberStatus") TeamMemberStatus memberStatus);

    @Query("SELECT user " +
            "FROM User user " +
            "WHERE user.username = :username " +
            "   AND user.deletedOn IS NULL ")
    UserProjection takeUserByUsername(@Param("username") String username);

    boolean existsUserByUsernameOrEmail(String username, String email);

    @Query("SELECT user " +
            "FROM User user " +
            "WHERE (user.name LIKE :search% " +
            "   OR user.username LIKE :search% " +
            "   OR user.surname LIKE :search%) " +
            "   AND user.role = :role")
    List<UserProjection> searchUsers(String search, Role role);
}
