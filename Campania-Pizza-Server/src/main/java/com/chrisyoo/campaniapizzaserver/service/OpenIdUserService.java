package com.chrisyoo.campaniapizzaserver.service;

import java.util.List;

import com.chrisyoo.campaniapizzaserver.entity.OpenIdUser;

public interface OpenIdUserService {
	public List<OpenIdUser> findAll();

	public OpenIdUser findById(int theId);

	public void save(OpenIdUser theOpenIdUser);

	public void deleteById(int theId);
	
	public OpenIdUser findByUsername(String theUsername);
}
