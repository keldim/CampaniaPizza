package com.chrisyoo.campaniapizzaserver.service;

import com.chrisyoo.campaniapizzaserver.dao.UserRepository;
import com.chrisyoo.campaniapizzaserver.entity.User;

public class UserServiceImpl implements UserService {
	private UserRepository userRepository;
	

	@Override
	public void save(User theUser) {
		userRepository.save(theUser);
	}

	@Override
	public void deleteById(String theId) {
		userRepository.deleteById(theId);
	}
}
