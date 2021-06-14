package finki.graduation.teamup.controller;

import finki.graduation.teamup.model.dto.LocationDto;
import finki.graduation.teamup.model.projection.LocationProjection;
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
    public List<LocationProjection> getAllLocations() {
        return locationService.getAll(null);
    }

    @GetMapping("{id}")
    public LocationProjection getLocation(@PathVariable Long id) {
        return locationService.getById(id);
    }

    @PostMapping
    public LocationProjection createLocation(@RequestBody LocationDto locationDto) {
        return locationService.save(locationDto);
    }

    @PutMapping("{id}")
    public LocationProjection updateLocation(@RequestBody LocationDto locationDto, @PathVariable Long id) {
        return locationService.update(locationDto, id);
    }

    @DeleteMapping("{id}")
    public void deleteLocation(@PathVariable Long id) {
        locationService.deleteById(id);
    }
}
