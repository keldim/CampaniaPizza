package com.chrisyoo.campaniapizzaserver.controller;

import java.security.Principal;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.chrisyoo.campaniapizzaserver.security.Foo;

import static org.apache.commons.lang3.RandomStringUtils.randomAlphabetic;
import static org.apache.commons.lang3.RandomStringUtils.randomNumeric;

@Controller
public class LoginController {

//	@GetMapping("/showMyLoginPage")
//	public String showMyLoginPage() {
//		return "fancy-login";
//	}
//	
//	
//	@GetMapping("/access-denied")
//	public String showAccessDenied() {
//		return "access-denied";
//	}
	
//	@RequestMapping("/user")
//	  public Principal user(Principal user) {
//	    return user;
//	  }
	@PreAuthorize("#oauth2.hasScope('read')")
    @RequestMapping(method = RequestMethod.GET, value = "/foos/{id}")
    @ResponseBody
    public Foo findById(@PathVariable long id) {
        return
          new Foo(Long.parseLong(randomNumeric(2)), randomAlphabetic(4));
    }
}