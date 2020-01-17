package com.chrisyoo.campaniapizzaserver.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

//@Entity
//@Table(name="pizza_finish")
public class PizzaFinish {
//	
//	@Id
//	@GeneratedValue(strategy=GenerationType.IDENTITY)
//	@Column(name="id")
//	private int id;
//	
//	@OneToOne(mappedBy="finish", cascade= {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
//	private Pizza pizza;
//
//	@Column(name="signature_marinara")
//	private boolean SignatureMarinara;
//	
//	@Column(name="spicy_sriracha_marinara")
//	private boolean SpicySrirachaMarinara;
//	
//	@Column(name="pesto_drizzle")
//	private boolean PestoDrizzle;
//	
//	@Column(name="smokey_bourbon_bbq")
//	private boolean SmokeyBourbonBBQ;
//	
//	@Column(name="extra_virgin_olive_oil_drizzle")
//	private boolean ExtraVirginOliveOilDrizzle;
//	
//	@Column(name="buffalo_sauce")
//	private boolean BuffaloSauce;
//	
//	@Column(name="white_sauce")
//	private boolean WhiteSauce;
//	
//	@Column(name="ranch")
//	private boolean Ranch;
//
//	private String[] itemNames = {"Finish - Signature Marinara", "Finish - Spicy Sriracha Marinara", "Finish - Pesto Drizzle", "Finish - Smokey Bourbon BBQ", 
//			"Finish - Extra Virgin Olive Oil Drizzle", "Finish - Buffalo Sauce", "Finish - White Sauce", "Finish - Ranch"};
//	private String[] methodNames = {"setSignatureMarinara", "setSpicySrirachaMarinara", "setPestoDrizzle", "setSmokeyBourbonBBQ", 
//			"setExtraVirginOliveOilDrizzle", "setBuffaloSauce", "setWhiteSauce", "setRanch"};
//	
//	public PizzaFinish() {
//		
//	}
//
//	public PizzaFinish(boolean signatureMarinara, boolean spicySrirachaMarinara, boolean pestoDrizzle,
//			boolean smokeyBourbonBBQ, boolean extraVirginOliveOilDrizzle, boolean buffaloSauce, boolean whiteSauce,
//			boolean ranch) {
//		SignatureMarinara = signatureMarinara;
//		SpicySrirachaMarinara = spicySrirachaMarinara;
//		PestoDrizzle = pestoDrizzle;
//		SmokeyBourbonBBQ = smokeyBourbonBBQ;
//		ExtraVirginOliveOilDrizzle = extraVirginOliveOilDrizzle;
//		BuffaloSauce = buffaloSauce;
//		WhiteSauce = whiteSauce;
//		Ranch = ranch;
//	}
//
//	public int getId() {
//		return id;
//	}
//
//	public void setId(int id) {
//		this.id = id;
//	}
//	
//	public Pizza getPizza() {
//		return pizza;
//	}
//
//	public void setPizza(Pizza pizza) {
//		this.pizza = pizza;
//	}
//
//	public boolean getSignatureMarinara() {
//		return SignatureMarinara;
//	}
//
//	public void setSignatureMarinara(boolean signatureMarinara) {
//		SignatureMarinara = signatureMarinara;
//	}
//
//	public boolean getSpicySrirachaMarinara() {
//		return SpicySrirachaMarinara;
//	}
//
//	public void setSpicySrirachaMarinara(boolean spicySrirachaMarinara) {
//		SpicySrirachaMarinara = spicySrirachaMarinara;
//	}
//
//	public boolean getPestoDrizzle() {
//		return PestoDrizzle;
//	}
//
//	public void setPestoDrizzle(boolean pestoDrizzle) {
//		PestoDrizzle = pestoDrizzle;
//	}
//
//	public boolean getSmokeyBourbonBBQ() {
//		return SmokeyBourbonBBQ;
//	}
//
//	public void setSmokeyBourbonBBQ(boolean smokeyBourbonBBQ) {
//		SmokeyBourbonBBQ = smokeyBourbonBBQ;
//	}
//
//	public boolean getExtraVirginOliveOilDrizzle() {
//		return ExtraVirginOliveOilDrizzle;
//	}
//
//	public void setExtraVirginOliveOilDrizzle(boolean extraVirginOliveOilDrizzle) {
//		ExtraVirginOliveOilDrizzle = extraVirginOliveOilDrizzle;
//	}
//
//	public boolean getBuffaloSauce() {
//		return BuffaloSauce;
//	}
//
//	public void setBuffaloSauce(boolean buffaloSauce) {
//		BuffaloSauce = buffaloSauce;
//	}
//
//	public boolean getWhiteSauce() {
//		return WhiteSauce;
//	}
//
//	public void setWhiteSauce(boolean whiteSauce) {
//		WhiteSauce = whiteSauce;
//	}
//
//	public boolean getRanch() {
//		return Ranch;
//	}
//
//	public void setRanch(boolean ranch) {
//		Ranch = ranch;
//	}
//
//	public String[] getItemNames() {
//		return itemNames;
//	}
//
//	public String[] getMethodNames() {
//		return methodNames;
//	}

}
