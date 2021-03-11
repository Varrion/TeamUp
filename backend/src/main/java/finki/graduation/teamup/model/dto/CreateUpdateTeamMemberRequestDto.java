package finki.graduation.teamup.model.dto;

import lombok.Value;

import java.util.List;

@Value
public class CreateUpdateTeamMemberRequestDto {
    String name;

    String description;

    Integer maxSize;

    String teamLead;

    List<String> membersUsernames;
}
