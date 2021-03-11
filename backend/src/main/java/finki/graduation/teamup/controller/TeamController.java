package finki.graduation.teamup.controller;

import finki.graduation.teamup.model.dto.AddRemoveTeamMemberRequestDto;
import finki.graduation.teamup.model.dto.CreateUpdateTeamMemberRequestDto;
import finki.graduation.teamup.model.dto.TeamDto;
import finki.graduation.teamup.model.dto.UserDto;
import finki.graduation.teamup.model.enums.TeamStatus;
import finki.graduation.teamup.service.TeamService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "api/teams")
public class TeamController {
    private final TeamService teamService;

    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @GetMapping
    public List<TeamDto> getAllTeams(@RequestParam(value = "status", required = false) TeamStatus teamStatus) {
        if (teamStatus != null) {
            return teamService.getAllTeamsByStatus(teamStatus);
        }

        return teamService.getAll(null);
    }

    @PostMapping
    public TeamDto createTeam(@RequestBody CreateUpdateTeamMemberRequestDto createUpdateTeamMemberRequestDto) {
        return teamService.create(createUpdateTeamMemberRequestDto);
    }

    @PutMapping("{id}")
    public TeamDto updateTeam(@RequestBody CreateUpdateTeamMemberRequestDto createUpdateTeamMemberRequestDto, @PathVariable Long id) {
        return teamService.update(createUpdateTeamMemberRequestDto, id);
    }

    @PatchMapping("{id}")
    public TeamDto changeTeamStatus(@PathVariable Long id, @RequestBody String teamStatus) {
        return teamService.changeStatus(teamStatus, id);
    }

    @DeleteMapping("{id}")
    public void deleteTeam(@PathVariable Long id) {
        teamService.deleteById(id);
    }

    @GetMapping("{id}/members")
    public List<UserDto> getAllTeamMembers(@PathVariable Long id) {
        return teamService.getAllMembersInTeam(id);
    }

    @GetMapping("{id}/pending-members")
    public List<UserDto> getAllTeamPendingMembers(@PathVariable Long id) {
        return teamService.getAllPendingMembersForTeam(id);
    }

    @PostMapping("{id}/members/add")
    public TeamDto addUserInTeam(@RequestBody AddRemoveTeamMemberRequestDto addRemoveTeamMemberRequestDto, @PathVariable Long id) {
        return teamService.approveMemberInTeam(addRemoveTeamMemberRequestDto, id);
    }

    @PostMapping("{id}/members/remove")
    public TeamDto removeUserFromTeam(@RequestBody AddRemoveTeamMemberRequestDto addRemoveTeamMemberRequestDto,
                                      @PathVariable Long id,
                                      @RequestParam(value = "isUserPending") boolean isUserPending) {
        return teamService.removeUserFromTeam(addRemoveTeamMemberRequestDto, id, isUserPending);
    }
}
