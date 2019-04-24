package com.chrisyoo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
	@RequestMapping("/")
	public String showHome() {
		return "home";
	}
	
	@RequestMapping("/menu")
	public String showMenu() {
		return "menu";
	}

	@RequestMapping("/locations")
	public String showLocations() {
		return "locations";
	}
	
	@RequestMapping("/order-online") 
	public String showOrderOnline() {
		return "order-online";
	}
	
	@RequestMapping("about-us")
	public String showAboutUs() {
		return "about-us";
	}
}
