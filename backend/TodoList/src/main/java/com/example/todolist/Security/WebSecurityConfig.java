package com.example.todolist.Security;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.filter.CorsFilter;

import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.util.HashMap;
import java.util.Map;


@EnableWebSecurity
@Slf4j
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final ObjectMapper objectMapper;

    @Autowired
    public WebSecurityConfig(ObjectMapper objectMapper){
        this.objectMapper = objectMapper;
    }

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
                .authenticated();

        http.exceptionHandling()
                        .authenticationEntryPoint((request, response, e) ->{
                            Map<String,Object> data = new HashMap<String, Object>();
                            data.put("status", HttpServletResponse.SC_FORBIDDEN);
                            data.put("message",e.getMessage());

                            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                            response.setContentType(MediaType.APPLICATION_JSON_VALUE);

                            objectMapper.writeValue(response.getOutputStream(),data);
                                });
            http.addFilterAfter(jwtAuthenticationFilter, CorsFilter.class);

    }


}
