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
	@Column(name="pizza_cheese")
	private String cheese;
	
//	@OneToOne(cascade=CascadeType.ALL)
//	@JoinColumn(name="pizza_veggie_id")
//	private PizzaVeggie veggie;
	@Column(name="pizza_veggie")
	private String veggie;
	
//	@OneToOne(cascade=CascadeType.ALL)
//	@JoinColumn(name="pizza_meat_id")
//	private PizzaMeat meat;
	@Column(name="pizza_meat")
	private String meat;
	
//	@OneToOne(cascade=CascadeType.ALL)
//	@JoinColumn(name="pizza_finish_id")
//	private PizzaFinish finish;
	@Column(name="pizza_finish")
	private String finish;
	
	@Column(name="price")
	private String price;
	
	@Column(name="quantity")
	private String quantity;

	public Pizza() {
	
	}

	public Pizza(String type, String size, String crust, String sauce, String cheese, String veggie, String meat, String finish, String price, String quantity) {
		this.type = type;
		this.size = size;
		this.crust = crust;
		this.sauce = sauce;
		this.cheese = cheese;
		this.veggie = veggie;
		this.meat = meat;
		this.finish = finish;
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

	public String getVeggie() {
		return veggie;
	}

	public void setVeggie(String veggie) {
		this.veggie = veggie;
	}

	public String getMeat() {
		return meat;
	}

	public void setMeat(String meat) {
		this.meat = meat;
	}

	public String getFinish() {
		return finish;
	}

	public void setFinish(String finish) {
		this.finish = finish;
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
