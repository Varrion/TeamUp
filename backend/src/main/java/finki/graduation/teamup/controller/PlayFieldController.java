package finki.graduation.teamup.controller;

import finki.graduation.teamup.model.dto.PlayTimeDto;
import finki.graduation.teamup.model.dto.PlayingFieldDto;
import finki.graduation.teamup.service.PlayingFieldService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/fields")
public class PlayFieldController {
    private final PlayingFieldService playingFieldService;

    public PlayFieldController(PlayingFieldService playingFieldService) {
        this.playingFieldService = playingFieldService;
    }

    @GetMapping("location/{id}")
    public List<PlayingFieldDto> getAllLocationPlayingFields(@PathVariable Long id) {
        return playingFieldService.getAll(id);
    }

    @PostMapping("location/{id}")
    public PlayingFieldDto addPlayingField(@RequestBody PlayingFieldDto playingFieldDto, @PathVariable Long id) {
        return playingFieldService.save(playingFieldDto, id);
    }

    @PutMapping("{fieldId}")
    public PlayingFieldDto updatePlayingField(@RequestBody PlayingFieldDto playingFieldDto, @PathVariable Long fieldId) {
        return playingFieldService.update(playingFieldDto, fieldId);
    }

    @DeleteMapping("{fieldId}")
    public void deletePlayingField(@PathVariable Long fieldId) {
        playingFieldService.deleteById(fieldId);
    }

    //FieldPlayTime
    @GetMapping("{fieldId}/playing-intervals")
    public List<PlayTimeDto> getAllPlayingIntervalsForGivenField(@PathVariable Long fieldId) {
        return playingFieldService.getAllFieldPlayingIntervals(fieldId);
    }

    @PostMapping("{fieldId}/playing-intervals")
    public PlayTimeDto addPlayTime(@RequestBody PlayTimeDto playTimeDto, @PathVariable Long fieldId) {
        return playingFieldService.addFieldPlayTime(playTimeDto, fieldId);
    }

    @PutMapping("{fieldId}/playing-intervals")
    public PlayTimeDto updatePlayTime(@RequestBody PlayTimeDto playTimeDto, @PathVariable Long fieldId) {
        return playingFieldService.updatePlayTimeStatus(playTimeDto, fieldId);
    }
}
