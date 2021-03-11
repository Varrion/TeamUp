package finki.graduation.teamup.repository;

import finki.graduation.teamup.model.User;
import finki.graduation.teamup.model.dto.UserDto;
import finki.graduation.teamup.model.enums.Role;
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
    @Query("SELECT " +
            "   user.username        AS username, " +
            "   user.password        AS password, " +
            "   user.name            AS name, " +
            "   user.surname         AS surname, " +
            "   user.age             AS age, " +
            "   userInfo.email       AS email, " +
            "   userInfo.phoneNumber AS phoneNumber, " +
            "   userInfo.city        AS city, " +
            "   userInfo.address     AS address, " +
            "   user.description     AS description, " +
            "   userRole.role        AS roleType " +
            "FROM User user " +
            "   INNER JOIN user.personalInfo userInfo " +
            "   INNER JOIN user.userRole userRole " +
            "WHERE user.deletedOn IS NULL " +
            "   AND userInfo.deletedOn IS NULL " +
            "   AND userRole.deletedOn IS NULL " +
            "   AND (:role IS NULL OR userRole.role = :role)")
    List<UserDto> findAllUsers(@Param("role") Role role);

    @Transactional
    @Query(" SELECT user " +
            "FROM User user " +
            "   INNER JOIN user.userRole userRole " +
            "WHERE user.username = :username " +
            "   AND userRole.role=:role " +
            "   AND user.deletedOn is null ")
    Optional<User> findUserByUsername(@Param("username") String username, @Param("role") Role role);

    @Transactional
    @Query("SELECT " +
            "   user.username        AS username, " +
            "   user.password        AS password, " +
            "   user.name            AS name, " +
            "   user.surname         AS surname, " +
            "   user.age             AS age, " +
            "   userInfo.email       AS email, " +
            "   userInfo.phoneNumber AS phoneNumber, " +
            "   userInfo.city        AS city, " +
            "   userInfo.address     AS address, " +
            "   user.description     AS description, " +
            "   userRole.role        AS roleType " +
            "FROM User user " +
            "   INNER JOIN user.personalInfo userInfo " +
            "   INNER JOIN user.userRole userRole " +
            "WHERE user.id = :id " +
            "   AND user.deletedOn IS NULL " +
            "   AND userInfo.deletedOn IS NULL " +
            "   AND userRole.deletedOn IS NULL ")
    UserDto findOneUserById(@Param("id") Long id);
}
