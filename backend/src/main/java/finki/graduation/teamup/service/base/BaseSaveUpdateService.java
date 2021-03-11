package finki.graduation.teamup.service.base;

public interface BaseSaveUpdateService<T, K> {
    T save(T entityDto);

    T update(T entityDto, K entityId);
}
