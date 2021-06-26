package com.chrisyoo.campaniapizzaserver.controller;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;
import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.chrisyoo.campaniapizzaserver.entity.ConfirmationEmail;
import com.chrisyoo.campaniapizzaserver.entity.OpenIdUser;
import com.chrisyoo.campaniapizzaserver.entity.PastOrder;
import com.chrisyoo.campaniapizzaserver.entity.StripeClient;
import com.chrisyoo.campaniapizzaserver.service.OpenIdUserService;
import com.chrisyoo.campaniapizzaserver.service.PastOrderService;
import com.stripe.model.Charge;

@RunWith(SpringRunner.class)
@WebMvcTest
@AutoConfigureMockMvc(addFilters = false)
public class TestRegisteredUserController {

	@Autowired
	private MockMvc mockMvc;
	@MockBean
	private StripeClient stripeClient;
	@MockBean
	private PastOrderService pastOrderService;
	@MockBean
	private OpenIdUserService openIdUserService;
	@MockBean
	private ConfirmationEmail confirmationEmail;

	@Test
	public void should_call_findByUsername_to_find_past_orders_for_registered_user() throws Exception {
		String randomBearerToken = "empty eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4"
				+ "gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
		
		when(openIdUserService.findByUsername(any())).thenReturn(null);
		
		mockMvc.perform(post("/registered-user/past-orders").header("Authorization", randomBearerToken))
		.andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8));
		verify(openIdUserService).findByUsername(any());
	}
	
	@Test
	public void should_return_zero_past_orders_for_newly_registered_user() throws Exception {
		String randomBearerToken = "empty eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4"
				+ "gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
		
		when(openIdUserService.findByUsername(any())).thenReturn(null);
		
		mockMvc.perform(post("/registered-user/past-orders").header("Authorization", randomBearerToken))
		.andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
		.andExpect(MockMvcResultMatchers.jsonPath("$").isEmpty());
	}
	
	@Test
	public void should_return_past_orders_for_existing_registered_user() throws Exception {
		String randomBearerToken = "empty eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4"
				+ "gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
		OpenIdUser user = new OpenIdUser();
		PastOrder userPastOrder1 = new PastOrder();
		userPastOrder1.setLocation("Little Italy");
		PastOrder userPastOrder2 = new PastOrder();
		userPastOrder2.setLocation("Chinatown");
		user.addPastOrder(userPastOrder1);
		user.addPastOrder(userPastOrder2);
		
		when(openIdUserService.findByUsername(any())).thenReturn(user);
		
		mockMvc.perform(post("/registered-user/past-orders").header("Authorization", randomBearerToken))
		.andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
		.andExpect(MockMvcResultMatchers.jsonPath("$[0].location").value("Little Italy"))
		.andExpect(MockMvcResultMatchers.jsonPath("$[1].location").value("Chinatown"));
	}

	@Test
	public void should_return_past_order_by_id() throws Exception {
		String randomBearerToken = "empty eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4"
				+ "gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
		OpenIdUser user = new OpenIdUser();
		PastOrder result = new PastOrder();
		result.setId(5);
		result.setLocation("Little Italy");
		user.addPastOrder(result);
		
		when(openIdUserService.findByUsername(any())).thenReturn(user);
		when(pastOrderService.findById(5)).thenReturn(result);
		
		mockMvc.perform(post("/registered-user/past-order/5").header("Authorization", randomBearerToken))
		.andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
		.andExpect(MockMvcResultMatchers.jsonPath("$.id").value(5))
		.andExpect(MockMvcResultMatchers.jsonPath("$.location").value("Little Italy"));
	}

	@Test
	public void should_charge_card() throws Exception {
		Charge result = new Charge();
		result.setAmount(55L);
		result.setCurrency("dollar");

		when(stripeClient.chargeCreditCard(any(), anyDouble(), any())).thenReturn(result);
		doNothing().when(confirmationEmail).sendEmail(any());
		when(pastOrderService.createPastOrder(any())).thenReturn(null);
		doNothing().when(openIdUserService).addPastOrderToExistingUserOrNewUser(any(), any());
		doNothing().when(pastOrderService).save(any());

		mockMvc.perform(post("/registered-user/charge").header("token", "any()").header("amount", "0.00"))
				.andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
				.andExpect(MockMvcResultMatchers.jsonPath("$.amount").value("55"))
				.andExpect(MockMvcResultMatchers.jsonPath("$.currency").value("dollar"));
	}

	@Test
	public void should_send_email_during_charge_card() throws Exception {
		Charge result = new Charge();

		when(stripeClient.chargeCreditCard(any(), anyDouble(), any())).thenReturn(result);
		doNothing().when(confirmationEmail).sendEmail(any());
		when(pastOrderService.createPastOrder(any())).thenReturn(null);
		doNothing().when(openIdUserService).addPastOrderToExistingUserOrNewUser(any(), any());
		doNothing().when(pastOrderService).save(any());

		mockMvc.perform(post("/registered-user/charge").header("token", "any()").header("amount", "0.00"))
				.andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8));
		verify(confirmationEmail).sendEmail(any());
	}
	
	@Test
	public void should_save_order_during_charge_card() throws Exception {
		Charge result = new Charge();

		when(stripeClient.chargeCreditCard(any(), anyDouble(), any())).thenReturn(result);
		doNothing().when(confirmationEmail).sendEmail(any());
		when(pastOrderService.createPastOrder(any())).thenReturn(null);
		doNothing().when(openIdUserService).addPastOrderToExistingUserOrNewUser(any(), any());
		doNothing().when(pastOrderService).save(any());

		mockMvc.perform(post("/registered-user/charge").header("token", "any()").header("amount", "0.00"))
				.andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8));
		verify(pastOrderService).createPastOrder(any());
		verify(openIdUserService).addPastOrderToExistingUserOrNewUser(any(), any());
		verify(pastOrderService).save(any());
	}

}