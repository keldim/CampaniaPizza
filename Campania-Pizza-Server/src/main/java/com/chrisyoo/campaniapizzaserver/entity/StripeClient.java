package com.chrisyoo.campaniapizzaserver.entity;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import com.stripe.Stripe;
import com.stripe.model.Charge;

@Component
public class StripeClient {

	@Autowired
	public JavaMailSender emailSender;
	
    @Autowired
    StripeClient() {
        Stripe.apiKey = "";
    }
 
    public void sendSimpleMessage(
      String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage(); 
        message.setTo(to); 
        message.setSubject(subject); 
        message.setText(text);
        emailSender.send(message);
    }
    
    public Charge chargeCreditCard(String token, double amount) throws Exception {
        Map<String, Object> chargeParams = new HashMap<String, Object>();
        chargeParams.put("amount", (int)(amount * 100));
        chargeParams.put("currency", "USD");
        chargeParams.put("source", token);
        Charge charge = Charge.create(chargeParams);
        sendSimpleMessage("woyoo@umich.edu", "Payment Confirmation", "Payment went through!");
        return charge;
    }
}
