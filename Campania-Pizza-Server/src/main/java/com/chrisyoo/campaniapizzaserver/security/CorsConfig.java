package com.chrisyoo.campaniapizzaserver.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.LoggerFactory;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import org.slf4j.Logger;

//
//
//
//
//@Order(Ordered.HIGHEST_PRECEDENCE)
//@Component
@Configuration
public class CorsConfig {
	// implements Filter
	// extends WebSecurityConfigurerAdapter

	// IMPORTANT: it has to be a normal configuration class,
	// not extending WebMvcConfigurerAdapter or other Spring Security class
	//
	// private static final Logger LOGGER =
	// LoggerFactory.getLogger(CorsConfig.class);
	//
	// @Override
	// public void init(FilterConfig filterConfig) throws ServletException {
	// LOGGER.info("INITIALIZING CORS FILTER!!!!!!!!");
	// }
	//
	// @Override
	// public void doFilter(ServletRequest request, ServletResponse response,
	// FilterChain chain)
	// throws IOException, ServletException {
	// HttpServletRequest requestToUse = (HttpServletRequest) request;
	// HttpServletResponse responseToUse = (HttpServletResponse) response;
	//
	// responseToUse.setHeader("Access-Control-Allow-Origin",
	// requestToUse.getHeader("Origin"));
	// responseToUse.setContentType("application/json");
	// responseToUse.setHeader("Access-Control-Allow-Headers",
	// requestToUse.getHeader("Access-Control-Allow-Headers") +
	// ", Authorization, token, amount, pickupLocation, firstName, lastName, email,
	// phoneNumber, invoiceImg, pizzaItems, saladItems, drinkItems, dessertItems");
	// LOGGER.info(requestToUse.getHeader("Access-Control-Allow-Headers"));
	// System.out.println(requestToUse.getHeader("Access-Control-Allow-Headers"));
	// *
	// ; text/plain; */*
	// responseToUse.setHeader("Access-Control-Allow-Headers",
	// "Authorization, token, amount, pickupLocation, firstName, lastName, email,
	// phoneNumber, invoiceImg, pizzaItems, saladItems, drinkItems, dessertItems,
	// Access-Control-Allow-Origin");
	// do header or headers? use getHeader()?
	// responseToUse.setHeader("Access-Control-Allow-Methods",
	// requestToUse.getHeader("Access-Control-Allow-Methods"));
	// GET, POST, PUT, DELETE, PATCH
	// requestToUse.getHeader("Access-Control-Allow-Headers")
	// responseToUse.setHeader("Access-Control-Allow-Credentials", "true");
	//
	// chain.doFilter(requestToUse, responseToUse);
	// }

	//
	// @Override
	// public void destroy() {
	//
	// }

	@Bean
	public FilterRegistrationBean customCorsFilter() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowCredentials(true);
		config.addAllowedOrigin("http://localhost:4200");
//		http://campania-pizza-client.s3-website.us-east-2.amazonaws.com
		config.addAllowedHeader("*");
		config.addAllowedMethod("*");

		// config.setAllowedHeaders(Arrays.asList("Access-Control-Allow-Origin",
		// "Access-Control-Allow-Headers", "Authorization",
		// "Cache-Control", "Content-Type", "Access-Control-Expose-Headers",
		// "Access-Control-Allow-Methods", "Access-Control-Allow-Credentials",
		// "Access-Control-Max-Age"));
		// config.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT",
		// "DELETE", "PATCH", "OPTIONS", "CONNECT"));
		// config.addExposedHeader("Access-Control-Allow-Origin");
		// config.addExposedHeader("Access-Control-Allow-Headers");

		source.registerCorsConfiguration("/**", config);
		FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));

		// IMPORTANT #2: I didn't stress enough the importance of this line in my
		// original answer,
		// but it's here where we tell Spring to load this filter at the right point in
		// the chain
		// (with an order of precedence higher than oauth2's filters)
		bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
		return bean;
	}

	// @Override
	// public void configure(final WebSecurity web) {
	// web.ignoring().antMatchers(HttpMethod.OPTIONS);
	// }
	//
	// @Bean
	// public FilterRegistrationBean processCorsFilter() {
	// final UrlBasedCorsConfigurationSource source = new
	// UrlBasedCorsConfigurationSource();
	// final CorsConfiguration config = new CorsConfiguration();
	// config.setAllowCredentials(true);
	// config.addAllowedOrigin("http://campania-pizza-client.s3-website.us-east-2.amazonaws.com");
	// *
	// config.addAllowedHeader("*");
	//
	// config.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT",
	// "DELETE", "PATCH", "OPTIONS", "CONNECT"));
	// config.addAllowedMethod("*");
	// source.registerCorsConfiguration("/**", config);
	//
	// final FilterRegistrationBean bean = new FilterRegistrationBean(new
	// CorsFilter(source));
	// bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
	// return bean;
	// }
}