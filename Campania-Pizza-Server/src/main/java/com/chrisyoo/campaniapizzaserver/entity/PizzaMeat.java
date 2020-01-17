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
//@Table(name="pizza_meat")
public class PizzaMeat {

//	@Id
//	@GeneratedValue(strategy=GenerationType.IDENTITY)
//	@Column(name="id")
//	private int id;
//	
//	@OneToOne(mappedBy="meat", cascade= {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
//	private Pizza pizza;
//	
//	@Column(name="bacon")
//	private boolean Bacon;
//	
//	@Column(name="crumbled_meatballs")
//	private boolean CrumbledMeatballs;
//	
//	@Column(name="grilled_chicken")
//	private boolean GrilledChicken;
//	
//	@Column(name="italian_sausage")
//	private boolean ItalianSausage;
//	
//	@Column(name="pepperoni")
//	private boolean Pepperoni;
//	
//	@Column(name="canadian_bacon")
//	private boolean CanadianBacon;
//	
//	@Column(name="steak")
//	private boolean Steak;
//
//	private String[] itemNames = {"Bacon", "Crumbled Meatballs", "Grilled Chicken", "Italian Sausage", "Pepperoni", "Canadian Bacon", "Steak"};
//	private String[] methodNames = {"setBacon", "setCrumbledMeatballs", "setGrilledChicken", "setItalianSausage", "setPepperoni", "setCanadianBacon", "setSteak"};
//	
//	public PizzaMeat() {
//		
//	}
//
//	public PizzaMeat(boolean bacon, boolean crumbledMeatballs, boolean grilledChicken, boolean italianSausage,
//			boolean pepperoni, boolean canadianBacon, boolean steak) {
//		Bacon = bacon;
//		CrumbledMeatballs = crumbledMeatballs;
//		GrilledChicken = grilledChicken;
//		ItalianSausage = italianSausage;
//		Pepperoni = pepperoni;
//		CanadianBacon = canadianBacon;
//		Steak = steak;
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
//	public boolean getBacon() {
//		return Bacon;
//	}
//
//	public void setBacon(boolean bacon) {
//		Bacon = bacon;
//	}
//
//	public boolean getCrumbledMeatballs() {
//		return CrumbledMeatballs;
//	}
//
//	public void setCrumbledMeatballs(boolean crumbledMeatballs) {
//		CrumbledMeatballs = crumbledMeatballs;
//	}
//
//	public boolean getGrilledChicken() {
//		return GrilledChicken;
//	}
//
//	public void setGrilledChicken(boolean grilledChicken) {
//		GrilledChicken = grilledChicken;
//	}
//
//	public boolean getItalianSausage() {
//		return ItalianSausage;
//	}
//
//	public void setItalianSausage(boolean italianSausage) {
//		ItalianSausage = italianSausage;
//	}
//
//	public boolean getPepperoni() {
//		return Pepperoni;
//	}
//
//	public void setPepperoni(boolean pepperoni) {
//		Pepperoni = pepperoni;
//	}
//
//	public boolean getCanadianBacon() {
//		return CanadianBacon;
//	}
//
//	public void setCanadianBacon(boolean canadianBacon) {
//		CanadianBacon = canadianBacon;
//	}
//
//	public boolean getSteak() {
//		return Steak;
//	}
//
//	public void setSteak(boolean steak) {
//		Steak = steak;
//	}
//
//	public String[] getItemNames() {
//		return itemNames;
//	}
//
//	public String[] getMethodNames() {
//		return methodNames;
//	}
//	
}
