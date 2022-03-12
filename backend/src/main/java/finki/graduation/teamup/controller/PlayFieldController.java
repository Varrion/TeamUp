package finki.graduation.teamup.controller;

import finki.graduation.teamup.model.dto.PlayTimeDto;
import finki.graduation.teamup.model.dto.PlayingFieldDto;
import finki.graduation.teamup.model.projection.PlayTimeProjection;
import finki.graduation.teamup.model.projection.PlayingFieldProjection;
import finki.graduation.teamup.service.PlayingFieldService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/fields")
@CrossOrigin(origins = "http://localhost:3000")
public class PlayFieldController extends FileController<Long> {
    private final PlayingFieldService playingFieldService;

    public PlayFieldController(PlayingFieldService playingFieldService) {
        super(playingFieldService);
        this.playingFieldService = playingFieldService;
    }

    @GetMapping("location/{id}")
    public List<PlayingFieldProjection> getAllLocationPlayingFields(@PathVariable Long id) {
        return playingFieldService.getAll(id);
    }

    @GetMapping("{id}")
    public PlayingFieldProjection getPlayingFieldId(@PathVariable Long id) {
        return playingFieldService.getById(id);
    }

    @PostMapping("location/{id}")
    public Long addPlayingField(@RequestBody PlayingFieldDto playingFieldDto, @PathVariable Long id) {
        return playingFieldService.save(playingFieldDto, id);
    }

    @PutMapping("{fieldId}")
    public void updatePlayingField(@RequestBody PlayingFieldDto playingFieldDto, @PathVariable Long fieldId) {
        playingFieldService.update(playingFieldDto, fieldId);
    }

    @DeleteMapping("{fieldId}")
    public void deletePlayingField(@PathVariable Long fieldId) {
        playingFieldService.deleteById(fieldId);
    }

    //Playing Time Intervals
    @GetMapping("{fieldId}/playing-intervals")
    public List<PlayTimeProjection> getAllPlayingIntervalsForGivenField(@PathVariable Long fieldId) {
        return playingFieldService.getAllFieldPlayingIntervals(fieldId);
    }

    @GetMapping("{fieldId}/playing-intervals/{intervalId}")
    public PlayTimeProjection getPlayingIntervalForGivenField(@PathVariable Long fieldId, Long intervalId) {
        return playingFieldService.getPlayTimeInterval(fieldId, intervalId);
    }

    @PostMapping("{fieldId}/playing-intervals")
    public Long addPlayTime(@RequestBody PlayTimeDto playTimeDto, @PathVariable Long fieldId) {
        return playingFieldService.addFieldPlayTimeInterval(playTimeDto, fieldId);
    }

    @PutMapping("{fieldId}/playing-intervals")
    public void updatePlayTime(@RequestBody PlayTimeDto playTimeDto, @PathVariable Long fieldId) {
        playingFieldService.updatePlayTimeIntervalStatus(playTimeDto, fieldId);
    }
}
