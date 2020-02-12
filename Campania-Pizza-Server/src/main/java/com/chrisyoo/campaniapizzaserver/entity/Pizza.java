package com.chrisyoo.campaniapizzaserver.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="pizza")
public class Pizza {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	
	@Column(name="type")
	private String type;
	
	@Column(name="size")
	private String size;
	
	@Column(name="crust")
	private String crust;
	
	@Column(name="sauce")
	private String sauce;
	
//	@ManyToOne(cascade={CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
//	@JoinColumn(name="past_order_id")
//	private PastOrder pastOrder;
	
//	@OneToOne(cascade=CascadeType.ALL)
//	@JoinColumn(name="pizza_cheese_id")
//	private PizzaCheese cheese;
	@Column(name="cheese")
	private String cheese;
	
//	@OneToOne(cascade=CascadeType.ALL)
//	@JoinColumn(name="pizza_veggie_id")
//	private PizzaVeggie veggie;
	@Column(name="veggies")
	private String veggies;
	
//	@OneToOne(cascade=CascadeType.ALL)
//	@JoinColumn(name="pizza_meat_id")
//	private PizzaMeat meat;
	@Column(name="meats")
	private String meats;
	
//	@OneToOne(cascade=CascadeType.ALL)
//	@JoinColumn(name="pizza_finish_id")
//	private PizzaFinish finish;
	@Column(name="finishes")
	private String finishes;
	
	@Column(name="price")
	private String price;
	
	@Column(name="quantity")
	private String quantity;

	public Pizza() {
	
	}

	public Pizza(String type, String size, String crust, String sauce, String cheese, String veggies, String meats, String finishes, String price, String quantity) {
		this.type = type;
		this.size = size;
		this.crust = crust;
		this.sauce = sauce;
		this.cheese = cheese;
		this.veggies = veggies;
		this.meats = meats;
		this.finishes = finishes;
		this.price = price;
		this.quantity = quantity;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public String getCrust() {
		return crust;
	}

	public void setCrust(String crust) {
		this.crust = crust;
	}

	public String getSauce() {
		return sauce;
	}

	public void setSauce(String sauce) {
		this.sauce = sauce;
	}

//	public PastOrder getPastOrder() {
//		return pastOrder;
//	}
//
//	public void setPastOrder(PastOrder pastOrder) {
//		this.pastOrder = pastOrder;
//	}

	public String getCheese() {
		return cheese;
	}

	public void setCheese(String cheese) {
		this.cheese = cheese;
	}

	public String getVeggies() {
		return veggies;
	}

	public void setVeggies(String veggies) {
		this.veggies = veggies;
	}

	public String getMeats() {
		return meats;
	}

	public void setMeats(String meats) {
		this.meats = meats;
	}

	public String getFinishes() {
		return finishes;
	}

	public void setFinishes(String finishes) {
		this.finishes = finishes;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getQuantity() {
		return quantity;
	}

	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}
	
}
