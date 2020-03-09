package org.mitre.openid.connect.chrisyoo;

import javax.servlet.http.HttpServletRequest;

import org.mitre.openid.connect.model.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class UserController {

	private UserService userService;
	private NewUserInfoService  newUserInfoService;
	private AuthorityService authorityService;
	
	
	@Autowired
	public UserController(UserService userService, NewUserInfoService newUserInfoService, AuthorityService authorityService) {
		this.userService = userService;
		this.newUserInfoService = newUserInfoService;
		this.authorityService = authorityService;
	}


	@RequestMapping(value = "/add-user", method = RequestMethod.GET)
	public @ResponseBody String addUser(HttpServletRequest request) {
		
		
		User newUser = new User(request.getHeader("username"), request.getHeader("password"), Integer.parseInt(request.getHeader("enabled")));

		String numbers = "0123456789";
		String letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		
		StringBuilder randomNumbers = new StringBuilder(5); 
		StringBuilder randomLetters = new StringBuilder(8); 
		
		for (int i = 0; i < 5; i++) {
			int index = (int) (5 * Math.random());
			randomNumbers.append(numbers.charAt(index)); 
		}
		
		for (int i = 0; i < 8; i++) {
			int index = (int) (8 * Math.random()); 
			randomLetters.append(letters.charAt(index)); 
		}
		
		String finalSub = randomNumbers.toString() + "." + randomLetters.toString();
		
		NewUserInfo newUserInfo = new NewUserInfo(finalSub, request.getHeader("username"), "User", request.getHeader("email"), 1);
		
		userService.save(newUser);
		newUserInfoService.save(newUserInfo);
		
		Authority newAuthority = new Authority(request.getHeader("username"), "ROLE_USER");
		
		authorityService.save(newAuthority);
		
		// create dao and service for authorities, try to login again
		
		return "{\"status\":\"OK\"}";
    }
	
	@RequestMapping(value = "/username-duplicate", method = RequestMethod.GET)
	public @ResponseBody boolean usernameDuplicate(HttpServletRequest request) {
		User result = userService.findByUsername(request.getHeader("username"));
		if (result == null) {
			return false;
		} else {
			return true;
		}
	}
	
}
