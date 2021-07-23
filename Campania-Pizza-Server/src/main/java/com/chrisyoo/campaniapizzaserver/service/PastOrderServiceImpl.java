package com.chrisyoo.campaniapizzaserver.service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import com.chrisyoo.campaniapizzaserver.dao.PastOrderRepository;
import com.chrisyoo.campaniapizzaserver.entity.Dessert;
import com.chrisyoo.campaniapizzaserver.entity.Drink;
import com.chrisyoo.campaniapizzaserver.entity.PastOrder;
import com.chrisyoo.campaniapizzaserver.entity.Pizza;
import com.chrisyoo.campaniapizzaserver.entity.Salad;

@Service
public class PastOrderServiceImpl implements PastOrderService {

	private PastOrderRepository pastOrderRepository;

	@Autowired
	public PastOrderServiceImpl(PastOrderRepository thePastOrderRepository) {
		pastOrderRepository = thePastOrderRepository;
	}

	@Override
	public List<PastOrder> findAll() {
		return pastOrderRepository.findAll();
	}

	@Override
	public PastOrder findById(int theId) {
		Optional<PastOrder> result = pastOrderRepository.findById(theId);

		PastOrder thePastOrder = null;
		if (result.isPresent()) {
			thePastOrder = result.get();
		} else {
			throw new RuntimeException("Did not find past order id - " + theId);
		}

		return thePastOrder;
	}

	@Override
	public void save(PastOrder pastOrder) {
		pastOrderRepository.save(pastOrder);
	}

	@Override
	public void deleteById(int theId) {
		pastOrderRepository.deleteById(theId);
	}

	@Override
	public PastOrder createPastOrder(HttpServletRequest request) throws Exception {
		PastOrder newPastOrder = saveArraysToPastOrder(request);
		newPastOrder = saveValuesToPastOrder(request, newPastOrder);
		return newPastOrder;
	}

	private PastOrder saveArraysToPastOrder(HttpServletRequest request) throws Exception {
					PastOrder newPastOrder = new PastOrder();
					JSONParser parser = new JSONParser();
					JSONArray pizzaItems = (JSONArray) parser.parse(request.getHeader("pizzaItems"));
					JSONArray saladItems = (JSONArray) parser.parse(request.getHeader("saladItems"));
					JSONArray drinkItems = (JSONArray) parser.parse(request.getHeader("drinkItems"));
					JSONArray dessertItems = (JSONArray) parser.parse(request.getHeader("dessertItems"));
							
					
						
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
		
		return newPastOrder;
	}
	
	private PastOrder saveValuesToPastOrder(HttpServletRequest request, PastOrder newPastOrder) {
		LocalDateTime now = LocalDateTime.now();
		Timestamp timeSaved = Timestamp.valueOf(now);
		
		newPastOrder.setOrdered_at(timeSaved);
		newPastOrder.setLocation(request.getHeader("pickupLocation"));
	
		return newPastOrder;
	}
	
	
}
