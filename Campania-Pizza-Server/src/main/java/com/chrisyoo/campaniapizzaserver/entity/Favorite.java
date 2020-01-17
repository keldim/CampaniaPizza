package com.chrisyoo.campaniapizzaserver.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "favorites")
public class Favorite {

	@Id
	@Column(name = "favorite")
	String pastOrder;

	@Column(name = "openId_username")
	String openId_username;

	@Column(name = "menu_name")
	String menu_name;

	@Column(name = "menu_detail")
	String menu_detail;

	public Favorite() {

	}

	public Favorite(String pastOrder, String openId_username, String menu_name, String menu_detail) {
		super();
		this.pastOrder = pastOrder;
		this.openId_username = openId_username;
		this.menu_name = menu_name;
		this.menu_detail = menu_detail;
	}

	public String getPastOrder() {
		return pastOrder;
	}

	public void setPastOrder(String pastOrder) {
		this.pastOrder = pastOrder;
	}

	public String getOpenId_username() {
		return openId_username;
	}

	public void setOpenId_username(String openId_username) {
		this.openId_username = openId_username;
	}

	public String getMenu_name() {
		return menu_name;
	}

	public void setMenu_name(String menu_name) {
		this.menu_name = menu_name;
	}

	public String getMenu_detail() {
		return menu_detail;
	}

	public void setMenu_detail(String menu_detail) {
		this.menu_detail = menu_detail;
	}

}
