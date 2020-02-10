package org.mitre.openid.connect.chrisyoo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class NewUserInfoServiceImpl implements NewUserInfoService {
	
	private NewUserInfoDAO newUserInfoDAO;
	
	@Autowired
	public NewUserInfoServiceImpl(@Qualifier("newUserInfoDAOJpaImpl") NewUserInfoDAO theNewUserInfoDAO) {
		newUserInfoDAO = theNewUserInfoDAO;
	}

	@Override
	public List<NewUserInfo> findAll() {
		return newUserInfoDAO.findAll();
	}

	@Override
	public NewUserInfo findById(int theId) {
		return newUserInfoDAO.findById(theId);
	}

	@Override
	public void save(NewUserInfo theNewUserInfo) {
		newUserInfoDAO.save(theNewUserInfo);
	}

	@Override
	public void deleteById(int theId) {
		newUserInfoDAO.deleteById(theId);
	}

}
