package finki.graduation.teamup.model.dto;


import lombok.Value;

@Value
public class TeamDto  {
    String name;

    String description;

    Integer size;

    String teamStatus;
}
