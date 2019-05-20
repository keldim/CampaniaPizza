package com.chrisyoo.campaniapizzaserver.entity;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class User {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="username")
	String username;
	
	@Column(name="password")
	String password;
	
	
}
