package finki.graduation.teamup.service.base;

import java.util.List;

public interface BaseGetDeleteService<T, K, S> {
    List<T> getAll(S s);

    T getById(K id);

    void deleteById(K id);
}
