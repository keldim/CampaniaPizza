package com.chrisyoo.campaniapizzaserver.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chrisyoo.campaniapizzaserver.entity.OpenIdUser;

public interface OpenIdUserRepository extends JpaRepository<OpenIdUser, Integer>, SearchByUsername {

}
