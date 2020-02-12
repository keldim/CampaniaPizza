package com.chrisyoo.campaniapizzaserver.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="dessert")
public class Dessert {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	
	@Column(name="type")
	private String type;
	
	@Column(name="cookie_choice")
	private String cookieChoice;
	
	@Column(name="brownie_choice")
	private String brownieChoice;
	
	@Column(name="price")
	private String price;
	
	@Column(name="quantity")
	private String quantity;

	public Dessert() {
		
	}

	public Dessert(String type, String price, String quantity) {
		this.type = type;
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

	public String getCookieChoice() {
		return cookieChoice;
	}

	public void setCookieChoice(String cookieChoice) {
		this.cookieChoice = cookieChoice;
	}

	public String getBrownieChoice() {
		return brownieChoice;
	}

	public void setBrownieChoice(String brownieChoice) {
		this.brownieChoice = brownieChoice;
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
