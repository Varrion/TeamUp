package finki.graduation.teamup.service.impl;

import finki.graduation.teamup.model.Team;
import finki.graduation.teamup.model.TeamMember;
import finki.graduation.teamup.model.User;
import finki.graduation.teamup.model.dto.ChangeTeamMemberStatusRequestDto;
import finki.graduation.teamup.model.dto.CreateUpdateTeamRequestDto;
import finki.graduation.teamup.model.enums.TeamMemberStatus;
import finki.graduation.teamup.model.enums.TeamStatus;
import finki.graduation.teamup.model.projection.TeamProjection;
import finki.graduation.teamup.repository.TeamMemberRepository;
import finki.graduation.teamup.repository.TeamRepository;
import finki.graduation.teamup.service.TeamService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.projection.ProjectionFactory;
import org.springframework.data.projection.SpelAwareProxyProjectionFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class TeamServiceImpl implements TeamService {
    private final TeamRepository teamRepository;
    private final UserDetailsService userService;
    private final TeamMemberRepository teamMemberRepository;

    public TeamServiceImpl(TeamRepository teamRepository, @Qualifier("userServiceImpl") UserDetailsService userService, TeamMemberRepository teamMemberRepository) {
        this.teamRepository = teamRepository;
        this.userService = userService;
        this.teamMemberRepository = teamMemberRepository;
    }

    @Override
    public List<TeamProjection> getAll(TeamStatus teamStatus) {
        return teamRepository.getAllTeams(teamStatus);
    }

    @Override
    public TeamProjection getById(Long id) {
        Team team = findTeamOrThrowException(id);

        return (TeamProjection) team;
    }

    @Override
    public void deleteById(Long id) {
        Team team = findTeamOrThrowException(id);
        team.setDeletedOn(LocalDateTime.now());

        teamRepository.save(team);
    }

    @Override
    public TeamProjection create(CreateUpdateTeamRequestDto requestDto) {
        Team team = new Team();
        team.setTeamStatus(TeamStatus.Active);
        team.setName(requestDto.getName());
        team.setDescription(requestDto.getDescription());

        Set<TeamMember> teamMembers = new HashSet<>();

        User lead = (User) userService.loadUserByUsername(requestDto.getTeamLead());
        TeamMember teamLead = new TeamMember(team, lead, TeamMemberStatus.Accepted, true);
        teamMembers.add(teamLead);

        for (String username : requestDto.getMembersUsernames()) {
            if (username.equals(lead.getUsername())) {
                continue;
            }

            User member = (User) userService.loadUserByUsername(username);
            TeamMember teamMember = new TeamMember(team, member, TeamMemberStatus.PendingToAcceptTeamInvitation, false);
            teamMembers.add(teamMember);
        }

        team.setSize(requestDto.getMaxSize());
        team.setTeamMembers(teamMembers);

        teamRepository.save(team);

        ProjectionFactory pf = new SpelAwareProxyProjectionFactory();
        return pf.createProjection(TeamProjection.class, team);
    }

    @Override
    public TeamProjection update(CreateUpdateTeamRequestDto requestDto, Long id) {
        Team team = findTeamOrThrowException(id);

        User teamLead = (User) userService.loadUserByUsername(requestDto.getTeamLead());
        TeamMember teamMember = findTeamMemberOrThrowException(team.getId(), teamLead.getId());
        if (!teamMember.isTeamLead()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        team.setName(requestDto.getName());
        team.setDescription(requestDto.getDescription());
        team.setSize(requestDto.getMaxSize());

        teamRepository.save(team);

        ProjectionFactory pf = new SpelAwareProxyProjectionFactory();
        return pf.createProjection(TeamProjection.class, team);
    }

    @Override
    public TeamProjection changeStatus(String status, Long id) {
        Team team = findTeamOrThrowException(id);

        TeamStatus teamStatus = TeamStatus.valueOf(status);
        team.setTeamStatus(teamStatus);

        teamRepository.save(team);

        ProjectionFactory pf = new SpelAwareProxyProjectionFactory();
        return pf.createProjection(TeamProjection.class, team);
    }

    @Override
    public TeamProjection changeMemberStatusInTeam(ChangeTeamMemberStatusRequestDto requestDto, Long id, TeamMemberStatus changeStatus) {
        Team team = findTeamOrThrowException(id);
        TeamMember teamMember = findTeamMemberOrThrowException(team.getId(), requestDto.getTeamLeadId());
        Set<TeamMember> teamMembers = teamMemberRepository.findTeamMembersByTeamIdAndMemberStatus(team.getId(), TeamMemberStatus.Accepted);
        TeamMember memberToChange = findTeamMemberOrThrowException(team.getId(), requestDto.getMemberIdToChange());

        validate(teamMember, team, teamMembers, memberToChange);

        switch (changeStatus) {
            case Accepted: {
                teamMembers.add(memberToChange);

                if (team.getSize() == teamMembers.size()) {
                    team.setTeamStatus(TeamStatus.Full);
                }
                break;
            }
            case Rejected: {
                if (memberToChange.getMemberStatus() != TeamMemberStatus.PendingToBeAcceptedInTeam) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
                }

                break;
            }
        }

        memberToChange.setMemberStatus(changeStatus);

        teamRepository.save(team);
        teamMemberRepository.save(memberToChange);

        ProjectionFactory pf = new SpelAwareProxyProjectionFactory();
        return pf.createProjection(TeamProjection.class, team);
    }

    @Override
    public void applyInTeam(String username, Long teamId) {
        Team team = findTeamOrThrowException(teamId);
        User user = (User) userService.loadUserByUsername(username);

        TeamMember teamMember = new TeamMember(team, user, TeamMemberStatus.PendingToBeAcceptedInTeam, false);
        teamMemberRepository.save(teamMember);
    }

    private Team findTeamOrThrowException(Long id) {
        return teamRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    private TeamMember findTeamMemberOrThrowException(Long teamId, Long teamLeadId) {
        return teamMemberRepository.findTeamMemberByTeamIdAndTeamMemberId(teamId, teamLeadId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    private void validate(TeamMember teamMember, Team team, Set<TeamMember> teamMembers, TeamMember memberToChange) {
        if (!teamMembers.contains(memberToChange)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        if (team.getSize() < teamMembers.size() || team.getTeamStatus() != TeamStatus.LookingForMore || (!teamMember.isTeamLead() && teamMember != memberToChange)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        if (teamMember != memberToChange && memberToChange.getMemberStatus() != TeamMemberStatus.PendingToBeAcceptedInTeam ||
                teamMember == memberToChange && memberToChange.getMemberStatus() != TeamMemberStatus.PendingToAcceptTeamInvitation) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }
}
