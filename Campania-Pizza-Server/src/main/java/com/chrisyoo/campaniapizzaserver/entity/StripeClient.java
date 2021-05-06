package com.chrisyoo.campaniapizzaserver.entity;

import java.io.File;
import java.io.FileOutputStream;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import javax.activation.FileDataSource;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import com.stripe.Stripe;
import com.stripe.model.Charge;

import freemarker.template.Configuration;
import freemarker.template.Template;

@Component
public class StripeClient {

	@Autowired
	public JavaMailSender emailSender;
	
	@Autowired
    private Configuration freemarkerConfig;
	
    @Autowired
    StripeClient() {
        Stripe.apiKey = "sk_test_sNRgiABeNS8kXXYcb5TRKHQr008iLlQrVZ";
    }
 
    public void sendSimpleMessage(
      String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage(); 
        message.setTo(to); 
        message.setSubject(subject); 
        message.setText(text);
        emailSender.send(message);
    }
    
    private void sendEmail(HttpServletRequest request) throws Exception {
        MimeMessage message = emailSender.createMimeMessage();
 
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
 
        Map<String, Object> model = new HashMap();
        
        model.put("pickupLocation", request.getHeader("pickupLocation"));
        model.put("firstName", request.getHeader("firstName"));
        model.put("lastName", request.getHeader("lastName"));
        model.put("email", request.getHeader("email"));
        model.put("phoneNumber", request.getHeader("phoneNumber"));
        
         
        // set loading location to src/main/resources
        // You may want to use a subfolder such as /templates here
        freemarkerConfig.setClassForTemplateLoading(this.getClass(), "/templates/");
         
        Template t = freemarkerConfig.getTemplate("order-confirmation.ftl");
        String text = FreeMarkerTemplateUtils.processTemplateIntoString(t, model);
 
        helper.setTo(request.getHeader("email"));
        helper.setText(text, true); // set to html
        helper.setSubject("Order Confirmation - Campania Pizza");
        
//        try {
//        	byte[] decodedBytes = Base64.getMimeDecoder().decode(request.getHeader("invoiceImg"));
//            // by default, file is overwritten if it already exists
//            FileUtils.writeByteArrayToFile(new File("./src/main/resources/invoice.png"), decodedBytes);
//        } catch (Exception e) {
//        	System.out.println("Error in creating image file: " + e);
//        } finally {
//        	helper.addAttachment("invoice.png", new ClassPathResource("invoice.png"));
//        }
          
        byte[] decodedBytes = Base64.getMimeDecoder().decode(request.getHeader("invoiceImg"));
        
        try {
//        	try(FileOutputStream imageOutFile = new FileOutputStream("./src/main/resources/invoice.png")) {}
//        	imageOutFile.write(decodedBytes);
        	File temp = File.createTempFile("invoice", ".png");
        	FileOutputStream imageOutFile = new FileOutputStream(temp);
        	imageOutFile.write(decodedBytes);
        	helper.addAttachment("OrderInvoice.png", temp);
//        	emailSender.send(message);
        	temp.deleteOnExit();
        } catch (Exception e) {
            System.out.println("Error in creating image file: " + e);
        }
        
        // from documentation => Note that the InputStream returned by the DataSource implementation needs to be a fresh one on each call, 
        // as JavaMail will invoke getInputStream() multiple times. => need to create a fresh FileDataSource
//        FileDataSource attachment = new FileDataSource("./src/main/resources/invoice.png");
//        helper.addAttachment("OrderInvoice.png", attachment);
        
        emailSender.send(message);
        
    }
    
    public Charge chargeCreditCard(String token, double amount, HttpServletRequest request) throws Exception {
        Map<String, Object> chargeParams = new HashMap<String, Object>();
        chargeParams.put("amount", (int)(amount * 100));
        chargeParams.put("currency", "USD");
        chargeParams.put("source", token);
        Charge charge = Charge.create(chargeParams);
       
        try {
            sendEmail(request);
            System.out.println("Email Sent!");
        } catch (Exception ex) {
        	System.out.println("Error in sending email: " + ex);
        }
        
        return charge;
    }
}
