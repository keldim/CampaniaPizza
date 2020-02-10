package org.mitre.openid.connect.chrisyoo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
	
private UserDAO userDAO;
	
	@Autowired
	public UserServiceImpl(@Qualifier("userDAOJpaImpl") UserDAO theUserDAO) {
		userDAO = theUserDAO;
	}
	
	@Override
	public List<User> findAll() {
		// TODO Auto-generated method stub
		return userDAO.findAll();
	}

	@Override
	public User findByUsername(String theUsername) {
		// TODO Auto-generated method stub
		return userDAO.findByUsername(theUsername);
	}

	@Override
	public void save(User theUser) {
		userDAO.save(theUser);
	}

	@Override
	public void deleteByUsername(String theUsername) {
		userDAO.deleteByUsername(theUsername);
	}
	
}
