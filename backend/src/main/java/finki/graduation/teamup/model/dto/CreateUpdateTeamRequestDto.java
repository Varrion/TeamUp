package finki.graduation.teamup.model.dto;

import lombok.Value;

import java.util.Set;

@Value
public class CreateUpdateTeamRequestDto {
    String name;

    String description;

    Integer maxSize;

    String teamLead;

    Set<String> membersUsernames;
}
