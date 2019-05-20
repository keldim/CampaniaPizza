package com.chrisyoo.campaniapizzaserver.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chrisyoo.campaniapizzaserver.entity.User;

public interface UserRepository extends JpaRepository<User, String>{

}
