package com.chrisyoo.campaniapizzaserver.controller;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.codec.binary.Base64;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.chrisyoo.campaniapizzaserver.dao.OpenIdUserRepository;
import com.chrisyoo.campaniapizzaserver.entity.OpenIdUser;
import com.chrisyoo.campaniapizzaserver.entity.PastOrder;
import com.chrisyoo.campaniapizzaserver.entity.Pizza;
import com.chrisyoo.campaniapizzaserver.entity.PizzaCheese;
import com.chrisyoo.campaniapizzaserver.entity.PizzaFinish;
import com.chrisyoo.campaniapizzaserver.entity.PizzaMeat;
import com.chrisyoo.campaniapizzaserver.entity.PizzaVeggie;
import com.chrisyoo.campaniapizzaserver.entity.StripeClient;
import com.chrisyoo.campaniapizzaserver.service.OpenIdUserService;
import com.chrisyoo.campaniapizzaserver.service.PastOrderService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stripe.model.Charge;

//@CrossOrigin
//"/payment"
//PaymentController
@RestController
@RequestMapping("unregistered-user")
public class UnregisteredUserController {

	private StripeClient stripeClient;
	// private OpenIdUserRepository openIdUserRepository;
	private OpenIdUserService openIdUserService;
	private PastOrderService pastOrderService;

	// OpenIdUserRepository openIdUserRepository
	@Autowired
	UnregisteredUserController(StripeClient stripeClient, OpenIdUserService openIdUserService,
			PastOrderService pastOrderService) {
		this.stripeClient = stripeClient;
		this.openIdUserService = openIdUserService;
		this.pastOrderService = pastOrderService;
	}

	@PostMapping("/charge")
	public Charge chargeCard(HttpServletRequest request, Model theModel) throws Exception {

		// changed
		System.out.println(request.getHeader("token"));
		System.out.println(request.getHeader("amount"));
		System.out.println(request.getHeader("Authorization"));
		System.out.println(request.getHeader("pizzaItems"));
		System.out.println(request.getHeader("saladItems"));
		System.out.println(request.getHeader("drinkItems"));
		System.out.println(request.getHeader("dessertItems"));

		String token = request.getHeader("token");
		// with toggle, simply run the application, if the error occurs, then enter
		// debug perspective

		Double amount = Double.parseDouble(request.getHeader("amount"));

		return this.stripeClient.chargeCreditCard(token, amount, request);

	}
	
	
	// whitelist this website
	// send request to "/token" for admin token, using admin id and pass
	// when you recieve admin token, use that to send request for registering a new client
	
	

	@RequestMapping(value = "/whoareyou", method = RequestMethod.GET)
	public @ResponseBody String whoareyou(String sub) {
		return "{\"status\":\"OK\"}";
	}
}
