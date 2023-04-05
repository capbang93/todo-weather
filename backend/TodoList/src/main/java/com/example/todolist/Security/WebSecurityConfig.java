package com.example.todolist.Security;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.filter.CorsFilter;


@EnableWebSecurity
@Slf4j
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwTAuthenticationFilter jwtAuthenticationFilter;

    @Override
    protected void configure(HttpSecurity http)  throws Exception {
        http.cors()
                .and()
                .csrf()
                .disable()
                .httpBasic()
                .disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers("/","/auth/**","/h2-console/**").permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .headers().frameOptions().disable();


            http.addFilterAfter(jwtAuthenticationFilter, CorsFilter.class);

    }


}