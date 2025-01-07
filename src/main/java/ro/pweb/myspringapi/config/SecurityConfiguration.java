package ro.pweb.myspringapi.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtAuthFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf()
                .disable()
                .authorizeHttpRequests()
                .requestMatchers("/api/v1/demo-controller/").permitAll()
                .requestMatchers("/api/v1/auth/**").permitAll() // Allow unauthenticated access to auth routes
                .requestMatchers("/api/v1/users/**").permitAll() // Allow unauthenticated access to user-related routes
                .requestMatchers("/api/v1/residents/**").permitAll() // Allow unauthenticated access to residents routes
                .requestMatchers("/api/v1/employees/**").permitAll()
                .requestMatchers("/api/v1/rooms/**").permitAll()
                .requestMatchers("/api/v1/careplans/**").permitAll()
                .requestMatchers("/api/v1/contact-persons/**").permitAll()
                .requestMatchers("/api/v1/medical-alerts/**").permitAll()
                .requestMatchers("/api/v1/visits/**").permitAll()
                .anyRequest().authenticated() // Any other request requires authentication
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // Stateless session for JWT-based auth
                .and()
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class); // Add JWT filter before auth filter

        return http.build();
    }

    // Add CORS configuration
    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.addAllowedOrigin("http://localhost:3000"); // Allow React frontend running on localhost:3000
        corsConfig.addAllowedMethod("GET");
        corsConfig.addAllowedMethod("POST");
        corsConfig.addAllowedMethod("PUT");
        corsConfig.addAllowedMethod("DELETE");
        corsConfig.addAllowedHeader("Authorization");
        corsConfig.addAllowedHeader("Content-Type");
        corsConfig.addAllowedMethod("OPTIONS"); // Allow pre-flight requests (OPTIONS)

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig); // Allow CORS for all endpoints

        return new CorsFilter(source);
    }
}


//@Configuration
//@EnableWebSecurity
//@RequiredArgsConstructor
//public class SecurityConfiguration {
//
//    private final JwtAuthFilter jwtAuthFilter;
//    private final AuthenticationProvider authenticationProvider;
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .csrf()
//                .disable()
//                .authorizeHttpRequests()
//                .requestMatchers("/api/v1/demo-controller/").permitAll()
//                .requestMatchers("/api/v1/auth/**").permitAll() // Allow unauthenticated access to auth routes
//                .requestMatchers("/api/v1/users/**").permitAll() // Allow unauthenticated access to user-related routes
//                .requestMatchers("/api/v1/residents/**").permitAll() // Allow unauthenticated access to residents routes
//                .anyRequest().authenticated() // Any other request requires authentication
//                .and()
//                .sessionManagement()
//                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // Stateless session for JWT-based auth
//                .and()
//                .authenticationProvider(authenticationProvider)
//                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class); // Add JWT filter before auth filter
//
//        return http.build();
//    }
//
//    // Add CORS configuration
//    @Bean
//    public CorsFilter corsFilter() {
//        CorsConfiguration corsConfig = new CorsConfiguration();
//        corsConfig.addAllowedOrigin("http://localhost:3000"); // Allow React frontend running on localhost:3000
//        corsConfig.addAllowedMethod("GET");
//        corsConfig.addAllowedMethod("POST");
//        corsConfig.addAllowedMethod("PUT");
//        corsConfig.addAllowedMethod("DELETE");
//        corsConfig.addAllowedHeader("Authorization");
//        corsConfig.addAllowedHeader("Content-Type");
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", corsConfig); // Allow CORS for all endpoints
//
//        return new CorsFilter(source);
//    }
//}
