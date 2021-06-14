package finki.graduation.teamup.service;

import finki.graduation.teamup.model.dto.AddRemoveTeamMemberRequestDto;
import finki.graduation.teamup.model.dto.CreateUpdateTeamMemberRequestDto;
import finki.graduation.teamup.model.dto.TeamDto;
import finki.graduation.teamup.model.enums.TeamStatus;
import finki.graduation.teamup.model.projection.TeamProjection;
import finki.graduation.teamup.service.base.BaseGetDeleteService;

public interface TeamService extends BaseGetDeleteService<TeamProjection, Long, TeamStatus> {
    TeamProjection create(CreateUpdateTeamMemberRequestDto requestDto);

    TeamProjection update(CreateUpdateTeamMemberRequestDto requestDto, Long id);

    TeamProjection changeStatus(String status, Long id);

    TeamProjection approveMemberInTeam(AddRemoveTeamMemberRequestDto requestDto, Long id);

    TeamProjection removeUserFromTeam(AddRemoveTeamMemberRequestDto requestDto, Long id, boolean isUserPending);
}
