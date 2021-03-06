package com.chrisyoo.campaniapizzaserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;

@EnableResourceServer
@SpringBootApplication
public class CampaniaPizzaServerApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(CampaniaPizzaServerApplication.class, args);
	}

}
