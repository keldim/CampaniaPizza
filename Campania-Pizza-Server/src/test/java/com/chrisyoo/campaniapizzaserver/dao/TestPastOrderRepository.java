package com.chrisyoo.campaniapizzaserver.dao;

import static org.junit.Assert.*;

import java.util.Optional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureTestEntityManager;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import com.chrisyoo.campaniapizzaserver.entity.Dessert;
import com.chrisyoo.campaniapizzaserver.entity.Drink;
import com.chrisyoo.campaniapizzaserver.entity.PastOrder;
import com.chrisyoo.campaniapizzaserver.entity.Pizza;
import com.chrisyoo.campaniapizzaserver.entity.Salad;

@RunWith(SpringRunner.class)
@TestPropertySource(
		  locations = "classpath:application-test.properties")
@SpringBootTest
@AutoConfigureTestEntityManager
@Transactional
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class TestPastOrderRepository {
	@Autowired
	private TestEntityManager entityManager;
	
	@Autowired
	private PastOrderRepository repo;
	
	
	private PastOrder pastOrder1;
	private Pizza pizza1;
	private Salad salad1;
	private Drink drink1;
	private Dessert dessert1;
	
	private PastOrder pastOrder2;
	private Pizza pizza2;
	private Salad salad2;
	private Drink drink2;
	private Dessert dessert2;
	
	
	private PastOrder pastOrder3;
	private Pizza pizza3;
	private Salad salad3;
	private Drink drink3;
	private Dessert dessert3;

	public TestPastOrderRepository() {

		pastOrder1 = new PastOrder();
		pastOrder1.setLocation("29 W 30th St");
		pizza1 = new Pizza();
		pizza1.setType("Build Your Own");
		pastOrder1.addPizza(pizza1);
		salad1 = new Salad();
		salad1.setType("Potato Salad");
		pastOrder1.addSalad(salad1);
		drink1 = new Drink();
		drink1.setType("Coke");
		pastOrder1.addDrink(drink1);
		dessert1 = new Dessert();
		dessert1.setType("Cookies");
		pastOrder1.addDessert(dessert1);
		
		pastOrder2 = new PastOrder();
		pastOrder2.setLocation("301 5th Ave");
		pizza2 = new Pizza();
		pizza2.setType("Margherita");
		pastOrder2.addPizza(pizza2);
		salad2 = new Salad();
		salad2.setType("Corn Salad");
		pastOrder2.addSalad(salad2);
		drink2 = new Drink();
		drink2.setType("Sprite");
		pastOrder2.addDrink(drink2);
		dessert2 = new Dessert();
		dessert2.setType("Cheesecake");
		pastOrder2.addDessert(dessert2);
		
		
		pastOrder3 = new PastOrder();
		pastOrder3.setLocation("20 St Marks Pl");
		pizza3 = new Pizza();
		pizza3.setType("New Yorker");
		pastOrder3.addPizza(pizza3);
		salad3 = new Salad();
		salad3.setType("Caesar Salad");
		pastOrder3.addSalad(salad3);
		drink3 = new Drink();
		drink3.setType("Water");
		pastOrder3.addDrink(drink3);
		dessert3 = new Dessert();
		dessert3.setType("Brownies");
		pastOrder3.addDessert(dessert3);
		
		
	}

	@Test
	public void should_find_past_order_by_id() {
		this.entityManager.persist(pastOrder1);
		this.entityManager.persist(pastOrder2);
		this.entityManager.persist(pastOrder3);
		Optional<PastOrder> pastOrder = repo.findById(2);

		assertEquals(2, pastOrder.get().getId());
		assertEquals("301 5th Ave", pastOrder.get().getLocation());
		assertEquals("Margherita", pastOrder.get().getPizzaItems().get(0).getType());
		assertEquals("Corn Salad", pastOrder.get().getSaladItems().get(0).getType());
		assertEquals("Sprite", pastOrder.get().getDrinkItems().get(0).getType());
		assertEquals("Cheesecake", pastOrder.get().getDessertItems().get(0).getType());
	}
	
	@Test
	public void should_store_past_order() {
		repo.save(pastOrder1);
		Optional<PastOrder> savedItem = repo.findById(1);

		assertEquals("29 W 30th St", savedItem.get().getLocation());
		assertEquals("Build Your Own", savedItem.get().getPizzaItems().get(0).getType());
		assertEquals("Potato Salad", savedItem.get().getSaladItems().get(0).getType());
		assertEquals("Coke", savedItem.get().getDrinkItems().get(0).getType());
		assertEquals("Cookies", savedItem.get().getDessertItems().get(0).getType());
	}
}
