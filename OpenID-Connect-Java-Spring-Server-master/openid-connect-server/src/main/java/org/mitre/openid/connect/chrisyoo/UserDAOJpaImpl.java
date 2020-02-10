package org.mitre.openid.connect.chrisyoo;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class UserDAOJpaImpl implements UserDAO {
	
	@PersistenceContext
	private EntityManager entityManager;
//	
//	@Autowired
//	public UserDAOJpaImpl(EntityManager theEntityManager) {
//		entityManager = theEntityManager;
//	}

	@Override
	@Transactional
	public List<User> findAll() {
		// create a query
		Query theQuery = entityManager.createQuery("from User");
		
		// execute query and get result list
		List<User> users = theQuery.getResultList();
		
		// return the results
		return users;
	}

	@Override
	@Transactional
	public User findByUsername(String theUsername) {
		
		// get employee
		User theUser = entityManager.find(User.class, theUsername);
		
		// return employee
		return theUser;
		
	}

	@Override
	@Transactional
	public void save(User theUser) {
		
		// save or update the employee
		User dbUser = entityManager.merge(theUser);
		
		// update with id from db... so we can get generated id for save/insert
		theUser.setUsername(dbUser.getUsername());

	}

	@Override
	@Transactional
	public void deleteByUsername(String theUsername) {
		
		// delete object with primary key
		Query theQuery = entityManager.createQuery("delete from User where username=:username");
		
		theQuery.setParameter("username", theUsername);
		theQuery.executeUpdate();

	}
	
	
}
