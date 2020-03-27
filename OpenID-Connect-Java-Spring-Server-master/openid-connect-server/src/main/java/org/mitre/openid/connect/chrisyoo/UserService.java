package org.mitre.openid.connect.chrisyoo;

import java.util.List;

import org.mitre.openid.connect.model.UserInfo;

public interface UserService {
	
	public List<User> findAll();

	public User findByUsername(String theUsername);

	public void save(User theUser);

	public void deleteByUsername(String theUsername);
	
}
