package org.mitre.openid.connect.chrisyoo;

import java.util.List;

public interface NewUserInfoService {
	public List<NewUserInfo> findAll();

	public NewUserInfo findById(int theId);

	public void save(NewUserInfo theNewUserInfo);

	public void deleteById(int theId);
}
