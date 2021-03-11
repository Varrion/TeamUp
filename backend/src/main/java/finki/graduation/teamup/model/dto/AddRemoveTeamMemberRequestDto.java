package finki.graduation.teamup.model.dto;

import lombok.Value;

@Value
public class AddRemoveTeamMemberRequestDto {
    String teamLeadUsername;

    String username;
}
