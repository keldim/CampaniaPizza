package com.chrisyoo.campaniapizzaserver.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;

@Configuration
@EnableResourceServer
public class ResourceServerConfiguration extends ResourceServerConfigurerAdapter {

    
    public ResourceServerConfiguration() {
        super();
    }

//  @Order(1)
    @Override
    public void configure(HttpSecurity http) throws Exception {
         http
//            .antMatcher("/**")
            .antMatcher("/registered-user/**")
            .authorizeRequests()
//            .antMatchers(HttpMethod.GET, "/charge").permitAll()
//            .antMatchers("/**").authenticated();
            .anyRequest().authenticated();

//         http
//         .requestMatchers()
//             .antMatchers("/past-orders/**")
//         .authorizeRequests()
//             .anyRequest().authenticated();
    }
}