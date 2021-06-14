package finki.graduation.teamup.service.base;

public interface BaseSaveUpdateService<T, K, V> {
    T save(K k);

    T update(K k, V id);
}
