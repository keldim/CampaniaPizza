package com.chrisyoo.campaniapizzaserver.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@CrossOrigin(origins = "http://localhost:4200")
public class MainController {
	@GetMapping("/")
	public String showHome() {
		return "home";
	}
	
	
}
