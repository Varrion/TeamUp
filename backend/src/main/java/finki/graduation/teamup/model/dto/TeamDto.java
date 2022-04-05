package finki.graduation.teamup.model.dto;


import finki.graduation.teamup.model.enums.Sport;
import lombok.Data;

@Data
public class TeamDto  {
    String name;

    String description;

    Integer size;

    String teamStatus;

    Sport sport;
}
