package finki.graduation.teamup.service.impl;

import finki.graduation.teamup.model.Team;
import finki.graduation.teamup.model.User;
import finki.graduation.teamup.model.dto.AddRemoveTeamMemberRequestDto;
import finki.graduation.teamup.model.dto.CreateUpdateTeamMemberRequestDto;
import finki.graduation.teamup.model.dto.TeamDto;
import finki.graduation.teamup.model.dto.UserDto;
import finki.graduation.teamup.model.enums.TeamStatus;
import finki.graduation.teamup.repository.TeamRepository;
import finki.graduation.teamup.service.TeamService;
import finki.graduation.teamup.service.mapper.TeamDtoMapper;
import org.springframework.beans.factory.annotation.Qualifier;
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

    public TeamServiceImpl(TeamRepository teamRepository, @Qualifier("userServiceImpl") UserDetailsService userService) {
        this.teamRepository = teamRepository;
        this.userService = userService;
    }

    @Override
    public List<TeamDto> getAll(Void unused) {
        return teamRepository.getAllTeams(null);
    }

    @Override
    public List<TeamDto> getAllTeamsByStatus(TeamStatus teamStatus) {
        return teamRepository.getAllTeams(teamStatus);
    }

    @Override
    public TeamDto getById(Long id) {
        Team team = findTeamOrThrowException(id);
        return TeamDtoMapper.INSTANCE.toDto(team);
    }

    @Override
    public void deleteById(Long id) {
        Team team = findTeamOrThrowException(id);
        team.setDeletedOn(LocalDateTime.now());

        teamRepository.save(team);
    }

    @Override
    public TeamDto create(CreateUpdateTeamMemberRequestDto requestDto) {
        Team team = new Team();

        team.setCreatedOn(LocalDateTime.now());
        team.setTeamStatus(TeamStatus.Active);
        team.setName(requestDto.getName());
        team.setDescription(requestDto.getDescription());

        Set<User> teamUsers = new HashSet<>();

        User lead = (User) userService.loadUserByUsername(requestDto.getTeamLead());
        team.setTeamLead(lead);

        for (String username : requestDto.getMembersUsernames()) {
            User member = (User) userService.loadUserByUsername(username);
            teamUsers.add(member);
        }
        team.setMembers(teamUsers);
        team.setSize(requestDto.getMaxSize());

        teamRepository.save(team);
        return TeamDtoMapper.INSTANCE.toDto(team);
    }

    @Override
    public TeamDto update(CreateUpdateTeamMemberRequestDto requestDto, Long id) {
        Team team = findTeamOrThrowException(id);

        User teamLead = (User) userService.loadUserByUsername(requestDto.getTeamLead());
        if (teamLead != team.getTeamLead()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        team.setName(requestDto.getName());
        team.setDescription(requestDto.getDescription());
        team.setSize(requestDto.getMaxSize());

        teamRepository.save(team);
        return TeamDtoMapper.INSTANCE.toDto(team);
    }

    @Override
    public TeamDto changeStatus(String status, Long id) {
        Team team = findTeamOrThrowException(id);

        TeamStatus teamStatus = TeamStatus.valueOf(status);
        team.setTeamStatus(teamStatus);

        teamRepository.save(team);
        return TeamDtoMapper.INSTANCE.toDto(team);
    }

    @Override
    public TeamDto approveMemberInTeam(AddRemoveTeamMemberRequestDto requestDto, Long id) {
        Team team = findTeamOrThrowException(id);
        validate(requestDto, team, true);

        User memberToAdd = (User) userService.loadUserByUsername(requestDto.getUsername());

        Set<User> teamMembers = team.getMembers();
        Set<User> awaitingApproval = team.getPendingMembers();

        if (!teamMembers.contains(memberToAdd) && awaitingApproval.contains(memberToAdd) && teamMembers.size() < team.getSize()) {
            teamMembers.add(memberToAdd);
            awaitingApproval.remove(memberToAdd);
        }

        if (teamMembers.size() == team.getSize()) {
            team.setTeamStatus(TeamStatus.Full);
        }

        team.setMembers(teamMembers);
        team.setPendingMembers(awaitingApproval);
        teamRepository.save(team);

        return TeamDtoMapper.INSTANCE.toDto(team);
    }

    @Override
    public TeamDto removeUserFromTeam(AddRemoveTeamMemberRequestDto requestDto, Long id, boolean isUserPending) {
        Team team = findTeamOrThrowException(id);
        validate(requestDto, team, false);

        User memberToRemove = (User) userService.loadUserByUsername(requestDto.getUsername());

        Set<User> teamMembers = team.getMembers();
        Set<User> awaitingApproval = team.getPendingMembers();

        if (!isUserPending) {
            if (!teamMembers.contains(memberToRemove)) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND);
            }

            teamMembers.remove(memberToRemove);
        } else {
            if (!awaitingApproval.contains(memberToRemove)) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND);
            }

            awaitingApproval.remove(memberToRemove);
        }

        team.setMembers(teamMembers);
        team.setPendingMembers(awaitingApproval);
        teamRepository.save(team);

        return TeamDtoMapper.INSTANCE.toDto(team);
    }

    @Override
    public List<UserDto> getAllMembersInTeam(Long teamId) {
        return teamRepository.findAllMembersInTeam(teamId);
    }

    @Override
    public List<UserDto> getAllPendingMembersForTeam(Long teamId) {
        return teamRepository.findAllPendingMembersForTeam(teamId);
    }

    private Team findTeamOrThrowException(Long id) {
        Team team = teamRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if (team.getDeletedOn() != null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        return team;
    }

    private void validate(AddRemoveTeamMemberRequestDto requestDto, Team team, boolean isStatusImportant) {
        User teamLead = (User) userService.loadUserByUsername(requestDto.getTeamLeadUsername());

        if (teamLead != team.getTeamLead()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        if (team.getTeamStatus() != TeamStatus.LookingForMore && isStatusImportant) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }
}
