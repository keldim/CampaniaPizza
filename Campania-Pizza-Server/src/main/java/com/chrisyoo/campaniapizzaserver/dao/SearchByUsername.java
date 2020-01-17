package com.chrisyoo.campaniapizzaserver.dao;

import com.chrisyoo.campaniapizzaserver.entity.OpenIdUser;

public interface SearchByUsername {
	public OpenIdUser findByUsername(String theUsername);
}
