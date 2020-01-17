package com.chrisyoo.campaniapizzaserver.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.chrisyoo.campaniapizzaserver.entity.PastOrder;

public interface PastOrderRepository extends JpaRepository<PastOrder, Integer>{
	
}
