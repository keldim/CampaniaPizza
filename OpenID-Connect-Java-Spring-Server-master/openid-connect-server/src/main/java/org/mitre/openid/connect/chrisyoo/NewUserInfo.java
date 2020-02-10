package org.mitre.openid.connect.chrisyoo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="user_info")
public class NewUserInfo {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	
	@Column(name="sub")
	private String sub;
	
	@Column(name="preferred_username")
	private String preferred_username;
	
	@Column(name="name")
	private String name;
	
	@Column(name="given_name")
	private String given_name;
	
	@Column(name="family_name")
	private String family_name;
	
	@Column(name="middle_name")
	private String middle_name;
	
	@Column(name="nickname")
	private String nickname;
	
	@Column(name="profile")
	private String profile;
	
	@Column(name="picture")
	private String picture;
	
	@Column(name="website")
	private String website;
	
	@Column(name="email")
	private String email;
	
	@Column(name="email_verified")
	private int email_verified;
	
	@Column(name="gender")
	private String gender;
	
	@Column(name="zone_info")
	private String zone_info;
	
	@Column(name="locale")
	private String locale;
	
	@Column(name="phone_number")
	private String phone_number;
	
	@Column(name="phone_number_verified")
	private int phone_number_verified;
	
	@Column(name="address_id")
	private String address_id;
	
	@Column(name="updated_time")
	private String updated_time;
	
	@Column(name="birthdate")
	private String birthdate;
	
	@Column(name="src")
	private String src;
	
	public NewUserInfo() {
		
	}

	public NewUserInfo(String sub, String preferred_username, String name, String email, int email_verified) {
		this.sub = sub;
		this.preferred_username = preferred_username;
		this.name = name;
		this.email = email;
		this.email_verified = email_verified;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getSub() {
		return sub;
	}

	public void setSub(String sub) {
		this.sub = sub;
	}

	public String getPreferred_username() {
		return preferred_username;
	}

	public void setPreferred_username(String preferred_username) {
		this.preferred_username = preferred_username;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getEmail_verified() {
		return email_verified;
	}

	public void setEmail_verified(int email_verified) {
		this.email_verified = email_verified;
	}
	
}
