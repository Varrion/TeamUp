package finki.graduation.teamup.model.dto;

import finki.graduation.teamup.model.enums.Sport;
import finki.graduation.teamup.model.enums.TeamStatus;
import lombok.Value;

import java.util.Set;

@Value
public class CreateUpdateTeamRequestDto {
    String name;

    String description;

    Integer maxSize;

    String teamLead;

    Set<String> membersUsernames;

    TeamStatus teamStatus;

    Sport sport;
}
