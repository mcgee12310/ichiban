package com.example.event.config;

import com.example.event.security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // 1. Disable CSRF for Stateless JWT APIs
                .csrf(csrf -> csrf.disable())

                // 2. Configure CORS - Fixed for allowCredentials
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedOrigins(List.of(
                            "http://localhost:5173",
                             "https://happy-weekend.vercel.app"
                    ));
                    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                    config.setAllowedHeaders(List.of("*"));
                    config.setAllowCredentials(true);
                    return config;
                }))

                // 3. Define Authorization Rules
                .authorizeHttpRequests(auth -> auth
                        // 1. Preflight
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // 2. Auth
                        .requestMatchers("/api/auth/**").permitAll()

                        // 3. Public events
                        .requestMatchers(HttpMethod.GET, "/api/events/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/events/search").permitAll()

                        // 4. Public READ comments
                        .requestMatchers(HttpMethod.GET, "/api/comment/**").permitAll()

                        // ❌ Các action khác cần login
                        .requestMatchers(HttpMethod.POST, "/api/comment/**").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/api/comment/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/api/comment/**").authenticated()

                        // 6. Favorites always require login
                        .requestMatchers("/api/favorites/**").authenticated()

                        .anyRequest().authenticated())

                // 4. Configure Stateless Session
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // 5. Set Authentication Provider
                .authenticationProvider(authenticationProvider())

                // 6. Add JWT Filter before UsernamePasswordAuthenticationFilter
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
