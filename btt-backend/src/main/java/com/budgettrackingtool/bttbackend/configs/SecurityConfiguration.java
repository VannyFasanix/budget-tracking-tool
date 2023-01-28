package com.budgettrackingtool.bttbackend.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                /**
                .authorizeHttpRequests((authz) -> authz
                        .anyRequest().authenticated()

                )
                .httpBasic(withDefaults());
                 */
                 .cors().disable()
        .csrf().disable();

            http.httpBasic().disable();
        return http.build();
    }

}
