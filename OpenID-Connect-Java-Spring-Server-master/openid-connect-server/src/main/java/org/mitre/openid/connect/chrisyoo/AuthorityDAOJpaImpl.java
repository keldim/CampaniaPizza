package org.mitre.openid.connect.chrisyoo;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class AuthorityDAOJpaImpl implements AuthorityDAO{
	@PersistenceContext
	private EntityManager entityManager;

	@Override
	@Transactional
	public List<Authority> findAll() {
		// create a query
		Query theQuery = entityManager.createQuery("from Authority");
		
		// execute query and get result list
		List<Authority> authorities = theQuery.getResultList();
		
		// return the results
		return authorities;
	}

	@Override
	@Transactional
	public Authority findByUsername(String theUsername) {
		
		// get employee
		Authority theAuthority = entityManager.find(Authority.class, theUsername);
		
		// return employee
		return theAuthority;
		
	}

	@Override
	@Transactional
	public void save(Authority theAuthority) {
		
		// save or update the employee
		Authority dbAuthority = entityManager.merge(theAuthority);
		
		// update with id from db... so we can get generated id for save/insert
		theAuthority.setUsername(dbAuthority.getUsername());

	}

	@Override
	@Transactional
	public void deleteByUsername(String theUsername) {
		
		// delete object with primary key
		Query theQuery = entityManager.createQuery("delete from Authority where username=:username");
		
		theQuery.setParameter("username", theUsername);
		theQuery.executeUpdate();

	}
}
