package finki.graduation.teamup.service.impl;

import finki.graduation.teamup.facade.IAuthenticationFacade;
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
    private final IAuthenticationFacade authenticationFacade;

    public TeamServiceImpl(TeamRepository teamRepository, @Qualifier("userServiceImpl") UserDetailsService userService, TeamMemberRepository teamMemberRepository, IAuthenticationFacade authenticationFacade) {
        this.teamRepository = teamRepository;
        this.userService = userService;
        this.teamMemberRepository = teamMemberRepository;
        this.authenticationFacade = authenticationFacade;
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
        LocalDateTime dateTimeNow = LocalDateTime.now();

        team.setDeletedOn(dateTimeNow);

        Set<TeamMember> teamMembers = team.getTeamMembers();
        teamMembers.forEach(teamMember -> teamMember.setDeletedOn(dateTimeNow));

        teamRepository.save(team);
        teamMemberRepository.saveAll(teamMembers);
    }

    @Override
    public TeamProjection create(CreateUpdateTeamRequestDto requestDto) {
        if (teamRepository.existsByName(requestDto.getName())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        Team team = new Team();
        team.setTeamStatus(TeamStatus.Active);
        team.setName(requestDto.getName());
        team.setDescription(requestDto.getDescription());


        team.setSize(requestDto.getMaxSize());
//        team.setTeamMembers(teamMembers);
        teamRepository.save(team);
        updateTeamMembersInTeam(team, requestDto.getMembersUsernames(), requestDto.getTeamLead());

        ProjectionFactory pf = new SpelAwareProxyProjectionFactory();
        return pf.createProjection(TeamProjection.class, team);
    }

    @Override
    public TeamProjection update(CreateUpdateTeamRequestDto requestDto, Long id) {
        Team team = findTeamOrThrowException(id);

        if (!requestDto.getName().equals(team.getName()) && teamRepository.existsByName(requestDto.getName())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        TeamMember leadMember = findTeamMemberOrThrowException(team.getId(), requestDto.getTeamLead());
        if (!leadMember.isTeamLead()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        updateTeamMembersInTeam(team, requestDto.getMembersUsernames(), requestDto.getTeamLead());

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
        TeamMember teamMember = findTeamMemberOrThrowException(team.getId(), requestDto.getTeamLeadUsername());
        Set<TeamMember> teamMembers = teamMemberRepository.findUsersByTeamIdAndMemberStatus(team.getId(), TeamMemberStatus.Accepted);
        TeamMember memberToChange = findTeamMemberOrThrowException(team.getId(), requestDto.getMemberUsernameToChange());

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
    public List<TeamProjection> getAllTeamsByMemberUsername(String username) {
        return teamRepository.getAllTeamsByMemberUsername(username);
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

    private TeamMember findTeamMemberOrThrowException(Long teamId, String teamLeadUsername) {
        return teamMemberRepository.findUserByTeamIdAndUserUsername(teamId, teamLeadUsername)
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

    private void updateTeamMembersInTeam(Team team, Set<String> membersUsernames, String teamLeadUsername) {
        Set<TeamMember> teamMembers = team.getTeamMembers();
        Set<TeamMember> tempMembers = new HashSet<>();
        TeamMember teamLead;

        if (teamMembers.isEmpty()) {
            User lead = (User) userService.loadUserByUsername(teamLeadUsername);
            teamLead = new TeamMember(team, lead, TeamMemberStatus.Accepted, true);
        } else {
            teamLead = findTeamMemberOrThrowException(team.getId(), teamLeadUsername);
        }

        if (!teamLead.isTeamLead()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        teamMembers.add(teamLead);
        tempMembers.add(teamLead);

        for (String username : membersUsernames) {
            User member = (User) userService.loadUserByUsername(username);

            if (username.equals(teamLead.getUser().getUsername())) {
                continue;
            }

            TeamMember teamMember = new TeamMember(team, member, TeamMemberStatus.PendingToAcceptTeamInvitation, false);
            teamMembers.add(teamMember);
            tempMembers.add(teamMember);
        }

        teamMemberRepository.saveAll(teamMembers);
        teamMembers.removeAll(tempMembers);

        if (teamMembers.isEmpty()) {
            return;
        }

        for (TeamMember teamMember : teamMembers) {
            teamMember.setDeletedOn(LocalDateTime.now());
        }

        teamMemberRepository.saveAll(teamMembers);
    }
}
