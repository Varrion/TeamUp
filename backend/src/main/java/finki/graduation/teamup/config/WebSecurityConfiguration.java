package finki.graduation.teamup.config;

import finki.graduation.teamup.config.filter.AuthTokenFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true)
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {
    private final UsernamePasswordAuthProvider authProvider;
    private final RestAuthEntryPoint restAuthEntryPoint;

    @Bean
    public AuthTokenFilter authenticationTokenFilter() {
        return new AuthTokenFilter();
    }

    public WebSecurityConfiguration(UsernamePasswordAuthProvider authProvider, RestAuthEntryPoint restAuthEntryPoint) {
        this.authProvider = authProvider;
        this.restAuthEntryPoint = restAuthEntryPoint;
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(authProvider);
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
//        http
//                .csrf().disable().cors().and()
//                .authorizeRequests()
//                .antMatchers(HttpMethod.GET, "/api/**").permitAll()
//                .antMatchers(HttpMethod.POST, "/api/users", "/api/users/login").permitAll()
////                .antMatchers(HttpMethod.POST, "/api/accounts/sign-in").permitAll()
//                .anyRequest().authenticated()
//                .and()
//                .httpBasic();
//        http.csrf().disable()
//                .authorizeRequests()
//                .antMatchers("/", "/assets/**", "/register", "/login", "/api/**").permitAll()
//                .antMatchers("/admin/**").hasRole("ADMIN")
//                .anyRequest()
//                .authenticated()
//                .and()
//                .formLogin()
//                .loginProcessingUrl("/login");
        http.csrf().disable()
                .authorizeRequests()
                .antMatchers("/", "/assets/**", "/register", "/login", "/api/**").permitAll()
                .antMatchers("/admin/**").hasRole("ADMIN")
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(restAuthEntryPoint)
                .and()
                .formLogin().loginProcessingUrl("/login");
        http.addFilterBefore(authenticationTokenFilter(), UsernamePasswordAuthenticationFilter.class);
    }
}
