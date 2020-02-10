package org.mitre.openid.connect.chrisyoo;

import java.util.List;

import org.mitre.openid.connect.model.UserInfo;

public interface UserService {
	
	public List<User> findAll();

	public User findByUsername(String theUsername);

	public void save(User theUser);

	public void deleteByUsername(String theUsername);
	
	// there is no User? use UserInfo?
	// create user, use one to one uni to connect with userinfo?
	// no need to use one to one? just add user and userinfo separately? through different repositories?
	// use getByUsername to get userinfo of an user?
	// create your own repositories for user and userinfo? do not use spring boot?
	// openid-connect-common => interface, openid-connect-server => jpa repository impl?
}
