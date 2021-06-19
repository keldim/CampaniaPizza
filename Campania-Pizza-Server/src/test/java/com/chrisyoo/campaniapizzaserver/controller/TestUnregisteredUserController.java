package com.chrisyoo.campaniapizzaserver.controller;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.chrisyoo.campaniapizzaserver.entity.StripeClient;
import com.chrisyoo.campaniapizzaserver.service.OpenIdUserService;
import com.chrisyoo.campaniapizzaserver.service.PastOrderService;

@RunWith(SpringRunner.class)
@WebMvcTest
@AutoConfigureMockMvc(addFilters = false)
public class TestUnregisteredUserController {

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
	public void should_charge_card() throws Exception {
		Charge result = new Charge();
		result.setAmount(55L);
		result.setCurrency("dollar");

		when(stripeClient.chargeCreditCard(any(), anyDouble(), any())).thenReturn(result);
		doNothing().when(confirmationEmail).sendEmail(any());

		mockMvc.perform(post("/unregistered-user/charge").header("token", "any()").header("amount", "0.00"))
				.andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(MockMvcResultMatchers.jsonPath("$.amount").value("55"))
				.andExpect(MockMvcResultMatchers.jsonPath("$.currency").value("dollar"));
	}

	@Test
	public void should_send_email_during_charge_card() throws Exception {
		Charge result = new Charge();

		when(stripeClient.chargeCreditCard(any(), anyDouble(), any())).thenReturn(result);
		doNothing().when(confirmationEmail).sendEmail(any());

		mockMvc.perform(post("/unregistered-user/charge").header("token", "any()").header("amount", "0.00"))
				.andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON));
		verify(confirmationEmail).sendEmail(any());
	}
}
