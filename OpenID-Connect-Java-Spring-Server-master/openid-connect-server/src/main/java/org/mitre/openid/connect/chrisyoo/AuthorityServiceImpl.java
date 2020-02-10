package org.mitre.openid.connect.chrisyoo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class AuthorityServiceImpl implements AuthorityService {
private AuthorityDAO authorityDAO;
	
	@Autowired
	public AuthorityServiceImpl(@Qualifier("authorityDAOJpaImpl") AuthorityDAO theAuthorityDAO) {
		authorityDAO = theAuthorityDAO;
	}
	
	@Override
	public List<Authority> findAll() {
		// TODO Auto-generated method stub
		return authorityDAO.findAll();
	}

	@Override
	public Authority findByUsername(String theUsername) {
		// TODO Auto-generated method stub
		return authorityDAO.findByUsername(theUsername);
	}

	@Override
	public void save(Authority theAuthority) {
		authorityDAO.save(theAuthority);
	}

	@Override
	public void deleteByUsername(String theUsername) {
		authorityDAO.deleteByUsername(theUsername);
	}
	
}
