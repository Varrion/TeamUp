package finki.graduation.teamup.repository;

import finki.graduation.teamup.model.TeamMember;
import finki.graduation.teamup.model.enums.TeamMemberStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;
import java.util.Set;

@Repository
public interface TeamMemberRepository extends JpaRepository<TeamMember, Long> {
    @Transactional
    Optional<TeamMember> findTeamMemberByTeamIdAndTeamMemberId(Long teamId, Long memberId);

    @Transactional
    Set<TeamMember> findTeamMembersByTeamIdAndMemberStatus(Long teamId, TeamMemberStatus memberStatus);
}
