package finki.graduation.teamup.model.dto;

import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Data
public class LocationDto extends PersonalInfoDto {
    String name;

    String description;

    Double latitude;

    Double longitude;

    String locationOwnerUsername;
}
