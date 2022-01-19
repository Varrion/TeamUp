package finki.graduation.teamup.model.dto;

import lombok.Value;

@Value
public class ChangeTeamMemberStatusRequestDto {
    String teamLeadUsername;

    String memberUsernameToChange;
}
