package com.budgettrackingtool.bttbackend.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.savedrequest.NullRequestCache;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                /**
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().
                authorizeRequests().requestMatchers(HttpMethod.GET, "/**").hasAnyRole()
                .requestMatchers(HttpMethod.POST, "/**").hasAnyRole()
                .requestMatchers(HttpMethod.POST, "/**").hasAnyRole()
                .requestMatchers(HttpMethod.DELETE, "/**").hasAnyRole().and().
                requestCache().requestCache(new NullRequestCache()).and().
                httpBasic().disable().
                 */

        .cors().and().csrf().disable();
        return http.build();
    }

}
