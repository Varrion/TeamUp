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
        return locationRepository.findLocationById(id);
    }

    @Override
    public void deleteById(Long id) {
        Location location = findLocationOrThrowException(id);
        location.setDeletedOn(LocalDateTime.now());

        locationRepository.save(location);
    }

    @Override
    public LocationProjection save(LocationDto entityDto) {
        Location location = new Location();

        User locationOwner = (User) userService.loadUserByUsername(entityDto.getLocationOwnerUsername());
        location.setOwner(locationOwner);
        location.setCreatedOn(LocalDateTime.now());

        location.setLatitude(entityDto.getLatitude());
        location.setLongitude(entityDto.getLongitude());
        location.setName(entityDto.getName());
        location.setDescription(entityDto.getDescription());

        PersonalInfo locationInfo = PersonalInfoFactory.setPersonalInfo(entityDto, null);
        locationInfo.setLocation(location);
        location.setLocationInfo(locationInfo);

        locationRepository.save(location);

        return (LocationProjection) location;
    }

    @Override
    public LocationProjection update(LocationDto entityDto, Long entityId) {
        Location location = findLocationOrThrowException(entityId);

        if (!location.getOwner().getUsername().equals(entityDto.getLocationOwnerUsername())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        location.updateLocation(entityDto);
        locationRepository.save(location);

        return (LocationProjection) location;
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
}
