package finki.graduation.teamup.service.base;

import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface BaseSaveUpdateService<T, K> {
    K save(T t);

    void update(T t, K id);
}
