package com.chrisyoo.campaniapizzaserver.security;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
@ComponentScan({ "com.chrisyoo.campaniapizzaserver.controller" })
public class ResourceWebConfig implements WebMvcConfigurer {}