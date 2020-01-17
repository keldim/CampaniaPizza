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
//@Table(name="pizza_cheese")
public class PizzaCheese {

//	@Id
//	@GeneratedValue(strategy=GenerationType.IDENTITY)
//	@Column(name="id")
//	private int id;
//	
//	@OneToOne(mappedBy="cheese", cascade= {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
//	private Pizza pizza;
//	
//	@Column(name="fresh_mozzarella")
//	private boolean FreshMozzarella;
//	
//	@Column(name="shredded_mozzarella")
//	private boolean ShreddedMozzarella;
//	
//	@Column(name="parmesan")
//	private boolean Parmesan;
//	
//	@Column(name="ricotta")
//	private boolean Ricotta;
//	
//	@Column(name="blue_cheese_crumble")
//	private boolean BlueCheeseCrumble;
//	
//	@Column(name="asiago")
//	private boolean Asiago;
//	
//	@Column(name="mac_and_cheese")
//	private boolean MacAndCheese;
//	
//	@Column(name="feta")
//	private boolean Feta;
//
//	private String[] itemNames = {"Fresh Mozzarella", "Shredded Mozzarella", "Parmesan", "Ricotta", "Blue Cheese Crumble", "Asiago", "Mac & Cheese", "Feta"};
//	private String[] methodNames = {"setFreshMozzarella", "setShreddedMozzarella", "setParmesan", "setRicotta", "setBlueCheeseCrumble", "setAsiago", "setMacAndCheese", "setFeta"};
//	
//	public PizzaCheese() {
//		
//	}
//
//	public PizzaCheese(boolean freshMozzarella, boolean shreddedMozzarella, boolean parmesan, boolean ricotta,
//			boolean blueCheeseCrumble, boolean asiago, boolean macAndCheese, boolean feta) {
//		FreshMozzarella = freshMozzarella;
//		ShreddedMozzarella = shreddedMozzarella;
//		Parmesan = parmesan;
//		Ricotta = ricotta;
//		BlueCheeseCrumble = blueCheeseCrumble;
//		Asiago = asiago;
//		MacAndCheese = macAndCheese;
//		Feta = feta;
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
//	public boolean getFreshMozzarella() {
//		return FreshMozzarella;
//	}
//
//	public void setFreshMozzarella(boolean freshMozzarella) {
//		FreshMozzarella = freshMozzarella;
//	}
//
//	public boolean getShreddedMozzarella() {
//		return ShreddedMozzarella;
//	}
//
//	public void setShreddedMozzarella(boolean shreddedMozzarella) {
//		ShreddedMozzarella = shreddedMozzarella;
//	}
//
//	public boolean getParmesan() {
//		return Parmesan;
//	}
//
//	public void setParmesan(boolean parmesan) {
//		Parmesan = parmesan;
//	}
//
//	public boolean getRicotta() {
//		return Ricotta;
//	}
//
//	public void setRicotta(boolean ricotta) {
//		Ricotta = ricotta;
//	}
//
//	public boolean getBlueCheeseCrumble() {
//		return BlueCheeseCrumble;
//	}
//
//	public void setBlueCheeseCrumble(boolean blueCheeseCrumble) {
//		BlueCheeseCrumble = blueCheeseCrumble;
//	}
//
//	public boolean getAsiago() {
//		return Asiago;
//	}
//
//	public void setAsiago(boolean asiago) {
//		Asiago = asiago;
//	}
//
//	public boolean getMacAndCheese() {
//		return MacAndCheese;
//	}
//
//	public void setMacAndCheese(boolean macAndCheese) {
//		MacAndCheese = macAndCheese;
//	}
//
//	public boolean getFeta() {
//		return Feta;
//	}
//
//	public void setFeta(boolean feta) {
//		Feta = feta;
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
