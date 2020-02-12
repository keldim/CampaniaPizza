package com.chrisyoo.campaniapizzaserver.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="salad")
public class Salad {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	
	@Column(name="type")
	private String type;
	
	@Column(name="greens")
	private String greens;
	
	@Column(name="cheese")
	private String cheese;
	
	@Column(name="fresh_produce")
	private String freshProduce;
	
	@Column(name="meats")
	private String meats;
	
	@Column(name="top_it_off")
	private String topItOff;
	
	@Column(name="dressings")
	private String dressings;

	@Column(name="size")
	private String size;
	
	@Column(name="price")
	private String price;
	
	@Column(name="quantity")
	private String quantity;

	public Salad() {
		
	}

	public Salad(String type, String greens, String cheese, String freshProduce, String meats, String topItOff,
			String dressings, String size, String price, String quantity) {
		super();
		this.type = type;
		this.greens = greens;
		this.cheese = cheese;
		this.freshProduce = freshProduce;
		this.meats = meats;
		this.topItOff = topItOff;
		this.dressings = dressings;
		this.size = size;
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

	public String getGreens() {
		return greens;
	}

	public void setGreens(String greens) {
		this.greens = greens;
	}

	public String getCheese() {
		return cheese;
	}

	public void setCheese(String cheese) {
		this.cheese = cheese;
	}

	public String getFreshProduce() {
		return freshProduce;
	}

	public void setFreshProduce(String freshProduce) {
		this.freshProduce = freshProduce;
	}

	public String getMeats() {
		return meats;
	}

	public void setMeats(String meats) {
		this.meats = meats;
	}

	public String getTopItOff() {
		return topItOff;
	}

	public void setTopItOff(String topItOff) {
		this.topItOff = topItOff;
	}

	public String getDressings() {
		return dressings;
	}

	public void setDressings(String dressings) {
		this.dressings = dressings;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
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
