package com.chrisyoo.campaniapizzaserver.service;

import java.util.Optional;

import com.chrisyoo.campaniapizzaserver.dao.UserRepository;
import com.chrisyoo.campaniapizzaserver.entity.User;

public class UserServiceImpl implements UserService {
	private UserRepository userRepository;

	@Override
	public User findById(String theId) {
		Optional<User> result = userRepository.findById(theId);

		User theUser = null;
		if (result.isPresent()) {
			theUser = result.get();
		} else {
			// we didn't find the employee
			throw new RuntimeException("Did not find employee id - " + theId);
		}

		return theUser;
	}

	@Override
	public void save(User theUser) {
		userRepository.save(theUser);
	}

	@Override
	public void deleteById(String theId) {
		userRepository.deleteById(theId);
	}
}
