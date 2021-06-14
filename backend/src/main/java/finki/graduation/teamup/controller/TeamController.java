package finki.graduation.teamup.controller;

import finki.graduation.teamup.model.dto.AddRemoveTeamMemberRequestDto;
import finki.graduation.teamup.model.dto.CreateUpdateTeamMemberRequestDto;
import finki.graduation.teamup.model.enums.TeamStatus;
import finki.graduation.teamup.model.projection.TeamProjection;
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
    public List<TeamProjection> getAllTeams(@RequestParam(value = "status", required = false) TeamStatus teamStatus) {
        return teamService.getAll(teamStatus);
    }

    @GetMapping("{id}")
    public TeamProjection getTeam(@PathVariable Long id) {
        return teamService.getById(id);
    }

    @PostMapping
    public TeamProjection createTeam(@RequestBody CreateUpdateTeamMemberRequestDto createUpdateTeamMemberRequestDto) {
        return teamService.create(createUpdateTeamMemberRequestDto);
    }

    @PutMapping("{id}")
    public TeamProjection updateTeam(@RequestBody CreateUpdateTeamMemberRequestDto createUpdateTeamMemberRequestDto, @PathVariable Long id) {
        return teamService.update(createUpdateTeamMemberRequestDto, id);
    }

    @PatchMapping("{id}")
    public TeamProjection changeTeamStatus(@PathVariable Long id, @RequestBody String teamStatus) {
        return teamService.changeStatus(teamStatus, id);
    }

    @DeleteMapping("{id}")
    public void deleteTeam(@PathVariable Long id) {
        teamService.deleteById(id);
    }

    @PostMapping("{id}/members/add")
    public TeamProjection addUserInTeam(@RequestBody AddRemoveTeamMemberRequestDto addRemoveTeamMemberRequestDto, @PathVariable Long id) {
        return teamService.approveMemberInTeam(addRemoveTeamMemberRequestDto, id);
    }

    @PostMapping("{id}/members/remove")
    public TeamProjection removeUserFromTeam(@RequestBody AddRemoveTeamMemberRequestDto addRemoveTeamMemberRequestDto,
                                      @PathVariable Long id,
                                      @RequestParam(value = "isUserPending") boolean isUserPending) {
        return teamService.removeUserFromTeam(addRemoveTeamMemberRequestDto, id, isUserPending);
    }
}
