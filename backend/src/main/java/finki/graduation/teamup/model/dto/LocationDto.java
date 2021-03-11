package finki.graduation.teamup.model.dto;

import lombok.EqualsAndHashCode;
import lombok.Value;

@EqualsAndHashCode(callSuper = true)
@Value
public class LocationDto extends PersonalInfoDto {
    String name;

    String description;

    Double latitude;

    Double longitude;

    String locationOwnerUsername;
}
