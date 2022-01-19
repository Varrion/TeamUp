package finki.graduation.teamup.repository;

import finki.graduation.teamup.model.TeamMember;
import finki.graduation.teamup.model.enums.TeamMemberStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface TeamMemberRepository extends JpaRepository<TeamMember, Long> {
    Optional<TeamMember> findUserByTeamIdAndUserUsername(Long teamId, String username);

    Set<TeamMember> findUsersByTeamIdAndMemberStatus(Long teamId, TeamMemberStatus memberStatus);
}
