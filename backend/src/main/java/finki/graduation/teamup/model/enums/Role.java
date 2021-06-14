package finki.graduation.teamup.model.enums;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
    User,
    LocationOwner,
    Admin;

    @Override
    public String getAuthority() {
        return name();
    }
}
