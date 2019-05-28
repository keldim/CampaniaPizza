package com.chrisyoo.campaniapizzaserver.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.chrisyoo.campaniapizzaserver.entity.User;

@CrossOrigin(origins = "http://localhost:4200")
public interface UserRepository extends JpaRepository<User, String>{

}
