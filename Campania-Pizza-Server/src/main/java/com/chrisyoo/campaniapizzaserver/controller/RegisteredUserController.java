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

import com.chrisyoo.campaniapizzaserver.entity.OpenIdUser;
import com.chrisyoo.campaniapizzaserver.entity.PastOrder;
import com.chrisyoo.campaniapizzaserver.entity.Pizza;
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

		String[] pre_split_string = request.getHeader("Authorization").split(" ");
		String[] split_string = pre_split_string[1].split("\\.");

		JSONParser parser = new JSONParser();

		JSONArray pizzaItems = (JSONArray) parser.parse(request.getHeader("pizzaItems"));

		for (int i = 0; i < pizzaItems.size(); i++) {

			JSONObject currentPizzaItem = (JSONObject) pizzaItems.get(i);

			String pizzaType = (String) currentPizzaItem.get("type");
			System.out.println(pizzaType);
			System.out.println(pizzaType == "BUILD YOUR OWN PIZZA");;

			if (pizzaType.equals("BUILD YOUR OWN PIZZA")) {
//				 == "BUILD YOUR OWN PIZZA"
				JSONArray currentPizzaCheese = (JSONArray) currentPizzaItem.get("cheese");
//				StringBuilder cheeseItems = new StringBuilder();
//				for (int j = 0; j < currentPizzaCheese.size(); j++) {
//					cheeseItems.append(currentPizzaCheese.get(j));
//					cheeseItems.append(",");
//				}
//
				JSONArray currentPizzaVeggies = (JSONArray) currentPizzaItem.get("veggies");
//				StringBuilder veggieItems = new StringBuilder();
//				for (int k = 0; k < currentPizzaVeggies.size(); k++) {
//					veggieItems.append(currentPizzaVeggies.get(k));
//					veggieItems.append(",");
//				}
//
				JSONArray currentPizzaMeats = (JSONArray) currentPizzaItem.get("meats");
//				StringBuilder meatItems = new StringBuilder();
//				for (int l = 0; l < currentPizzaMeats.size(); l++) {
//					meatItems.append(currentPizzaMeats.get(l));
//					meatItems.append(",");
//				}
//
				JSONArray currentPizzaFinishes = (JSONArray) currentPizzaItem.get("finishes");
//				StringBuilder finishItems = new StringBuilder();
//				for (int m = 0; m < currentPizzaFinishes.size(); m++) {
//					finishItems.append(currentPizzaFinishes.get(m));
//					finishItems.append(",");
//				}

				Double price = (Double) currentPizzaItem.get("price");
				Long quantity = (Long) currentPizzaItem.get("quantity");

//				Pizza pizzaPastOrder = new Pizza((String) currentPizzaItem.get("type"),
//						(String) currentPizzaItem.get("size"), (String) currentPizzaItem.get("crust"),
//						(String) currentPizzaItem.get("sauce"), cheeseItems.toString(), veggieItems.toString(),
//						meatItems.toString(), finishItems.toString(), String.valueOf(price), String.valueOf(quantity));
				
//				Pizza pizzaPastOrder = new Pizza((String) currentPizzaItem.get("type"),
//						(String) currentPizzaItem.get("size"), (String) currentPizzaItem.get("crust"),
//						(String) currentPizzaItem.get("sauce"), (String) currentPizzaItem.get("cheese"), (String) currentPizzaItem.get("veggies"),
//						(String) currentPizzaItem.get("meats"), (String) currentPizzaItem.get("finishes"), String.valueOf(price), String.valueOf(quantity));
				
				Pizza pizzaPastOrder = new Pizza((String) currentPizzaItem.get("type"),
						(String) currentPizzaItem.get("size"), (String) currentPizzaItem.get("crust"),
						(String) currentPizzaItem.get("sauce"), currentPizzaCheese.toString(), currentPizzaVeggies.toString(),
						currentPizzaMeats.toString(), currentPizzaFinishes.toString(), String.valueOf(price), String.valueOf(quantity));
				
				System.out.println(split_string);
				// String base64EncodedHeader = split_string[0];
				String base64EncodedBody = split_string[1];
				// String base64EncodedSignature = split_string[2];

				// System.out.println("~~~~~~~~~ JWT Header ~~~~~~~");
				Base64 base64Url = new Base64(true);
				// String header = new String(base64Url.decode(base64EncodedHeader));
				// System.out.println("JWT Header : " + header);

				System.out.println("~~~~~~~~~ JWT Body ~~~~~~~");
				String body = new String(base64Url.decode(base64EncodedBody));
				System.out.println("JWT Body : " + body);
				JSONObject openId = (JSONObject) parser.parse(body);

				OpenIdUser existingUser = openIdUserService.findByUsername((String) openId.get("sub"));
				if (existingUser == null) {
					OpenIdUser newOpenIdUser = new OpenIdUser((String) openId.get("sub"));
					openIdUserService.save(newOpenIdUser);
					LocalDateTime now = LocalDateTime.now();
					Timestamp timeSaved = Timestamp.valueOf(now);
					PastOrder newPastOrder = new PastOrder(timeSaved, request.getHeader("pickupLocation"));
					// do etc for display on angular?
					newPastOrder.addPizza(pizzaPastOrder);
					newOpenIdUser.addPastOrder(newPastOrder);
					pastOrderService.save(newPastOrder);
				} else {
					LocalDateTime now = LocalDateTime.now();
					Timestamp timeSaved = Timestamp.valueOf(now);
					PastOrder newPastOrder = new PastOrder(timeSaved, request.getHeader("pickupLocation"));
					newPastOrder.addPizza(pizzaPastOrder);
					existingUser.addPastOrder(newPastOrder);
					pastOrderService.save(newPastOrder);
				}
				
			} else {
				JSONArray currentPizzaFinishes = (JSONArray) currentPizzaItem.get("finishes");
//				StringBuilder finishItems = new StringBuilder();
//				for (int m = 0; m < currentPizzaFinishes.size(); m++) {
//					finishItems.append(currentPizzaFinishes.get(m));
//					finishItems.append(",");
//				}
				
				Double price = (Double) currentPizzaItem.get("price");
				Long quantity = (Long) currentPizzaItem.get("quantity");

				Pizza pizzaPastOrder = new Pizza((String) currentPizzaItem.get("type"),
						(String) currentPizzaItem.get("size"), (String) currentPizzaItem.get("crust"),
						(String) currentPizzaItem.get("sauce"), null, null,
						null, currentPizzaFinishes.toString(), String.valueOf(price), String.valueOf(quantity));
				
				System.out.println(split_string);
				// String base64EncodedHeader = split_string[0];
				String base64EncodedBody = split_string[1];
				// String base64EncodedSignature = split_string[2];

				// System.out.println("~~~~~~~~~ JWT Header ~~~~~~~");
				Base64 base64Url = new Base64(true);
				// String header = new String(base64Url.decode(base64EncodedHeader));
				// System.out.println("JWT Header : " + header);

				System.out.println("~~~~~~~~~ JWT Body ~~~~~~~");
				String body = new String(base64Url.decode(base64EncodedBody));
				System.out.println("JWT Body : " + body);
				JSONObject openId = (JSONObject) parser.parse(body);

				OpenIdUser existingUser = openIdUserService.findByUsername((String) openId.get("sub"));
				if (existingUser == null) {
					OpenIdUser newOpenIdUser = new OpenIdUser((String) openId.get("sub"));
					openIdUserService.save(newOpenIdUser);
					LocalDateTime now = LocalDateTime.now();
					Timestamp timeSaved = Timestamp.valueOf(now);
					PastOrder newPastOrder = new PastOrder(timeSaved, request.getHeader("pickupLocation"));
					// do etc for display on angular?
					newPastOrder.addPizza(pizzaPastOrder);
					newOpenIdUser.addPastOrder(newPastOrder);
					pastOrderService.save(newPastOrder);
				} else {
					LocalDateTime now = LocalDateTime.now();
					Timestamp timeSaved = Timestamp.valueOf(now);
					PastOrder newPastOrder = new PastOrder(timeSaved, request.getHeader("pickupLocation"));
					newPastOrder.addPizza(pizzaPastOrder);
					existingUser.addPastOrder(newPastOrder);
					pastOrderService.save(newPastOrder);
				}
			}

			
			
		

		}

		Double amount = Double.parseDouble(request.getHeader("amount"));

		return this.stripeClient.chargeCreditCard(token, amount, request);

	
		// PizzaCheese newPizzaCheese = new PizzaCheese();
		// use an array of item names?
		// boolean for items on database, send the string when rest request comes in?
		// send boolean and frontend will take care of string?
		// String[] currentArray = newPizzaCheese.getMethodNames();
		// currentArray[j];
		// newPizzaCheese.getClass().getMethod(newPizzaCheese.getMethodNames()[j],
		// boolean.class).invoke(newPizzaCheese, currentPizzaCheese.getBoolean(j));

		// PizzaVeggie newPizzaVeggie = new PizzaVeggie();
		// newPizzaVeggie.getClass().getMethod(newPizzaVeggie.getMethodNames()[k],
		// boolean.class).invoke(newPizzaVeggie, currentPizzaVeggies.getBoolean(k));

		// PizzaMeat newPizzaMeat = new PizzaMeat();
		// newPizzaMeat.getClass().getMethod(newPizzaMeat.getMethodNames()[l],
		// boolean.class).invoke(newPizzaMeat, currentPizzaMeats.getBoolean(l));

		// PizzaFinish newPizzaFinish = new PizzaFinish();
		// newPizzaFinish.getClass().getMethod(newPizzaFinish.getMethodNames()[m],
		// boolean.class).invoke(newPizzaFinish, currentPizzaFinishes.getBoolean(m));

		// pizzaPastOrder.setCheese(newPizzaCheese);
		// pizzaPastOrder.setVeggie(newPizzaVeggie);
		// pizzaPastOrder.setMeat(newPizzaMeat);
		// pizzaPastOrder.setFinish(newPizzaFinish);

		// create for loops for each array, then create inner for loops to save entries
		// to database, create saving methods inside entries
		// for(int i = 0; i < request.getHeader("pizzaItems").length(); i++) {
		// for(int j = 0; j < request.getHeader("pizzaItems")[i].length(); j++) {
		//
		// }
		// }

		// for(String item : request.getHeader("pizzaItems")) {
		//
		// }


		
		
	}
}
