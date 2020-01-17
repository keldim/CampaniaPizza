package com.chrisyoo.campaniapizzaserver.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chrisyoo.campaniapizzaserver.entity.Favorite;

public interface FavoriteRepository extends JpaRepository<Favorite, String>{

}
