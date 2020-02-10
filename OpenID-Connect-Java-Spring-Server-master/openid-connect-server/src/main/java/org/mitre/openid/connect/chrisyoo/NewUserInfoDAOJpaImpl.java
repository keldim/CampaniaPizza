package org.mitre.openid.connect.chrisyoo;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class NewUserInfoDAOJpaImpl implements NewUserInfoDAO {
	@PersistenceContext
	private EntityManager entityManager;
	
	@Override
	@Transactional
	public List<NewUserInfo> findAll() {
		// create a query
		Query theQuery = entityManager.createQuery("from NewUserInfo");
		
		// execute query and get result list
		List<NewUserInfo> newUserInfos = theQuery.getResultList();
		
		// return the results
		return newUserInfos;
	}

	@Override
	@Transactional
	public NewUserInfo findById(int theId) {
		
		// get employee
		NewUserInfo theNewUserInfo = entityManager.find(NewUserInfo.class, theId);
		
		// return employee
		return theNewUserInfo;
		
	}

	@Override
	@Transactional
	public void save(NewUserInfo theNewUserInfo) {
		
		// save or update the employee
		NewUserInfo dbNewUserInfo = entityManager.merge(theNewUserInfo);
		
		// update with id from db... so we can get generated id for save/insert
		theNewUserInfo.setId(dbNewUserInfo.getId());

	}

	@Override
	@Transactional
	public void deleteById(int theId) {
		
		// delete object with primary key
		Query theQuery = entityManager.createQuery("delete from NewUserInfo where id=:newUserInfoId");
		
		theQuery.setParameter("newUserInfoId", theId);
		theQuery.executeUpdate();

	}
	
	
}
