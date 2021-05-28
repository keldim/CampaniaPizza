package com.chrisyoo.campaniapizzaserver.dao;

import static org.junit.Assert.*;

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

import com.chrisyoo.campaniapizzaserver.entity.OpenIdUser;
import com.chrisyoo.campaniapizzaserver.entity.PastOrder;

@RunWith(SpringRunner.class)
@TestPropertySource(
		  locations = "classpath:application-test.properties")
@SpringBootTest
@AutoConfigureTestEntityManager
@Transactional
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class TestOpenIdUserRepository {

	@Autowired
	private TestEntityManager entityManager;
	
	@Autowired
	private OpenIdUserRepository repo;
	
	@Autowired
	private SearchByUsernameImpl searchRepo;
	
	private OpenIdUser openIdUser1;
	private PastOrder pastOrder1;
	
	private OpenIdUser openIdUser2;
	private PastOrder pastOrder2;
	
	private OpenIdUser openIdUser3;
	private PastOrder pastOrder3;
	
	public TestOpenIdUserRepository() {
		openIdUser1 = new OpenIdUser("supersonicBurrito");
		pastOrder1 = new PastOrder();
		pastOrder1.setLocation("29 W 30th St");
		openIdUser1.addPastOrder(pastOrder1);
		
		openIdUser2 = new OpenIdUser("cookiePrincess");
		pastOrder2 = new PastOrder();
		pastOrder2.setLocation("301 5th Ave");
		openIdUser2.addPastOrder(pastOrder2);
		
		openIdUser3 = new OpenIdUser("slowAsSnail");
		pastOrder3 = new PastOrder();
		pastOrder3.setLocation("20 St Marks Pl");
		openIdUser3.addPastOrder(pastOrder3);
	}

	@Test
	public void should_find_open_id_user_by_username() {
		this.entityManager.persist(openIdUser1);
		this.entityManager.persist(openIdUser2);
		this.entityManager.persist(openIdUser3);
		OpenIdUser openIdUser = searchRepo.findByUsername("cookiePrincess");

		assertEquals("cookiePrincess", openIdUser.getUsername());
		assertEquals("301 5th Ave", openIdUser.getPastOrders().get(0).getLocation());
	}
	
	@Test
	public void should_store_open_id_user() {
		repo.save(openIdUser1);
		OpenIdUser openIdUser = searchRepo.findByUsername("supersonicBurrito");

		assertEquals("supersonicBurrito", openIdUser.getUsername());
		assertEquals("29 W 30th St", openIdUser.getPastOrders().get(0).getLocation());
	}

}
