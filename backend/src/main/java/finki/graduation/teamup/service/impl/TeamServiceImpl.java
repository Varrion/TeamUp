package finki.graduation.teamup.service.impl;

import finki.graduation.teamup.config.AuthUserContext;
import finki.graduation.teamup.model.File;
import finki.graduation.teamup.model.Team;
import finki.graduation.teamup.model.TeamMember;
import finki.graduation.teamup.model.User;
import finki.graduation.teamup.model.dto.CreateUpdateTeamRequestDto;
import finki.graduation.teamup.model.enums.FileType;
import finki.graduation.teamup.model.enums.TeamMemberStatus;
import finki.graduation.teamup.model.enums.TeamStatus;
import finki.graduation.teamup.model.projection.TeamProjection;
import finki.graduation.teamup.repository.TeamMemberRepository;
import finki.graduation.teamup.repository.TeamRepository;
import finki.graduation.teamup.service.FileService;
import finki.graduation.teamup.service.TeamService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.projection.ProjectionFactory;
import org.springframework.data.projection.SpelAwareProxyProjectionFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
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
    private final FileService fileService;

    public TeamServiceImpl(TeamRepository teamRepository, @Qualifier("userServiceImpl") UserDetailsService userService, TeamMemberRepository teamMemberRepository, FileService fileService) {
        this.teamRepository = teamRepository;
        this.userService = userService;
        this.teamMemberRepository = teamMemberRepository;
        this.fileService = fileService;
    }

    @Override
    public List<TeamProjection> getAll(TeamStatus teamStatus) {
        return teamRepository.getAllTeams(teamStatus);
    }

    @Override
    public TeamProjection getById(Long id) {
        Team team = findTeamOrThrowException(id);

        ProjectionFactory pf = new SpelAwareProxyProjectionFactory();
        return pf.createProjection(TeamProjection.class, team);
    }

    @Override
    public void deleteById(Long id) {
        Team team = findTeamOrThrowException(id);
        team.setDeletedOn(LocalDateTime.now());
        teamRepository.delete(team);
    }

    @Override
    public Long save(CreateUpdateTeamRequestDto requestDto) {
        if (teamRepository.existsByName(requestDto.getName())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        Team team = new Team();
        team.setTeamStatus(requestDto.getTeamStatus());
        team.setName(requestDto.getName());
        team.setDescription(requestDto.getDescription());
        team.setSport(requestDto.getSport());

        team.setSize(requestDto.getMaxSize());
        teamRepository.save(team);
        updateTeamMembersInTeam(team, requestDto.getMembersUsernames(), requestDto.getTeamLead());

        return team.getId();
    }

    @Override
    public void update(CreateUpdateTeamRequestDto requestDto, Long id) {
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
        team.setSport(requestDto.getSport());

        teamRepository.save(team);
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
    public void changeMemberStatusInTeam(String memberUsername, Long id, TeamMemberStatus changeStatus) {
        Team team = findTeamOrThrowException(id);
        UserDetails teamLeadUser = AuthUserContext.GetLoggedUserData();

        if (teamLeadUser == null) {
            throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED);
        }

        Set<TeamMember> teamMembers = team.getTeamMembers();
        TeamMember memberToChange = findTeamMemberOrThrowException(team.getId(), memberUsername);

        TeamMember teamLead = null;
        if (memberToChange.getMemberStatus() != TeamMemberStatus.PendingToAcceptTeamInvitation) {
            teamLead = findTeamMemberOrThrowException(team.getId(), teamLeadUser.getUsername());
        }

        validate(teamLead, team, teamMembers, memberToChange);

        switch (changeStatus) {
            case Accepted -> {
                if (team.getTeamStatus() != TeamStatus.LookingForMore) {
                    throw new ResponseStatusException(HttpStatus.FORBIDDEN);
                }

                if (team.getSize() == teamMembers.size()) {
                    team.setTeamStatus(TeamStatus.Full);
                }

                if (memberToChange.getMemberStatus() != TeamMemberStatus.PendingToBeAcceptedInTeam && memberToChange.getMemberStatus() != TeamMemberStatus.PendingToAcceptTeamInvitation) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
                }
            }
            case Rejected -> {
                if (memberToChange.getMemberStatus() != TeamMemberStatus.PendingToBeAcceptedInTeam && memberToChange.getMemberStatus() != TeamMemberStatus.Accepted) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
                }
            }
        }

        memberToChange.setMemberStatus(changeStatus);

        teamRepository.save(team);
        teamMemberRepository.save(memberToChange);
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

    @Override
    public TeamProjection findTeamByTeamLeadUsername(String username) {
        return teamRepository.findTeamByTeamLeadUsername(username);
    }

    private Team findTeamOrThrowException(Long id) {
        return teamRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    private TeamMember findTeamMemberOrThrowException(Long teamId, String teamMemberUsername) {
        return teamMemberRepository.findUserByTeamIdAndUserUsername(teamId, teamMemberUsername)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    private void validate(TeamMember teamLead, Team team, Set<TeamMember> teamMembers, TeamMember memberToChange) {
        if (!teamMembers.contains(memberToChange)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        if (memberToChange.getMemberStatus() == TeamMemberStatus.Rejected) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        if (team.getSize() < teamMembers.size() || team.getTeamStatus() != TeamStatus.LookingForMore) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        if (teamLead == null) {
            return;
        }

        if (!teamLead.isTeamLead() || teamLead == memberToChange) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
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

    @Override
    public String saveFileToEntity(Long id, MultipartFile multipartFile, FileType fileType) throws Exception {
        Team team = findTeamOrThrowException(id);

        File teamLogo = fileService.save(multipartFile, fileType);
        team.setLogo(teamLogo);

        teamRepository.save(team);
        return teamLogo.getFilePath();
    }

    @Override
    public void saveMultipleFilesToEntity(Long id, MultipartFile[] multipartFiles, FileType fileType) throws Exception {

    }

    @Override
    public Set<File> getFileByEntityId(Long id) {
        return null;
    }

    @Override
    public File getFileByPath(String filePath) {
        return fileService.findByFilePath(filePath);
    }
}
