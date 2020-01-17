package com.chrisyoo.campaniapizzaserver.security;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JdbcTokenStore;


//@Configuration
//extends WebSecurityConfigurerAdapter
public class SecurityConfig {

//@Autowired
//private DataSource securityDataSource;
//
//
//@Override
//protected void configure(HttpSecurity http) throws Exception {
//	http.authorizeRequests()
//	.anyRequest().authenticated()
//	.and()
//	.formLogin()
//	.loginPage("/showMyLoginPage")
//	.loginProcessingUrl("/authenticateTheUser")
//	.permitAll()
//	.and()
//	.logout().permitAll()
//	.and()
//	.exceptionHandling().accessDeniedPage("/access-denied");
//	
//}
//
//@Override
//protected void configure(AuthenticationManagerBuilder auth) throws Exception {	
//	auth.jdbcAuthentication().dataSource(securityDataSource);
//}

}