package finki.graduation.teamup.controller.base;

import finki.graduation.teamup.service.base.BaseGetDeleteService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public abstract class BaseGetDeleteController<T, K, S> {
    private final BaseGetDeleteService<T, K, S> getDeleteService;

    public BaseGetDeleteController(BaseGetDeleteService<T, K, S> getDeleteService) {
        this.getDeleteService = getDeleteService;
    }

    @GetMapping
    public List<T> getAllUsers(@RequestParam(required = false) S s) {
        return getDeleteService.getAll(s);
    }

    @GetMapping("{id}")
    public T getUserDetails(@PathVariable K id) {
        return getDeleteService.getById(id);
    }

    @DeleteMapping("{id}")
    public void deleteUser(@PathVariable K id) {
        getDeleteService.deleteById(id);
    }
}
