package finki.graduation.teamup.service;

import finki.graduation.teamup.model.dto.ChangeTeamMemberStatusRequestDto;
import finki.graduation.teamup.model.dto.CreateUpdateTeamRequestDto;
import finki.graduation.teamup.model.enums.TeamMemberStatus;
import finki.graduation.teamup.model.enums.TeamStatus;
import finki.graduation.teamup.model.projection.TeamProjection;
import finki.graduation.teamup.service.base.BaseFileService;
import finki.graduation.teamup.service.base.BaseGetDeleteService;
import finki.graduation.teamup.service.base.BaseSaveUpdateService;

import java.util.List;

public interface TeamService extends BaseGetDeleteService<TeamProjection, Long, TeamStatus>, BaseSaveUpdateService<CreateUpdateTeamRequestDto, Long>, BaseFileService<Long> {
    TeamProjection changeStatus(String status, Long id);

    void changeMemberStatusInTeam(ChangeTeamMemberStatusRequestDto requestDto, Long id, TeamMemberStatus changeStatus);

    List<TeamProjection> getAllTeamsByMemberUsername(String username);

    void applyInTeam(String username, Long teamId);

    TeamProjection findTeamByTeamLeadUsername(String username);
}
