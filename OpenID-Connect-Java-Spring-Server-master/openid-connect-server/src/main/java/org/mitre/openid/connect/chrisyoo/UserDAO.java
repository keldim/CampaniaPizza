package org.mitre.openid.connect.chrisyoo;

import java.util.List;

public interface UserDAO {
	public List<User> findAll();

	public User findByUsername(String theUsername);

	public void save(User theUser);

	public void deleteByUsername(String theUsername);
}
