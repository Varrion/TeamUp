package finki.graduation.teamup.service;

import finki.graduation.teamup.model.dto.ChangeTeamMemberStatusRequestDto;
import finki.graduation.teamup.model.dto.CreateUpdateTeamRequestDto;
import finki.graduation.teamup.model.enums.TeamMemberStatus;
import finki.graduation.teamup.model.enums.TeamStatus;
import finki.graduation.teamup.model.projection.TeamProjection;
import finki.graduation.teamup.service.base.BaseGetDeleteService;

public interface TeamService extends BaseGetDeleteService<TeamProjection, Long, TeamStatus> {
    TeamProjection create(CreateUpdateTeamRequestDto requestDto);

    TeamProjection update(CreateUpdateTeamRequestDto requestDto, Long id);

    TeamProjection changeStatus(String status, Long id);

    TeamProjection changeMemberStatusInTeam(ChangeTeamMemberStatusRequestDto requestDto, Long id, TeamMemberStatus changeStatus);

    void applyInTeam(String username, Long teamId);

}
