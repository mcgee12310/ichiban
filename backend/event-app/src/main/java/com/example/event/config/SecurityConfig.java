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
                    config.setAllowedOrigins(List.of("http://localhost:5173")); // Explicit origin
                    config.setAllowedOrigins(List.of("https://happy-weekend.vercel.app")); // Explicit origin
                    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                    config.setAllowedHeaders(List.of("*"));
                    config.setAllowCredentials(true); 
                    return config;
                }))

                // 3. Define Authorization Rules
                .authorizeHttpRequests(auth -> auth
                        // 1. Allow Pre-flight
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        
                        // 2. Auth endpoints
                        .requestMatchers("/api/auth/**").permitAll() 
                        
                        // 3. Public Event Access
                        // Allow public GET for event list/details
                        .requestMatchers(HttpMethod.GET, "/api/events/**").permitAll()
                        // ADD THIS: Allow public POST for the search/filter feature
                        .requestMatchers(HttpMethod.POST, "/api/events/search").permitAll() 
                        
                        // 4. Secured endpoints
                        .requestMatchers("/api/comment/**").authenticated()
                        .requestMatchers("/api/favorites/**").authenticated()
                        
                        .anyRequest().authenticated()
                )

                // 4. Configure Stateless Session
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                
                // 5. Set Authentication Provider
                .authenticationProvider(authenticationProvider())
                
                // 6. Add JWT Filter before UsernamePasswordAuthenticationFilter
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}