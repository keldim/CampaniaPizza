package com.chrisyoo.campaniapizzaserver.controller;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.codec.binary.Base64;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.chrisyoo.campaniapizzaserver.entity.Dessert;
import com.chrisyoo.campaniapizzaserver.entity.Drink;
import com.chrisyoo.campaniapizzaserver.entity.OpenIdUser;
import com.chrisyoo.campaniapizzaserver.entity.PastOrder;
import com.chrisyoo.campaniapizzaserver.entity.Pizza;
import com.chrisyoo.campaniapizzaserver.entity.Salad;
import com.chrisyoo.campaniapizzaserver.entity.StripeClient;
import com.chrisyoo.campaniapizzaserver.service.OpenIdUserService;
import com.chrisyoo.campaniapizzaserver.service.PastOrderService;
import com.stripe.model.Charge;

//MainController
@RestController // changed from @Controller
@RequestMapping("registered-user")
public class RegisteredUserController {
	
	private StripeClient stripeClient;
	private PastOrderService pastOrderService;
	private OpenIdUserService openIdUserService;
	
	@Autowired
	public RegisteredUserController(StripeClient stripeClient, OpenIdUserService openIdUserService, PastOrderService pastOrderService) {
		this.stripeClient = stripeClient;
		this.openIdUserService = openIdUserService;
		this.pastOrderService = pastOrderService;
	}
//	@GetMapping("/")
//	public String showHome() {
//		return "home";
//	}
	
//	@GetMapping("/whoami")
//	, produces = "application/json"
	@RequestMapping(value = "/whoami", method = RequestMethod.GET)
	public @ResponseBody String whoami(String sub) {
//		@AuthenticationPrincipal(expression="sub")
		
//		User exampleUser = new User("hi", "no password");
		
		return "{\"status\":\"OK\"}";
    }
	
//	@GetMapping(value = "/past-orders")
	@RequestMapping(value = "/past-orders", method = RequestMethod.GET)
	public List<PastOrder> getPastOrders(HttpServletRequest request) throws ParseException {
		String[] pre_split_string = request.getHeader("Authorization").split(" ");
        String[] split_string = pre_split_string[1].split("\\.");
        JSONParser parser = new JSONParser();

        String base64EncodedBody = split_string[1];
        Base64 base64Url = new Base64(true);
        String body = new String(base64Url.decode(base64EncodedBody));      
		JSONObject openId = (JSONObject) parser.parse(body);
			
		OpenIdUser existingUser = openIdUserService.findByUsername((String) openId.get("sub"));
		List<PastOrder> allPastOrders = existingUser.getPastOrders();
		// what to do when there are no past orders?
		
		return allPastOrders;
	}
	
	@RequestMapping(value = "/past-order/{id}", method = RequestMethod.GET)
	public PastOrder getPastOrder(@PathVariable int id) {
		// what to do when there is no past order?
		System.out.println(pastOrderService.findById(id));
//		PastOrder beforeSending = pastOrderService.findById(id);
//		List<Pizza> allPizzas = beforeSending.getPizzaItems();
//		for(Pizza pizza : allPizzas) {
//			String cheeseString = pizza.getCheese();
//			String[] cheeseArray = cheeseString.split(",");
//			pizza.setCheese(cheeseArray.toString());
//		}
		return pastOrderService.findById(id);
	}
	
//	@RequestMapping(value = "/whoami", method = RequestMethod.GET)
//	@GetMapping("/whoami")
//	public String whoami() {
//		HttpServletRequest request, HttpServletResponse response
//      String requestToString = request.toString();
//
//      String headerType = request.getHeader("Content-Type");
//      String headerAuth = request.getHeader("Authorization");
//
//      String token = headerAuth.split(" ")[1];
		
//      return "hello";
//    }
	
	@PostMapping("/charge")
	public Charge chargeCard(HttpServletRequest request, Model theModel) throws Exception {

		JSONParser parser = new JSONParser();

		// what if there are no pizzas at all?
		JSONArray pizzaItems = (JSONArray) parser.parse(request.getHeader("pizzaItems"));
		JSONArray saladItems = (JSONArray) parser.parse(request.getHeader("saladItems"));
		JSONArray drinkItems = (JSONArray) parser.parse(request.getHeader("drinkItems"));
		JSONArray dessertItems = (JSONArray) parser.parse(request.getHeader("dessertItems"));
				
		PastOrder newPastOrder = new PastOrder();
			
		for (int i = 0; i < pizzaItems.size(); i++) {

			JSONObject currentPizzaItem = (JSONObject) pizzaItems.get(i);
			String pizzaType = (String) currentPizzaItem.get("type");
			Pizza pizzaPastOrder;
			
			if (pizzaType.equals("BUILD YOUR OWN PIZZA")) {

				JSONArray currentPizzaCheese = (JSONArray) currentPizzaItem.get("cheese");
				JSONArray currentPizzaVeggies = (JSONArray) currentPizzaItem.get("veggies");
				JSONArray currentPizzaMeats = (JSONArray) currentPizzaItem.get("meats");
				JSONArray currentPizzaFinishes = (JSONArray) currentPizzaItem.get("finishes");
				Double price = (Double) currentPizzaItem.get("price");
				Long quantity = (Long) currentPizzaItem.get("quantity");

				pizzaPastOrder = new Pizza(pizzaType,
						(String) currentPizzaItem.get("size"), (String) currentPizzaItem.get("crust"),
						(String) currentPizzaItem.get("sauce"), currentPizzaCheese.toString(), currentPizzaVeggies.toString(),
						currentPizzaMeats.toString(), currentPizzaFinishes.toString(), String.valueOf(price), String.valueOf(quantity));
								
			} else {
				
				JSONArray currentPizzaFinishes = (JSONArray) currentPizzaItem.get("finishes");
				Double price = (Double) currentPizzaItem.get("price");
				Long quantity = (Long) currentPizzaItem.get("quantity");

				pizzaPastOrder = new Pizza(pizzaType,
						(String) currentPizzaItem.get("size"), (String) currentPizzaItem.get("crust"),
						(String) currentPizzaItem.get("sauce"), null, null,
						null, currentPizzaFinishes.toString(), String.valueOf(price), String.valueOf(quantity));
				
			}

			newPastOrder.addPizza(pizzaPastOrder);
			
		}
		
		for (int i = 0; i < saladItems.size(); i++) {
			JSONObject currentSaladItem = (JSONObject) saladItems.get(i);
			String saladType = (String) currentSaladItem.get("type");
			Salad saladPastOrder;

			if (saladType.equals("BUILD YOUR OWN SALAD")) {
				JSONArray currentSaladGreens = (JSONArray) currentSaladItem.get("greens");
				JSONArray currentSaladCheese = (JSONArray) currentSaladItem.get("cheese");
				JSONArray currentSaladFreshProduce = (JSONArray) currentSaladItem.get("freshProduce");
				JSONArray currentSaladMeats = (JSONArray) currentSaladItem.get("meats");
				JSONArray currentSaladTopItOff = (JSONArray) currentSaladItem.get("topItOff");
				JSONArray currentSaladDressings = (JSONArray) currentSaladItem.get("dressings");
				
				Double price = (Double) currentSaladItem.get("price");
				Long quantity = (Long) currentSaladItem.get("quantity");
				
				saladPastOrder = new Salad(saladType, currentSaladGreens.toString(), currentSaladCheese.toString(), currentSaladFreshProduce.toString(), currentSaladMeats.toString(), 
						currentSaladTopItOff.toString(), currentSaladDressings.toString(), (String) currentSaladItem.get("size"), String.valueOf(price), String.valueOf(quantity));
				
			} else {
				Double price = (Double) currentSaladItem.get("price");
				Long quantity = (Long) currentSaladItem.get("quantity");
				
				saladPastOrder = new Salad(saladType, null, null, null, null, null, null, (String) currentSaladItem.get("size"), String.valueOf(price), String.valueOf(quantity));
				
			}
			
			newPastOrder.addSalad(saladPastOrder);
		}
		
		for (int i = 0; i < dessertItems.size(); i++) {
			JSONObject currentDessertItem = (JSONObject) dessertItems.get(i);
			String dessertType = (String) currentDessertItem.get("type");
			Double price = (Double) currentDessertItem.get("price");
			Long quantity = (Long) currentDessertItem.get("quantity");
			
			Dessert dessertPastOrder = new Dessert(dessertType, String.valueOf(price), String.valueOf(quantity));
			
			if(dessertType.equals("Cookies")) {
				dessertPastOrder.setCookieChoice((String) currentDessertItem.get("cookieChoice"));
			} else {
				dessertPastOrder.setBrownieChoice((String) currentDessertItem.get("brownieChoice"));
			}
			
			newPastOrder.addDessert(dessertPastOrder);
		}
			
		for (int i = 0; i < drinkItems.size(); i++) {
			JSONObject currentDrinkItem = (JSONObject) drinkItems.get(i);

			Double price = (Double) currentDrinkItem.get("price");
			Long quantity = (Long) currentDrinkItem.get("quantity");
			
			Drink drinkPastOrder = new Drink((String) currentDrinkItem.get("type"), String.valueOf(price), String.valueOf(quantity));
			
			newPastOrder.addDrink(drinkPastOrder);
		}
			
		String token = request.getHeader("token");
		// with toggle, simply run the application, if the error occurs, then enter
		// debug perspective

		String[] pre_split_string = request.getHeader("Authorization").split(" ");
		String[] split_string = pre_split_string[1].split("\\.");
		
		String base64EncodedBody = split_string[1];
		Base64 base64Url = new Base64(true);
		String body = new String(base64Url.decode(base64EncodedBody));
		JSONObject openId = (JSONObject) parser.parse(body);
		
		LocalDateTime now = LocalDateTime.now();
		Timestamp timeSaved = Timestamp.valueOf(now);
		
		newPastOrder.setOrdered_at(timeSaved);
		newPastOrder.setLocation(request.getHeader("pickupLocation"));
		
		// what if there are no users at all?
		OpenIdUser existingUser = openIdUserService.findByUsername((String) openId.get("sub"));
		if (existingUser == null) {
			OpenIdUser newOpenIdUser = new OpenIdUser((String) openId.get("sub"));
			openIdUserService.save(newOpenIdUser);
			newOpenIdUser.addPastOrder(newPastOrder);
		} else {
			existingUser.addPastOrder(newPastOrder);
		}
		pastOrderService.save(newPastOrder);

		Double amount = Double.parseDouble(request.getHeader("amount"));

		return this.stripeClient.chargeCreditCard(token, amount, request);
		
	}
}
