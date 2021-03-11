package finki.graduation.teamup.service.impl;

import finki.graduation.teamup.model.Location;
import finki.graduation.teamup.model.PersonalInfo;
import finki.graduation.teamup.model.User;
import finki.graduation.teamup.model.dto.LocationDto;
import finki.graduation.teamup.repository.LocationRepository;
import finki.graduation.teamup.service.LocationService;
import finki.graduation.teamup.service.PersonalInfoFactory;
import finki.graduation.teamup.service.mapper.LocationDtoMapper;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class LocationServiceImpl implements LocationService {
    private final LocationRepository locationRepository;
    private final UserDetailsService userDetailsService;

    public LocationServiceImpl(LocationRepository locationRepository,
                               @Qualifier("locationOwnerServiceImpl") UserDetailsService userDetailsService) {
        this.locationRepository = locationRepository;
        this.userDetailsService = userDetailsService;
    }

    @Override
    public List<LocationDto> getAll(Void unused) {
        return locationRepository.findAllLocations();
    }

    @Override
    public LocationDto getById(Long id) {
        return locationRepository.findLocationById(id);
    }

    @Override
    public void deleteById(Long id) {
        Location location = findLocationOrThrowException(id);
        location.setDeletedOn(LocalDateTime.now());

        locationRepository.save(location);
    }

    @Override
    public LocationDto save(LocationDto entityDto) {
        Location location = new Location();

        User locationOwner = (User) userDetailsService.loadUserByUsername(entityDto.getLocationOwnerUsername());
        location.setOwner(locationOwner);
        location.setCreatedOn(LocalDateTime.now());

        location.setLatitude(entityDto.getLatitude());
        location.setLongitude(entityDto.getLongitude());
        location.setName(entityDto.getName());
        location.setDescription(entityDto.getDescription());

        PersonalInfo locationInfo = PersonalInfoFactory.setPersonalInfo(entityDto, Optional.empty());
        location.setLocationInfo(locationInfo);

        locationRepository.save(location);

        return LocationDtoMapper.INSTANCE.toDto(location);
    }

    @Override
    public LocationDto update(LocationDto entityDto, Long entityId) {
        Location location = findLocationOrThrowException(entityId);

        if (!location.getOwner().getUsername().equals(entityDto.getLocationOwnerUsername())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        location.updateLocation(entityDto);
        locationRepository.save(location);

        return LocationDtoMapper.INSTANCE.toDto(location);
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
