package finki.graduation.teamup.service;

import finki.graduation.teamup.model.dto.*;
import finki.graduation.teamup.model.enums.TeamStatus;
import finki.graduation.teamup.service.base.BaseGetDeleteService;

import java.util.List;

public interface TeamService extends BaseGetDeleteService<TeamDto, Long, Void> {
    List<TeamDto> getAllTeamsByStatus(TeamStatus teamStatus);

    TeamDto create(CreateUpdateTeamMemberRequestDto requestDto);

    TeamDto update(CreateUpdateTeamMemberRequestDto requestDto, Long id);

    TeamDto changeStatus(String status, Long id);

    TeamDto approveMemberInTeam(AddRemoveTeamMemberRequestDto requestDto, Long id);

    TeamDto removeUserFromTeam(AddRemoveTeamMemberRequestDto requestDto, Long id, boolean isUserPending);

    List<UserDto> getAllMembersInTeam(Long teamId);

    List<UserDto> getAllPendingMembersForTeam(Long teamId);
}
