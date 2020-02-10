package org.mitre.openid.connect.chrisyoo;

import java.util.List;

public interface AuthorityDAO {
	public List<Authority> findAll();

	public Authority findByUsername(String theUsername);

	public void save(Authority theAuthority);

	public void deleteByUsername(String theUsername);
}
