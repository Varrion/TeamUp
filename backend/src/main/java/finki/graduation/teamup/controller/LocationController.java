package finki.graduation.teamup.controller;

import finki.graduation.teamup.model.dto.LocationDto;
import finki.graduation.teamup.service.LocationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/locations")
@CrossOrigin("localhost: 3000")
public class LocationController {
    private final LocationService locationService;

    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping
    public List<LocationDto> getAllLocations() {
        return locationService.getAll(null);
    }

    @PostMapping
    public LocationDto createLocation(@RequestBody LocationDto locationDto) {
        return locationService.save(locationDto);
    }

    @PutMapping("{id}")
    public LocationDto updateLocation(@RequestBody LocationDto locationDto, @PathVariable Long id) {
        return locationService.update(locationDto, id);
    }

    @DeleteMapping("{id}")
    public void deleteLocation(@PathVariable Long id) {
        locationService.deleteById(id);
    }
}
