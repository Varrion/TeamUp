package finki.graduation.teamup.config;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class RestAuthEntryPoint implements AuthenticationEntryPoint {


    @Override
    public void commence(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException authException) throws IOException {

        // send error response to the client (401 unauthorized)
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
    }
}