package finki.graduation.teamup.service.impl;

import finki.graduation.teamup.model.Location;
import finki.graduation.teamup.model.PersonalInfo;
import finki.graduation.teamup.model.User;
import finki.graduation.teamup.model.dto.LocationDto;
import finki.graduation.teamup.model.projection.LocationProjection;
import finki.graduation.teamup.repository.LocationRepository;
import finki.graduation.teamup.service.FileService;
import finki.graduation.teamup.service.LocationService;
import finki.graduation.teamup.service.UserService;
import finki.graduation.teamup.service.factory.PersonalInfoFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class LocationServiceImpl implements LocationService {
    private final LocationRepository locationRepository;
    private final UserService userService;
    private final FileService fileService;

    public LocationServiceImpl(LocationRepository locationRepository, UserService userService, FileService fileService) {
        this.locationRepository = locationRepository;
        this.userService = userService;
        this.fileService = fileService;
    }

    @Override
    public List<LocationProjection> getAll(Void unused) {
        return locationRepository.findAllLocations();
    }

    @Override
    public LocationProjection getById(Long id) {
        return locationRepository.findLocationByIdOrOwner(id, null);
    }

    @Override
    public void deleteById(Long id) {
        Location location = findLocationOrThrowException(id);
        location.setDeletedOn(LocalDateTime.now());

        locationRepository.save(location);
    }

    @Override
    public Long save(LocationDto entityDto) {
        User locationOwner = (User) userService.loadUserByUsername(entityDto.getOwnerUsername());

        Location location = Location.builder()
                .owner(locationOwner)
                .latitude(entityDto.getLatitude())
                .longitude(entityDto.getLongitude())
                .name(entityDto.getName())
                .description(entityDto.getDescription())
                .address(entityDto.getAddress())
                .city(entityDto.getCity())
                .email(entityDto.getEmail())
                .dateOfBirth(entityDto.getDateOfBirth())
                .phoneNumber(entityDto.getPhoneNumber())
                .build();

        locationRepository.save(location);
        return location.getId();
    }

    @Override
    public void update(LocationDto entityDto, Long entityId) {
        Location location = findLocationOrThrowException(entityId);

        if (!location.getOwner().getUsername().equals(entityDto.getOwnerUsername())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        location.updateLocation(entityDto);
        locationRepository.save(location);
    }

    @Override
    public Location findLocationOrThrowException(Long id) {
        Location location = locationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if (location.getDeletedOn() != null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        return location;
    }

    @Override
    public LocationProjection findLocationByOwnerUsername(String username) {
        return locationRepository.findLocationByIdOrOwner(null, username);
    }
}
