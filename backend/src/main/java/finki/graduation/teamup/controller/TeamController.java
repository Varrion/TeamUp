package finki.graduation.teamup.controller;

import finki.graduation.teamup.model.dto.CreateUpdateTeamRequestDto;
import finki.graduation.teamup.model.enums.TeamMemberStatus;
import finki.graduation.teamup.model.enums.TeamStatus;
import finki.graduation.teamup.model.projection.TeamProjection;
import finki.graduation.teamup.service.TeamService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "api/teams")
public class TeamController extends FileController<Long> {
    private final TeamService teamService;

    public TeamController(TeamService teamService) {
        super(teamService);
        this.teamService = teamService;
    }

    @GetMapping
    public List<TeamProjection> getAllTeams(@RequestParam(value = "status", required = false) TeamStatus teamStatus, @RequestParam(value = "search", required = false) String search) {
        List<TeamProjection> teams = teamService.getAll(teamStatus);

        if (search != null && !search.isEmpty()) {
            teams = teams.stream().filter(s -> s.getName().toLowerCase().startsWith(search.toLowerCase())).toList();
        }

        return teams;
    }

    @GetMapping("members/{username}")
    public List<TeamProjection> getTeamsByMemberUsername(@PathVariable String username) {
        return teamService.getAllTeamsByMemberUsername(username);
    }

    @GetMapping("{id}")
    public TeamProjection getTeam(@PathVariable Long id) {
        return teamService.getById(id);
    }

    @PostMapping
    public Long createTeam(@RequestBody CreateUpdateTeamRequestDto createUpdateTeamRequestDto) {
        return teamService.save(createUpdateTeamRequestDto);
    }

    @PutMapping("{id}")
    public void updateTeam(@RequestBody CreateUpdateTeamRequestDto createUpdateTeamRequestDto, @PathVariable Long id) {
        teamService.update(createUpdateTeamRequestDto, id);
    }

    @PatchMapping("{id}")
    public TeamProjection changeTeamStatus(@PathVariable Long id, @RequestBody String teamStatus) {
        return teamService.changeStatus(teamStatus, id);
    }

    @DeleteMapping("{id}")
    public void deleteTeam(@PathVariable Long id) {
        teamService.deleteById(id);
    }

    @PostMapping("{id}/members")
    public void changeTeamMemberStatus(@RequestBody String memberUsername, @RequestParam(value = "action", required = false) TeamMemberStatus action, @PathVariable Long id) {
        teamService.changeMemberStatusInTeam(memberUsername, id, action);
    }

    @PostMapping("{id}/members/apply")
    public void applyToJoinInTeam(@RequestBody String memberToJoin, @PathVariable Long id) {
        teamService.applyInTeam(memberToJoin, id);
    }

    @GetMapping("leading/{username}")
    public TeamProjection findLeadingTeamByUsername(@PathVariable String username) {
        return teamService.findTeamByTeamLeadUsername(username);
    }
}
