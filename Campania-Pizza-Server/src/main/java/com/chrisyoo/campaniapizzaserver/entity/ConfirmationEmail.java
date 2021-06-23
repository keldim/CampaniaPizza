package com.chrisyoo.campaniapizzaserver.entity;

import java.util.HashMap;
import java.util.Map;

import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import freemarker.template.Configuration;
import freemarker.template.Template;

@Component
public class ConfirmationEmail {

	@Autowired
	private JavaMailSender emailSender;
	
	@Autowired
    private Configuration freemarkerConfig;
	
	public void sendEmail(HttpServletRequest request) throws Exception {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        Map<String, Object> model = addValuesToModel(request);
         
        freemarkerConfig.setClassForTemplateLoading(this.getClass(), "/templates/");
        Template template = freemarkerConfig.getTemplate("order-confirmation.ftl");
        String text = FreeMarkerTemplateUtils.processTemplateIntoString(template, model);
        helper.setTo(request.getHeader("email"));
        helper.setText(text, true);
        helper.setSubject("Order Confirmation - Campania Pizza");
        
        emailSender.send(message);    
    }
	
	private Map<String, Object> addValuesToModel(HttpServletRequest request) throws Exception {
		JSONParser parser = new JSONParser();
        JSONArray pizzaItems = (JSONArray) parser.parse(request.getHeader("pizzaItems"));
		JSONArray saladItems = (JSONArray) parser.parse(request.getHeader("saladItems"));
		JSONArray drinkItems = (JSONArray) parser.parse(request.getHeader("drinkItems"));
		JSONArray dessertItems = (JSONArray) parser.parse(request.getHeader("dessertItems"));
		
		Map<String, Object> model = new HashMap<String, Object>();
		model.put("amount", request.getHeader("amount"));
		model.put("subtotal", request.getHeader("subtotal"));
		model.put("tax", request.getHeader("tax"));
		model.put("pickupLocation", request.getHeader("pickupLocation"));
        model.put("pizzaItems", pizzaItems);
        model.put("saladItems", saladItems);
        model.put("drinkItems", drinkItems);
        model.put("dessertItems", dessertItems);
        model.put("firstName", request.getHeader("firstName"));
        model.put("lastName", request.getHeader("lastName"));
        model.put("email", request.getHeader("email"));
        model.put("phoneNumber", request.getHeader("phoneNumber"));
        model.put("cardLastFourNumbers", request.getHeader("cardLastFourNumbers"));
        model.put("cardType", request.getHeader("cardType"));
        
        return model;
	}
	
}
